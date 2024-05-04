const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',  
    user: 'root', 
    password: 'newsroot123456',  
    database: 'news_web_app',
    port: 3306  
});

// set-up พรี่แชมป์
// const pool = mysql.createPool({
//     host: '',  
//     user: '', 
//     password: '',  
//     database: '',
//     port: 3306  
// });

module.exports = pool

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

const Work_Status_DetailRouter = require('./routes/Work_Status_Detail');
app.use('/api/work_status_detail', Work_Status_DetailRouter);

const Work_StatusRouter = require('./routes/Work_Status');
app.use('/api/work_status', Work_StatusRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
