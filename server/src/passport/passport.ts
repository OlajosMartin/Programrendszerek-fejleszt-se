import { PassportStatic } from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../model/User';

export const configurePassport = (passport: PassportStatic): PassportStatic => {

    passport.serializeUser((user: Express.User, done) => {
        console.log('user is serialized.');
        done(null, user);
    });

    passport.deserializeUser((user: Express.User, done) => {
        console.log('user is deserialized.');
        done(null, user);
    });

    /*passport.use('local', new Strategy((username, password, done) => {
        const query = User.findOne({ email: username });
        query.then(user => {
            if (user) {
                user.comparePassword(password, (error, user) => {
                    if (error) {
                        done('Incorrect username or password.');
                    } else {
                        done(null, user);
                    }
                });
            } else {
                done(null, undefined);
            }
        }).catch(error => {
            done(error);
        })
    }));*/

    passport.use('local', new Strategy((username, password, done) => {
    User.findOne({ email: username }).then(user => {
            if (!user) {
                return done(null, false);
            }

            user.comparePassword(password, (error, isMatch) => {
                if (error || !isMatch) {
                    return done(null, false);
                }

                return done(null, user);
            });
        }).catch(error => {
            done(error);
        });
    }));


    return passport;
}