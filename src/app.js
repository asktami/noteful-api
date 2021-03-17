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

// should allow CORS requests for anywhere but not working
app.use(cors());

// should allow requests from react client site
// let corsOptions = {
// 	origin: 'https://noteful-react-client-asktami.vercel.app/',
// };
// app.options(corsOptions, cors());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	next();
});

app.use(
	morgan(NODE_ENV === 'production' ? 'tiny' : 'common', {
		skip: () => NODE_ENV === 'test',
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
