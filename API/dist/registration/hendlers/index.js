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
exports.postRegistration = void 0;
const data_base_1 = require("../../data_base/data_base");
const md5_1 = __importDefault(require("md5"));
function postRegistration(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        yield addUser(req.body);
        return res.status(200).json({ message: "NEW USER REGISTERED!!!" });
    });
}
exports.postRegistration = postRegistration;
function addUser(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const role = "user";
        const { userName, firstName, lastName, password } = payload;
        const query = addUersQuery();
        const [result] = yield (0, data_base_1.getConnection)().execute(query, [userName, firstName, lastName, role, (0, md5_1.default)(password),]);
        console.log("******************DATA USER ADDET TO DB**********************");
        return result;
    });
}
const addUersQuery = () => {
    return `INSERT INTO vc.users (user_name, first_name, last_name, role,  password) VALUES (?, ?, ?, ?, ?);
    `;
};
