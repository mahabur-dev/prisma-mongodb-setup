import express from 'express';
import studentRoutes  from './routes/student.routes.js';
import userRoutes from './routes/user.routes.js'


const app = express();
app.use(express.json());


app.use('/api', studentRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
    console.log('Hello from express');
})


export default app;