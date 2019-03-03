import * as express from 'express';

import { PhysicalMeasurementsController } from './controllers/physical-measurements.controller';
import { initDB } from '@controllers/mongodb';

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 3000;

initDB();

app.use('/physical-measurements', PhysicalMeasurementsController);

// Serve the application at the given port
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});