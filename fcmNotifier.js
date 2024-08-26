const axios = require('axios');


const serverKey = 'BNBMvF61Qp1Lais93hPNkHM2UcXRWwPu1Iqc1ph5gErZ5mMtkpF7gue-DiHVTwEbTbjeBeuIHvLvo-IHZrd6y5c';

const sendNotification = async (title, body, topic) => {
    const url = 'https://fcm.googleapis.com/fcm/send';

    const message = {
        notification: {
            title: title,
            body: body,
        },
        topic: topic,
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
