const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const fcmNotifier = require('./fcmNotifier');

// const pool = mysql.createPool({
//     host: 'localhost',  
//     user: 'root', 
//     password: 'newsroot123456',  
//     database: 'news_web_app',
//     port: 3306  
// });

// set-up host
const pool = mysql.createPool({
    host: '118.27.130.234',  
    user: 'zmkjqpsz_champ', 
    password: 'Cc021721176',  
    database: 'zmkjqpsz_news_web_app',
    port: 3306
});

module.exports = pool;

//middleware -> cors/parseJSON JS-Object 
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//session otp
app.use(session({
  secret: '5c430df2-905b3a50-680398aa-6cdf147e',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' }
}));

//join path หน้า login
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

//join path เข้า folder
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use('/views', express.static(path.join(__dirname, 'views/admin')));
app.use('/views', express.static(path.join(__dirname, 'views/category')));
app.use('/views', express.static(path.join(__dirname, 'views/favorite_category')));
app.use('/views', express.static(path.join(__dirname, 'views/major')));
app.use('/views', express.static(path.join(__dirname, 'views/member')));
app.use('/views', express.static(path.join(__dirname, 'views/news')));
app.use('/views', express.static(path.join(__dirname, 'views/picture')));
app.use('/views', express.static(path.join(__dirname, 'views/news_rating')));
app.use('/views', express.static(path.join(__dirname, 'views/read_history')));
app.use('/views', express.static(path.join(__dirname, 'views/read_later')));
app.use('/views', express.static(path.join(__dirname, 'views/total_read')));
app.use('/views', express.static(path.join(__dirname, 'views/work_status')));
app.use('/views', express.static(path.join(__dirname, 'views/picture')));
app.use('/views', express.static(path.join(__dirname, 'views/recovery')));
app.use('/views', express.static(path.join(__dirname, 'views/reset_password')));
app.use('/views', express.static(path.join(__dirname, 'views/picture')));
app.use('/views', express.static(path.join(__dirname, 'views/news_sub_cate')));


//api router
const LoginRouter = require('./routes/Login');
app.use('/api', LoginRouter);

const loginMemberRouter = require('./routes/LoginMember');
app.use('/api/loginMember', loginMemberRouter);

const loginAdminRouter = require('./routes/LoginAdmin');
app.use('/api/loginAdmin', loginAdminRouter);

const AdminRouter = require('./routes/admin');
app.use('/api/admin', AdminRouter);

const Work_StatusRouter = require('./routes/Work_Status');
app.use('/api/work_status', Work_StatusRouter);

const memberRouter = require('./routes/member');
app.use('/api/member', memberRouter);

const CategoryRouter = require('./routes/Category');
app.use('/api/category', CategoryRouter);

const Sub_CategoryRouter = require('./routes/Sub_Category');
app.use('/api/sub_category', Sub_CategoryRouter);

const NewsRouter = require('./routes/News');
app.use('/api/news', NewsRouter);

const newsSubCateRouter = require('./routes/News_Sub_Cate');
app.use('/api/news_sub_cate', newsSubCateRouter);

const PictureRouter = require('./routes/Picture');
app.use('/api/picture', PictureRouter);

const majorRouter = require('./routes/Major');
app.use('/api/major', majorRouter);

const Favorite_CategoryRouter = require('./routes/Favorite_Category');
app.use('/api/favorite_category', Favorite_CategoryRouter);

const Read_LaterRouter = require('./routes/Read_Later');
app.use('/api/read_later', Read_LaterRouter);

const News_RatingRouter = require('./routes/News_Rating');
app.use('/api/news_rating', News_RatingRouter);

const Read_HistoryRouter = require('./routes/Read_History');
app.use('/api/read_history', Read_HistoryRouter);

const Total_ReadRouter = require('./routes/Total_Read');
app.use('/api/total_read', Total_ReadRouter);

const RecoveryRouter = require('./routes/Recovery');
app.use('/api/recovery', RecoveryRouter);

const recoveryMemberRouter = require('./routes/RecoveryMember');
app.use('/api/recovery_member', recoveryMemberRouter);

const ResetPasswordRouter = require('./routes/reset_password');
app.use('/api/reset_password', ResetPasswordRouter);

const resetPasswordMemberRouter = require('./routes/reset_PasswordMember');
app.use('/api/reset_password_member', resetPasswordMemberRouter);

app.use('/uploads', express.static('uploads'));

const exportRouter = require('./routes/Export');
app.use('/export', exportRouter);

const dashboardRouter = require('./routes/dashboard');
app.use('/dashboard', dashboardRouter);

// const fcm = require('./fcmNotifier');
// app.use('/fcmNotifier', fcm);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
