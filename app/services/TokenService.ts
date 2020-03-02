const httpErrors = require('http-errors');
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');

export class TokenService {
    constructor(public models: any, public req: any) {}

    public requestUserToken() : Promise<any> {
        return new Promise((resolve, reject) => {
            this.models.User.findOne({
                where: {
                    email: this.req.body.credential.email,
                    deletedAt: null
                    //{ createdAt:  { $lte: now() } },
                }
            })
            .then(user => {
                if(user !== null) {
                    bcrypt.compare(this.req.body.credential.password, user.password, (err, res) => {
                        if(res == true) {
                            var expirationTime = moment().add(7, 'days');
                            var accessToken = jwt.sign({
                                exp: expirationTime.unix(),
                                data: {
                                    id: user.id,
                                    isAdmin: false
                                }
                            }, process.env.JWT_SECRET);
            
                            this.models.Token.findOrCreate({
                                where: {
                                    userId: user.id.toString(),
                                    deviceId: this.req.body.credential.deviceId.toString()
                                },
                                defaults: {
                                    hash: accessToken,
                                    expireAt: expirationTime.format(),
                                    userType: 'User'
                                }
                            })
                            .spread((token, created) => {
                                if(!created) {
                                    token.update({
                                        hash: accessToken,
                                        expireAt: expirationTime.format()
                                    })
                                    .then((result) => {
                                        resolve({
                                            code: 200,
                                            data: {
                                                accessToken: token.hash
                                            }
                                        });
                                    })
                                    .catch((err) => {
                                        reject(httpErrors(500, 'An error ocurred saving the token'));
                                    });
                                }
                                else {
                                    resolve({
                                        code: 200,
                                        data: {
                                            accessToken: token.hash
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            reject(httpErrors(403, 'Invalid credentials'));
                        }
                    });
                }
                else {
                    reject(httpErrors(403, 'Invalid credentials'));
                }
            });
        });
    }

    public requestAdminToken() : Promise<any> {
        return new Promise((resolve, reject) => {
            this.models.Admin.findOne({
                where: {
                    email: this.req.body.credential.email
                }
            })
            .then(admin => {
                if(admin !== null) {
                    bcrypt.compare(this.req.body.credential.password, admin.password, (err, res) => {
                        if(res == true) {
                            var expirationTime = moment().add(7, 'days');
                            var accessToken = jwt.sign({
                                exp: expirationTime.unix(),
                                data: {
                                    id: admin.id,
                                    isAdmin: true
                                }
                            }, process.env.JWT_SECRET);
            
                            this.models.Token.findOrCreate({
                                where: {
                                    userId: admin.id.toString(),
                                    deviceId: this.req.body.credential.deviceId.toString()
                                },
                                defaults: {
                                    hash: accessToken,
                                    expireAt: expirationTime.format(),
                                    userType: 'Admin'
                                }
                            })
                            .spread((token, created) => {
                                if(!created) {
                                    token.update({
                                        hash: accessToken,
                                        expireAt: expirationTime.format()
                                    })
                                    .then((result) => {
                                        resolve({
                                            code: 200,
                                            data: {
                                                accessToken: token.hash
                                            }
                                        });
                                    })
                                    .catch((err) => {
                                        reject(httpErrors(500, 'An error ocurred saving the token'));
                                    });
                                }
                                else {
                                    resolve({
                                        code: 200,
                                        data: {
                                            accessToken: token.hash
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            reject(httpErrors(403, 'Invalid credentials'));
                        }
                    });
                }
                else {
                    reject(httpErrors(403, 'Invalid credentials'));
                }
            });
        });
    }
}