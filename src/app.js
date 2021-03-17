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

const allowedOrigins = [
	'https://noteful-react-client-asktami.vercel.app/',
	'*',
];

// to allow for multiple origins
// app.use(
// 	cors({
// 		origin: function(origin, callback) {
// 			// allow requests with no origin
// 			// (like mobile apps or curl requests)
// 			if (!origin) return callback(null, true);
// 			if (allowedOrigins.indexOf(origin) === -1) {
// 				var msg =
// 					'The CORS policy for this site does not ' +
// 					'allow access from the specified Origin.';
// 				return callback(new Error(msg), false);
// 			}
// 			return callback(null, true);
// 		},
// 	})
// );

// ALTERNATIVE for a single origin
app.use(
	cors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		allowedHeaders:
			'Origin, X-Requested-With, Content-Type, Accept, Authorization',
		credentials: true,
		preflightContinue: false,
	})
);

// app.use(cors());
// app.options('*', cors());
// include before other routes

// should allow CORS requests for anywhere but not working

// ALTERNATIVE, if don't use npm cors pacakage, also not working
// change * to:
// https://noteful-react-client-asktami.vercel.app/

// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
// 	);
// 	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
// 	next();
// });

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
