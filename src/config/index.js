
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

console.log(`Use ${env} config.`);

module.exports = require('./' + env);