let env = process.env.NODE_ENV || 'development';
console.log('env ****', env);

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://admin:admin@ds139791.mlab.com:39791/bilbokning';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://admin:admin@ds137121.mlab.com:37121/bilbokning_test';
}