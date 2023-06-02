"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
(0, typeorm_1.createConnection)()
    .then(() => console.log("Connected to the database"))
    .catch((error) => console.log("Database connection error: ", error));
