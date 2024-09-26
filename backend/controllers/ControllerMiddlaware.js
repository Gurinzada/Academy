const executionTime = async (req, res, next) => {
    const start = Date.now()
    res.on('finish', () => {
        const duration = Date.now() - start
        console.log(`Request to ${req.path} took ${duration}ms`)
        console.log(`${req.method}`)
    })
    next()
}

const dynamicAnalysis = async(req, res, next) => {
    console.log(`Analyzing request data types...`)
    for(const key in req.body){
        console.log(`${key}: ${typeof req.body[key]}`)
    }
    for(const key in req.params){
        console.log(`${key}: ${typeof req.params[key]}`)
    }
    next()
}


module.exports = {executionTime, dynamicAnalysis}