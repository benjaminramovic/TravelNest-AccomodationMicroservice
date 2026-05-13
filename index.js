import 'dotenv/config'

import express from 'express'
//import pool from './config/db.js'
import cors from 'cors'
import accommodationRouter from './routes/accommodationRoutes.js'
import categoryRouter from './routes/categoryRoutes.js'
import featureRouter from './routes/featureRoute.js'

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

app.use('/api/accommodations',accommodationRouter);
app.use('/api/categories',categoryRouter);
app.use('/api/features',featureRouter);

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
