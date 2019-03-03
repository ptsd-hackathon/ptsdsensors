import * as express from 'express';
import * as bodyParser from 'body-parser';

import { PhysicalMeasurementsController } from './controllers/physical-measurements.controller';
import {
  initDB,
  createNewUser,
  updatePersonAvg,
} from './controllers/mongodb.controller';
import { initDataRetriever } from './controllers/watch.controller';
import { UsersController } from './controllers/users.controller';

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 3000;

const defaultWatch = {
  userId: '',
  date: new Date(),
  calories: 14,
  respiratoryRate: 16,
  spO2: 9,
  heartRate: 9,
  hrVariability: 9,
  systolicBP: 9,
  diastolicBP: 9,
  pulsePressure: 9,
  strokeVolume: 9,
  cardiacOutput: 9,
  cardiacIndex: 9,
  svr: 9,
  temperature: 9,
  sweat: 9,
};

initDB();
// createNewUser("roman7");
// updatePersonAvg(defaultWatch);
initDataRetriever(4000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/physical-measurements', PhysicalMeasurementsController);
app.use('/users', UsersController);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
