import app from './app';
import {log} from 'console';
import {connectDB, disconnectDB} from './db/connections';

connectDB()
  .then(() => {
    log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(error => {
    console.error(error);
  });

process.on('SIGINT', async () => {
  disconnectDB();
  log('Disconnected from MongoDB');
  process.exit(0);
});
