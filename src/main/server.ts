import './config/module-alias';
import { env } from './config/env';
import app from './config/app';

app.listen(env.port, () => {
  console.log(`Server listening on port ${env.port}`);
});
