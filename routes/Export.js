const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const pool = require('../app');

const tables = [
    'admin', 'category', 'favorite_category', 'major', 'member',
    'news', 'news_rating', 'picture', 'read_history', 'read_later',
    'sub_category', 'total_read', 'work_status'
];

async function exportTableData(tableName) {
    const connection = await mysql.createConnection(pool);
    try {
        const [rows] = await connection.query(`SELECT * FROM ${tableName}`);
        if (rows.length === 0) {
            console.log(`No data to export for table ${tableName}`);
            return;
        }

        const headers = Object.keys(rows[0]).map(field => ({ id: field, title: field.toUpperCase() }));
        const csvWriter = createCsvWriter({
            path: `./output/${tableName}.csv`,
            header: headers
        });

        await csvWriter.writeRecords(rows);
        console.log(`Data has been exported successfully for table ${tableName}.`);
    } catch (error) {
        console.error(`Failed to export data from ${tableName}:`, error);
    } finally {
        await connection.end();
    }
}

async function exportAllTables() {
    for (let table of tables) {
        await exportTableData(table);
    }
}

exportAllTables();
