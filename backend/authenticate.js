
import { verifyAuthToken, extractTokenFromHeader } from './authHelper.js';

const authenticate = (req, res, next) => {
  
  const token = extractTokenFromHeader(req);

  if (!token) {
    return res.status(401).send('Access denied. No token provided');
  }

  try {
    const decoded = verifyAuthToken(token);
    req.user = decoded;  
    next();  
  } catch (error) {
    res.status(400).send('Invalid or expired token');
  }
};

export default authenticate;
