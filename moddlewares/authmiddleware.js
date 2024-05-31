const JWT = require('jsonwebtoken');

const userAuth = async (req, res, next) =>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearrer')){
        next('Auth Failed');
    }
    const token = authHeader.splite(' ')[1]
    try {
        
    } catch (error) {
        
    }
}