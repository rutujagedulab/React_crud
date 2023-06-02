"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = 3000;
app.get('/users', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepo = AppDataSource.getRepository(User_1.User);
        const user = yield userRepo.find(req.body);
        res.json(user);
    });
});
//     // Find all the records
//     const allRecords=await userRepo.find();
//      res.json(allRecords);
// }),
//  //Delete record
app.delete('/users/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepo = AppDataSource.getRepository(User_1.User);
        const user = yield userRepo.findOne({ where: { id: Number(req.params.id) } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        yield userRepo.remove(user);
        res.sendStatus(204);
    });
});
//     await userRepo.delete(2);
//     res.send("Record")
// }),
//     // Create a user
app.post('/users', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepo = AppDataSource.getRepository(User_1.User);
        const user = userRepo.create(req.body);
        yield userRepo.save(user);
        res.json(user);
    });
});
//Update the records
app.put('/users/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepo = AppDataSource.getRepository(User_1.User);
        const user = yield userRepo.findOne({ where: { id: Number(req.params.id) } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        userRepo.merge(user, req.body);
        yield userRepo.save(user);
        res.json(user);
    });
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
const AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'typeorm_db',
    entities: ['src/entities/*{.ts,.js}'],
    synchronize: true,
    logging: true
});
AppDataSource.initialize()
    .then(() => {
    console.log('Database Connected');
    app.listen(port, () => {
        console.log(`app is listening on port ${port}`);
    });
}).catch((err) => console.log('Error connecting database', err));
