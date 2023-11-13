/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const debug = require('debug')('library:server');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors');

const swaggerJsDocs = YAML.load('./api.yaml');

const indexRouter = require('./routes');
const authorRouter = require('./routes/author.routes');
const bookRouter = require('./routes/book.routes');

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  require('dotenv').config();
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => debug('MongoDB connected'))
  .catch((e) => {
    debug(e);
  });

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  debug(`Server is running @http://localhost:${PORT}`);
});

module.exports = app;
