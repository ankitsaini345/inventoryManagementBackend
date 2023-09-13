require('express-async-errors');
const winston = require('winston');

module.exports = function() {
    winston.handleExceptions(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File({filename: 'winstonLogs.log'})
    );

    process.on('unhandledRejection', ex => {
        // console.log(ex);
        throw ex;
    })

    winston.add(winston.transports.File, {filename: 'winston_log_file_all.log'});

    //   throw new Error('Something failed during startup!!');
    // const p = Promise.reject(new Error('Something failed miserably!'))
}