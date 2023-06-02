// import express, { Request, Response } from 'express';
// import { createConnection } from 'typeorm';
// import { User } from './entities/User';
// // import { UserRepository } from './repositories/UserRepository';

// createConnection()
//   .then(async () => {
//     const app = express();
//     app.use(express.json());

//     // Get all users
//     app.get('/users', async (req: Request, res: Response) => {
//       const userRepository = await UserRepository();
//       const users = await userRepository.find();
//       res.json(users);
//     });

//     // Create a user
//     app.post('/users', async (req: Request, res: Response) => {
//       const userRepository = await UserRepository();
//       const user = userRepository.create(req.body);
//       await userRepository.save(user);
//       res.json(user);
//     });

//     // Update a user
//     app.put('/users/:id', async (req: Request, res: Response) => {
//       const userRepository = await UserRepository();
//       const user = await userRepository.findOne(req.params.id);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       userRepository.merge(user, req.body);
//       await userRepository.save(user);
//       res.json(user);
//     });

//     // Delete a user
//     app.delete('/users/:id', async (req: Request, res: Response) => {
//       const userRepository = await UserRepository();
//       const user = await userRepository.findOne(req.params.id);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       await userRepository.remove(user);
//       res.sendStatus(204);
//     });

//     const port = 3000;
//     app.listen(port, () => console.log(`Server running on port ${port}`));
//   })
//   .catch((error) => console.log('TypeORM connection error: ', error));
