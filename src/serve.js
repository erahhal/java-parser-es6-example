import express from 'express';
import { resolve } from 'path';

const publicDir = resolve('src');

// Initialize the app
const app = express();

const staticConfig = {
    index: ['index.html', 'index.js'],
    fallthrough: true,
};
app.use(express.static(publicDir, staticConfig));

const port = 8080;
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`listening at http://localhost:${port}`);
});
