require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

const validateBearerToken = require('./validate-bearer-token');
const errorHandler = require('./error-handler');

const noteRouter = require('./note/note-router');
const folderRouter = require('./folder/folder-router');

const app = express();

app.use(
	morgan(NODE_ENV === 'production' ? 'tiny' : 'common', {
		skip: () => NODE_ENV === 'test',
	})
);
// make so all responses have an Access-Control-Allow-Origin header set to *, so we'll allow requests from all origins
// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', process.env.ORIGIN || '*');
// 	next();
// });

// app.use(cors());

app.use(
	cors({
		credentials: true,
		origin: 'https://noteful-react-client-asktami.vercel.app',
	})
);

app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(validateBearerToken);

app.use('/api/notes', noteRouter);
app.use('/api/folders', folderRouter);

app.get('/', (req, res) => {
	res.send('Hello, world!');
});

app.use(errorHandler);
module.exports = app;
