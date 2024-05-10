const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const pool = mysql.createPool({
    host: 'localhost',  
    user: 'root', 
    password: 'newsroot123456',  
    database: 'news_web_app',
    port: 3306  
});

// set-up พรี่แชมป์
// const pool = mysql.createPool({
//     host: 'localhost',  
//     user: 'root', 
//     password: '',  
//     database: 'news_web_app',
//     port: 3306  
// });

module.exports = pool;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'U2FsdGVkX19U/Td9EChM/fcQQgP3N6ifViHC2KraJKg=',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' }
}));


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.use('/views', express.static(path.join(__dirname, 'views')));
app.use('/views', express.static(path.join(__dirname, 'views/admin')));
app.use('/views', express.static(path.join(__dirname, 'views/category')));
app.use('/views', express.static(path.join(__dirname, 'views/favorite_category')));
app.use('/views', express.static(path.join(__dirname, 'views/major')));
app.use('/views', express.static(path.join(__dirname, 'views/member')));
app.use('/views', express.static(path.join(__dirname, 'views/news')));
app.use('/views', express.static(path.join(__dirname, 'views/news_rating')));
app.use('/views', express.static(path.join(__dirname, 'views/read_history')));
app.use('/views', express.static(path.join(__dirname, 'views/read_later')));
app.use('/views', express.static(path.join(__dirname, 'views/total_read')));
app.use('/views', express.static(path.join(__dirname, 'views/work_status')));
app.use('/views', express.static(path.join(__dirname, 'views/recovery')));
app.use('/views', express.static(path.join(__dirname, 'views/reset_password')));


const LoginRouter = require('./routes/Login');
app.use('/api', LoginRouter);

const AdminRouter = require('./routes/admin');
app.use('/api/admin', AdminRouter);

const CategoryRouter = require('./routes/Category');
app.use('/api/category', CategoryRouter);

const Favorite_CategoryRouter = require('./routes/Favorite_Category');
app.use('/api/favorite_category', Favorite_CategoryRouter);

const MajorRouter = require('./routes/Major');
app.use('/api/major', MajorRouter);

const memberRouter = require('./routes/member');
app.use('/api/member', memberRouter);

const News_RatingRouter = require('./routes/News_Rating');
app.use('/api/news_rating', News_RatingRouter);

const NewsRouter = require('./routes/News');
app.use('/api/news', NewsRouter);

const PictureRouter = require('./routes/Picture');
app.use('/api/picture', PictureRouter);

const Read_HistoryRouter = require('./routes/Read_History');
app.use('/api/read_history', Read_HistoryRouter);

const Read_LaterRouter = require('./routes/Read_Later');
app.use('/api/read_later', Read_LaterRouter);

const Sub_CategoryRouter = require('./routes/Sub_Category');
app.use('/api/sub_category', Sub_CategoryRouter);

const Total_ReadRouter = require('./routes/Total_Read');
app.use('/api/total_read', Total_ReadRouter);

const Work_StatusRouter = require('./routes/Work_Status');
app.use('/api/work_status', Work_StatusRouter);

const RecoveryRouter = require('./routes/Recovery');
app.use('/api/recovery', RecoveryRouter);

const ResetPasswordRouter = require('./routes/reset_password');
app.use('/api/reset_password', ResetPasswordRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
