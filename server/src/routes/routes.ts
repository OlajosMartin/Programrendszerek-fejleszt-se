import { Router, Request, Response, NextFunction } from 'express';
import { MainClass } from '../main-class';
import { PassportStatic } from 'passport';
import { User } from '../model/User';
import { Hotel } from '../model/Hotel';
import Booking from '../model/Booking';
import { Offer } from '../model/Offer';


export const configureRoutes = (passport: PassportStatic, router: Router): Router => {

    router.get('/', (req: Request, res: Response) => {
        let myClass = new MainClass();
        res.status(200).send('Hello, World!');
    });

    router.get('/callback', (req: Request, res: Response) => {
        let myClass = new MainClass();
        myClass.monitoringCallback((error, result) => {
            if (error) {
                res.write(error);
                res.status(400).end();
            } else {
                res.write(result);
                res.status(200).end();
            }
        });
    });

    router.get('/promise', async (req: Request, res: Response) => {
        let myClass = new MainClass();
        /* myClass.monitoringPromise().then((data: string) => {
            res.write(data);
            res.status(200).end();
        }).catch((error: string) => {
            res.write(error);
            res.status(400).end();
        }); */


        // async-await
        try {
            const data = await myClass.monitoringPromise();
            res.write(data);
            res.status(200).end();
        } catch (error) {
            res.write(error);
            res.status(400).end();
        }
    });


    router.get('/observable', (req: Request, res: Response) => {
        let myClass = new MainClass();
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.setHeader('Transfer-Encoding', 'chunked');

        // deprecated variant
        /* myClass.monitoringObservable().subscribe((data) => {
            console.log(data);
        }, (error) => {
            console.log(error);
        }, () => {
            console.log('complete');
        }); */

        myClass.monitoringObservable().subscribe({
            next(data: string) {
                res.write(data);
            }, error(error: string) {
                res.status(400).end(error);
            }, complete() {
                res.status(200).end();
            }
        });
    });

    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (error: string | null, user: any) => {//user: typeof User) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else {
                if (!user) {
                    res.status(400).send('User not found.');
                } else {
                    req.login(user, (err: string | null) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        } else {
                            res.status(200).send(user._id);
                        }
                    });
                }
            }
        })(req, res, next);
    });

    router.post('/register', (req: Request, res: Response) => {
        const email = req.body.email;
        const name = req.body.name;
        const address = req.body.address;
        const nickname = req.body.nickname;
        const password = req.body.password;
        const user = new User({email: email, name: name, address: address, nickname:nickname, password: password});
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    router.post('/logout', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getAllUsers', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = User.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.')
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/checkAuth', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
                res.status(200).send(true);
        } else {
            res.status(500).send(false);
        }
    });

    router.delete('/deleteUser', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = User.deleteOne({_id: id});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.')
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });
    
    router.delete('/deleteOffer', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = Offer.deleteOne({_id: id});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.')
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    /*router.get('/api/hotels/:id', async (req, res) => {
        const hotel = await Hotel.findById(req.params.id);
        if(!hotel) return res.status(404).json({error: 'Hotel nem található.'});
        res.json(hotel);
    });*/

    /*router.post('/hotels', (req, res) => {
        const { name, location, description, services, image } = req.body;
      
        if (!name || !location) {
          return res.status(400).json({ message: 'Hiányzó kötelező mezők' });
        }

        const hotel = new Hotel({ name, location, description, services, image });
      
        hotel.save()
          .then(() => res.status(201).json({ message: 'Hotel sikeresen létrehozva' }))
          .catch((err) => res.status(500).json({ message: 'Hiba a mentés során', error: err }));
      });

      router.get('/hotels', (req, res) => {
        Hotel.find()
          .then(hotels => res.json(hotels))
          .catch(err => res.status(500).json({ message: 'Hiba a lekérdezés során', error: err }));
      });*/
      

      router.post('/hotels', (req: Request, res: Response) => {
        const name = req.body.name;
        const location = req.body.location;
        const description = req.body.description;
        const services = req.body.services;
        const image = req.body.image;
        const hotel = new Hotel({name: name, location: location, description: description, services: services, image: image});
        hotel.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    router.get('/getAllHotels', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = Hotel.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.')
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.post('/bookings', (req: Request, res: Response) => {
        const hotelName = req.body.hotelName;
        const fromDate = req.body.fromDate;
        const toDate = req.body.toDate;
        const description = req.body.description;
        const price = req.body.price;
        const booking = new Booking({hotelName: hotelName, fromDate: fromDate, toDate: toDate, description: description, price: price});
        booking.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    router.get('/getAllBookings', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = Booking.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.')
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getUserOffer', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = Offer.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.')
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.post('/offer', async (req, res) => {
        const hotelName = req.body.hotelName;
        const fromDate = req.body.fromDate;
        const toDate = req.body.toDate;
        const description = req.body.description;
        const price = req.body.price;
        const userId = req.body.userId;
        const offer = new Offer({hotelName: hotelName, fromDate: fromDate, toDate: toDate, description: description, price: price, userId: userId});
        offer.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    return router;
}