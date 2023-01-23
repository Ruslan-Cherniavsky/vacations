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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./vacations/route/route"));
const route_2 = __importDefault(require("./charts/route/route"));
const route_3 = __importDefault(require("./login/route/route"));
const route_4 = __importDefault(require("./registration/route/route"));
const auth_1 = __importDefault(require("./auth/auth"));
const app = (0, express_1.default)();
const data_base_1 = require("./data_base/data_base");
const { PORT } = process.env;
(0, data_base_1.initDB)();
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(body_parser_1.default.json());
app.get("/WORKING!!!", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send("Api is working!");
}));
app.use('/login', route_3.default); // midlewere
app.use('/regester', route_4.default); // midlewere
app.use(auth_1.default);
app.use('/vacations', route_1.default);
app.use('/charts', route_2.default);
app.listen(PORT || 3500, () => {
    console.log(`Listening to Port ${PORT || 3500}`);
});
