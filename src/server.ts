import * as express from 'express';

import { PhysicalMeasurementsController } from './controllers/physical-measurements.controller';
import { initDB } from './controllers/mongodb.controller';
import { initDataRetriever } from './controllers/watch.controller';

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 3000;

initDB();
initDataRetriever(Number(process.env.WATCH_UPDATE_INTERVAL) || 4000);

app.use('/physical-measurements', PhysicalMeasurementsController);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});