"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api");
(0, typeorm_1.createConnection)()
    .then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
});
