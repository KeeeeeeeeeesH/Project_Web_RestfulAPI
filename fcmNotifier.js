const axios = require('axios');


const serverKey = '0c08547fdd55a410882adf87393a63669b7e97ec';

const sendNotification = async (title, body, topic) => {
    const url = 'https://fcm.googleapis.com/fcm/send';

    const message = {
        notification: {     
            title: title,
            body: body,
        },
        to: `/topics/${topic}`,
    };

    try {
        const response = await axios.post(url, message, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `key=${serverKey}`,
            },
        });

        console.log('Notification sent:', response.data);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

module.exports = sendNotification;
