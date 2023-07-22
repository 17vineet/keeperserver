import { OAuth2Client } from 'google-auth-library' ;

const auth = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const client = new OAuth2Client();

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '899913835169-l0hk1rdrpv19ajsif83qr83gafmopf72.apps.googleusercontent.com'
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];

        req.userid = userid ;

        next();
    } catch (error) {
        res.status(401).json(error) ;
    }

}

export default auth;