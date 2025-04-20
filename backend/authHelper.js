import jwt from 'jsonwebtoken';

const generateAuthToken = (userId) => {
    
    const token = jwt.sign({ email: userId }, process.env.JWT_SECRET, { expiresIn: '7h' });
    return token;
};

const verifyAuthToken = (token) => {
    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded; 
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

const extractTokenFromHeader = (req) => {
   
    const token = req.header('Authorization')?.replace('Bearer ', '');
    return token;
};

export { generateAuthToken, verifyAuthToken, extractTokenFromHeader };
