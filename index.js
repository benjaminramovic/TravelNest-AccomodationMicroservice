import express from 'express'
import 'dotenv/config'
//import pool from './config/db.js'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 5001

app.use(express.json())
app.use(cors())

// pool.connect((err, client, release) => {
//     if (err) {
//         return console.error('Connection error', err.stack);
//     }

//     console.log('Connected to PostgreSQL');

//     release();
// });

app.get('/', (req, res) => {
  res.send('Welcome to the TravelNest Accommodations API!')
})

// app.get('/test-db', async (req, res) => {
//     try {
//         const result = await pool.query('SELECT NOW()');

//         res.json(result.rows);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('DB error');
//     }
// });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
