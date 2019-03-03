import * as express from 'express';

import { PhysicalMeasurementsController } from './controllers/physical-measurements.controller';
import { initDB, createNewUser } from './controllers/mongodb.controller';
import { initDataRetriever } from './controllers/watch.controller';
import { UsersController } from './controllers/users.controller';

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 3000;

initDB();
createNewUser("roman");
initDataRetriever(Number(process.env.WATCH_UPDATE_INTERVAL) || 4000);

app.use('/physical-measurements', PhysicalMeasurementsController);
app.use('/users', UsersController);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});