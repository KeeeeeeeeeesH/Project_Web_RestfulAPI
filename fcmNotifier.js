const admin = require('firebase-admin');
const serviceAccount = require('./JsonFirebase/project-news-app-7493e-firebase-adminsdk-thl86-c80afed380.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// ฟังก์ชันสำหรับส่งการแจ้งเตือนทั่วไป
const sendNotification = async (title, body, topic, newsId) => {
    if (body.length > 50) {
        body = body.substring(0, 50) + "...อ่านต่อ";
    }

    const message = {
        data: {
            title: title,
            body: body,
            news_id: newsId.toString(),
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


// ฟังก์ชันสำหรับส่งการแจ้งเตือนไปยังสมาชิกที่มีหมวดหมู่โปรด
const sendNotificationToFavoriteUsers = async (newsName, catId, newsId, pool) => {
    try {
        // ดึงชื่อหมวดหมู่จาก Cat_Id
        const [catResults] = await pool.promise().query('SELECT Cat_Name FROM Category WHERE Cat_Id = ?', [catId]);
        if (catResults.length === 0) return;

        const catName = catResults[0].Cat_Name;
        const title = `แจ้งเตือนจากหมวดหมู่ที่ชื่นชอบ(${catName})`;

        // ดึง Mem_Id ทั้งหมดที่มีหมวดหมู่นี้ใน Favorite_Category
        const [favoriteUsers] = await pool.promise().query('SELECT Mem_Id FROM Favorite_Category WHERE Cat_Id = ?', [catId]);

        if (favoriteUsers.length === 0) return;  // ไม่มีสมาชิกที่สนใจหมวดหมู่นี้

        // ส่งการแจ้งเตือนถึงสมาชิกแต่ละคนในหมวดหมู่โปรดนี้
        for (const user of favoriteUsers) {
            const memId = user.Mem_Id;

            // ส่งข้อความแจ้งเตือนที่ระบุ Mem_Id ด้วย
            const message = {
                data: {
                    title: title,
                    body: newsName.length > 50 ? newsName.substring(0, 50) + "...อ่านต่อ" : newsName,
                    news_id: newsId.toString(),
                },
                topic: `user_${memId}`,  // ใช้ Mem_Id เป็น topic ในการแจ้งเตือน
            };

            try {
                const response = await admin.messaging().send(message);
                console.log(`Notification sent to user_${memId} successfully:`, response);
            } catch (error) {
                console.error(`Error sending notification to user_${memId}:`, error);
            }
        }
    } catch (error) {
        console.error('Error in sendNotificationToFavoriteUsers:', error);
    }
};

module.exports = { sendNotification, sendNotificationToFavoriteUsers };
