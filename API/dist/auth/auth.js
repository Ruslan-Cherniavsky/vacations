"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    var _a;
    const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    if (token === null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, userDecoded) => {
        if (err) {
            return next(Object.assign(Object.assign({}, err), { status: 401 }));
        }
        else {
            req.userData = userDecoded === null || userDecoded === void 0 ? void 0 : userDecoded.data;
            console.log("#################### req.user ######################");
            console.log(req.userData);
            console.log("#################### req.user ######################");
            return next();
        }
    });
}
exports.default = verifyToken;
