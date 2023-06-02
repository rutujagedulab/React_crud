import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import cors from 'cors';


const app=express();
app.use(express.json());
app.use(cors());
const port=3000;

app.get('/users', async function(req,res) {

    const userRepo=AppDataSource.getRepository(User);
    const user = await userRepo.find();
          res.json(user);
        });

//     // Find all the records
//     const allRecords=await userRepo.find();

//      res.json(allRecords);
// }),

    //  //Delete record
    app.delete('/users/:id', async function (req, res)  {
      
        const userRepo=AppDataSource.getRepository(User); 
        const user = await userRepo.findOne({where:{id:Number(req.params.id)}});
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      await userRepo.remove(user);
      res.sendStatus(204);
    });

    //     await userRepo.delete(2);
    //     res.send("Record")
    // }),

    
//     // Create a user
    app.post('/users', async function (req,res) {

    
      const userRepo= AppDataSource. getRepository(User);
      const user = userRepo.create(req.body);
      await userRepo.save(user);
      res.json(user);
    });


    //Update the records
    app.put('/users/:id', async function (req, res) {
            const userRepo =AppDataSource.getRepository(User); 
            const user = await userRepo.findOne({where:{id:Number(req.params.id)}});
                  if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                  }
                  userRepo.merge(user, req.body);
                  await userRepo.save(user);
                  res.json(user);
                });   

    //         await userRepo.update(2,{firstName:'Prito',lastName:'Gherade',email:'prito@gmail.com'});
    //        res.send("Record Updated");
    // },

        // //   Insert record
    //   let user:User=new User();
    //   user.firstName='Anupa';
    //   user.lastName='Gherade';
    //   user.email='anu@gmail.com';

    //   const userInserted=await userRepo.save(user);
    //   res.json(userInserted);

    //filtering/get one record based on condition
//     const record=await userRepo.findOne({where:{firstName:'Rutuja'}})
//     res.json(record)
//     // res.send('Hello from Express');
// });

const AppDataSource=new DataSource({
    type:'mysql',
    host :'localhost',
    port :3306,
    username :'root',
    password :'root',
    database :'typeorm_db',
    entities :['src/entities/*{.ts,.js}'],
    synchronize :true,
    logging :true 
});

AppDataSource.initialize() 
.then(() =>{
    console.log('Database Connected');
    app.listen(port,() =>{
        console.log(`app is listening on port ${port}`);
    }); 
}) .catch((err) =>console.log('Error connecting database',err));


