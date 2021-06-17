const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 8080;

// Databse Connection
const db_connection = require('./config/database').promise();

app.use(cors());

app.get('/ViewImage', async (req, res) => {	
	try {
		const [rows] = await db_connection.execute("SELECT * FROM posts ");
		
		return res.json({ success: true, listall:rows, });	
		
	} catch (err) {console.log(err)}
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))