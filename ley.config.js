const extractHerokuDatabaseEnvVars = require('./utilities/setPostgresDefaultsOnHeroku');

const options = {};

if (process.env.NODE_ENV === 'production') {
  options.ssl = { rejectUnauthorized: false };
}

module.exports = options;
