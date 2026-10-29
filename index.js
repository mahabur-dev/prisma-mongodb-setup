import express from 'express';


const app = express();
import studentRoutes from './src/routes/student.routes.js';

app.use(express.json());
app.use('/api', studentRoutes);

app.get('/', (req, res) => {
    console.log('Hello from express');
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})