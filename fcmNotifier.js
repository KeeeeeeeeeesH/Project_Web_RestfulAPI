const admin = require('firebase-admin');
const serviceAccount = require('./JsonFirebase/project-news-app-7493e-firebase-adminsdk-thl86-e725cac5be.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

console.log("Firebase Admin SDK initialized successfully...");


const sendNotification = async (title, body, topic) => {
    console.log("sendNotification function called...");
    console.log(`Preparing to send notification with title: ${title}, body: ${body}, topic: ${topic}`);

    const message = {
        notification: {
            title: title,
            body: body,
        },
        topic: topic,
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Notification sent successfully:', response);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

module.exports = sendNotification;