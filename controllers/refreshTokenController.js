// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }
const User = require('../model/User');

// const { json } = require('express');

const jwt = require('jsonwebtoken');
// require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    // const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403) // forbidden
    // evaluate jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                { 
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles, 
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' } // change to longer time in production
            );
            res.json({ accessToken }) 
        }
    );
}

module.exports = { handleRefreshToken }