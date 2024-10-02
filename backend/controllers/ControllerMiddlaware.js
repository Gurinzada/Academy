const fs = require('fs');
const path = require('path');
const os = require('os')

const filePath = path.join('C:', 'Users', 'augus', 'OneDrive', 'Área de Trabalho', 'request_log.txt');

const executionTime = async (req, res, next) => {
    const start = Date.now()
    res.on('finish', () => {
        const duration = Date.now() - start;
        const log = `Request to ${req.path} took ${duration}ms\nMethod: ${req.method}\n\n`

        fs.appendFile(filePath, log, (err) => {
            if (err) {
                console.error('Failed to write execution time to file', err)
            }
        })
    })
    next()
}

const dynamicAnalysis = async (req, res, next) => {
    let log = `Analyzing request data types\n`;

    for (const key in req.body) {
        log += `${key}: ${typeof req.body[key]}\n`;
    }

    for (const key in req.params) {
        log += `${key}: ${typeof req.params[key]}\n`;
    }

    log += `\n`;
    fs.appendFile(filePath, log, (err) => {
        if (err) {
            console.error('Failed to write dynamic analysis to file', err);
        }
    });

    next();
};

const logRequestHeaders = async (req, res, next) => {
    const headers = req.headers;
    const logData = [];

    logData.push(`\nRequest to ${req.path} at ${new Date().toISOString()}`);
    logData.push(`Method: ${req.method}`);
    
    // Log de cada header
    Object.keys(headers).forEach(key => {
        logData.push(`${key}: ${headers[key]}`);
    });

    const platform = os.platform()
    logData.push(`Plataforma: ${platform}`)

    const logText = logData.join('\n') + '\n';

    // Caminho para o arquivo de log na sua área de trabalho
    const logFilePath = path.join('C:', 'Users', 'augus', 'OneDrive', 'Área de Trabalho', 'header_logs.txt');

    // Append dos headers no arquivo de log
    fs.appendFile(logFilePath, logText, (err) => {
        if (err) {
            console.error('Error writing to log file', err);
        } else {
            console.log('Headers logged successfully');
        }
    });

    next();
};

module.exports = { executionTime, dynamicAnalysis, logRequestHeaders };
