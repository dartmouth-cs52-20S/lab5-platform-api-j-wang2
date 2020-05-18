import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

export const signin = (req, res, next) => {
    console.log(req.user);
    // res.send({ token: tokenForUser(req.body) });
    res.send({ token: tokenForUser(req.user) });

    // return next();
};

export const signup = (req, res, next) => {
    console.log(req.body);
    const { email } = req.body;
    const { password } = req.body;
    console.log(email);
    console.log(password);

    if (!email || !password) {
        return res.status(422).send('You must provide email and password');
    }

    // check what User.find() returns
    User.findOne({ email }).then((result) => {
        if (result) {
            console.log(result);
            res.send({ error: 'User already exists' });
        } else {
            const newUser = new User();
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            newUser.save().then((userResult) => {
                console.log(userResult);
                res.send({ token: tokenForUser(newUser) });
            }).catch((error) => {
                return res.status(500).json({ error });
            });
        }
    })
};

// encodes a new token for a user object
function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
