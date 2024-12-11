import express from 'express';
import router from './routes/index';

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.use('/', router);

app.listen(port, function() {
  console.log(`Server running on port ${port}`);
});
