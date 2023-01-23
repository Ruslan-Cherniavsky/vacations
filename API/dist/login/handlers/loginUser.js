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
exports.loginHandler = void 0;
const data_base_1 = require("../../data_base/data_base");
const signJwt_1 = require("./signJwt");
const md5_1 = __importDefault(require("md5"));
//----------------------------------LOGIN POST + AUTORIZATION---------------------------------
function loginHandler(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield loginUser({ userName: req.body.userName, password: req.body.password, });
            if (!result)
                throw new Error("User is not authorized");
            const token = (0, signJwt_1.signToken)({ userName: result.user_name, userId: result.id, role: result.role });
            res.json({ token });
        }
        catch (ex) {
            return next(ex);
        }
    });
}
exports.loginHandler = loginHandler;
function loginUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!user.password || !user.userName)
            throw new Error("Missing paramters");
        const query = `SELECT * FROM bxvtweaofqlvtdjztxk5.users where bxvtweaofqlvtdjztxk5.users.user_name = ? AND bxvtweaofqlvtdjztxk5.users.password = ? `;
        console.log(query);
        const [result] = yield (0, data_base_1.getConnection)().execute(query, [user.userName, (0, md5_1.default)(user.password),]);
        console.log(result[0]);
        return result[0];
    });
}
