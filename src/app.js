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

app.use(cors());

// -------------------------------------------------------
// ALTERNATIVE, include before other routes
// should allow CORS requests for anywhere but not working

// app.use(
// 	cors({
// 		origin: '*',
// 		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
// 		allowedHeaders:
// 			'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, Authorization',
// 		credentials: true,
// 		preflightContinue: false,
// 		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// 	})
// );
// // should allow CORS requests for anywhere but not working
// // client site = https://noteful-react-client-asktami.vercel.app/

// ALTERNATIVE, if don't use npm cors package, also not working

// change * to:
// https://noteful-app-asktami.vercel.app/

// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
// 	);
// 	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
// 	next();
// });
//-------------------------------------------------------

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
