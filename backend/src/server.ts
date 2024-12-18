import 'dotenv/config';

import app from './app';
import { PORT } from './constants';

app.listen(PORT, () => {
  console.log(`Server is running on "http://localhost:${PORT}"`);
});
