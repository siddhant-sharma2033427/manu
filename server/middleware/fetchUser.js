import jwt from 'jsonwebtoken';
const JWT_SEC = "ss11666665@123"
const fetchUser = (req, res, next) => {
    //get the user jwt token and appent user id
    const token = req.header('auth-token');
    console.log(token)
    if (!token) {
        res.status(401).send({ error: "please authenticate using valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SEC);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "please authenticate using valid token" });
    }
}

export default fetchUser