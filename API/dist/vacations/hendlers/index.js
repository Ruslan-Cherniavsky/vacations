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
exports.updateVacation = exports.userData = exports.likedCheack = exports.filteredVacation = exports.unlikeVacation = exports.likeVacation = exports.deleteVacation = exports.getVacations = exports.postVacation = void 0;
const data_base_1 = require("../../data_base/data_base");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//--------------------------------------POST VACAION-----------[ID auto incremental in DB]----------------------
function postVacation(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        yield postVacationHandler(req.body);
        return res.status(200).json({ message: "POSTED!!!" });
    });
}
exports.postVacation = postVacation;
function postVacationHandler(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const { destination, description, picture, date_start, date_end, price } = payload;
        const query = postVacationQuery();
        const [result] = yield (0, data_base_1.getConnection)().execute(query, [destination, description, picture, date_start, date_end, price]);
        console.log("******************VACAION ADDET TO DB**********************");
        return result;
    });
}
const postVacationQuery = () => {
    return `INSERT INTO bxvtweaofqlvtdjztxk5.vacations (destination, description, picture, date_start, date_end, price) VALUES (?, ?, ?, ?, ?, ?);
    `;
};
//--------------------------------------GET ALL VACAIONS----------------------------------
function getVacations(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield getVacationsHandler();
        if (!result)
            throw new Error("Data not found!");
        return res.status(200).json(result);
    });
}
exports.getVacations = getVacations;
function getVacationsHandler() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = getInputsQuery();
        const [result] = yield (0, data_base_1.getConnection)().execute(query);
        console.log(result);
        console.log("******************VACAIONS FATCHED FROM DB**********************");
        return result;
    });
}
const getInputsQuery = () => {
    return `SELECT * FROM bxvtweaofqlvtdjztxk5.vacations ORDER BY time_created DESC`;
};
//------------------------------------ LIKE VACATION-------------------------------------------------
function likeVacation(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (token === null)
            return res.sendStatus(401);
        jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, userDecoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            else {
                req.userData = userDecoded === null || userDecoded === void 0 ? void 0 : userDecoded.data;
            }
        });
        console.log("************* req.user *************");
        console.log(req.userData);
        console.log("************* req.user *************");
        const results = yield likeVacationHandler(req.userData.userId, req.params.id);
        res.json({ message: "LIKED VACATION ADDET TO DB", products: results });
    });
}
exports.likeVacation = likeVacation;
function likeVacationHandler(userId, vacationId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = likeVacationQuery();
        console.log(query);
        const [result] = yield (0, data_base_1.getConnection)().execute(query, [userId, vacationId]);
        console.log("******************LIKED VACATION ADDET TO DB**********************");
        return result;
    });
}
const likeVacationQuery = () => {
    return `INSERT INTO bxvtweaofqlvtdjztxk5.followed_vacations (user_id, vacation_id) VALUES (?, ?);
    `;
};
//------------------------------------UNLIKE VACATION--------------------------------------------------
function unlikeVacation(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (token === null)
            return res.sendStatus(401);
        jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, userDecoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            else {
                req.userData = userDecoded === null || userDecoded === void 0 ? void 0 : userDecoded.data;
            }
        });
        console.log("************* req.user *************");
        console.log(req.userData);
        console.log("************* req.user *************");
        const results = yield FollowVacation(req.params.id);
        res.json({ message: "LIKED VACATION DELETED FROM DB", products: results });
    });
}
exports.unlikeVacation = unlikeVacation;
function FollowVacation(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = deleteFollowVacationQuery();
        console.log(query);
        const [result] = yield (0, data_base_1.getConnection)().execute(query, [id]);
        console.log("******************LIKED VACATION DELETED FROM DB**********************");
        return result;
    });
}
const deleteFollowVacationQuery = () => {
    return `DELETE FROM bxvtweaofqlvtdjztxk5.followed_vacations WHERE (vacation_id = ?);`;
};
//--------------------------------------GET LIKED VACATIOS----------------------------------
function filteredVacation(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (token === null)
            return res.sendStatus(401);
        jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, userDecoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            else {
                req.userData = userDecoded === null || userDecoded === void 0 ? void 0 : userDecoded.data;
            }
        });
        console.log("++++++++++++ req.user ++++++++++++");
        console.log(req.userData);
        console.log("++++++++++++ req.user ++++++++++++");
        const result = yield getfilteredVacation(req.userData.userId);
        return res.status(200).json(result);
    });
}
exports.filteredVacation = filteredVacation;
function getfilteredVacation(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = filteredVacationQuery();
        const [result] = yield (0, data_base_1.getConnection)().execute(query, [userId]);
        console.log(result);
        console.log("******************DATA FATCHED FROM DB**********************");
        return result;
    });
}
const filteredVacationQuery = () => {
    return `SELECT bxvtweaofqlvtdjztxk5.vacations.id, destination, description, picture, date_start, date_end, price FROM bxvtweaofqlvtdjztxk5.vacations
    LEFT JOIN bxvtweaofqlvtdjztxk5.followed_vacations
    ON followed_vacations.vacation_id = bxvtweaofqlvtdjztxk5.vacations.id
    WHERE (bxvtweaofqlvtdjztxk5.followed_vacations.user_id = ?) ORDER BY time_created DESC;
    `;
};
// ---------old sheeta ------
`SELECT bxvtweaofqlvtdjztxk5.vacations.id, destination, description, picture, date_start, date_end, price FROM bxvtweaofqlvtdjztxk5.users
    LEFT JOIN bxvtweaofqlvtdjztxk5.followed_vacations
   ON followed_vacations.user_id = bxvtweaofqlvtdjztxk5.users.id
   LEFT JOIN bxvtweaofqlvtdjztxk5.vacations 
   ON bxvtweaofqlvtdjztxk5.vacations.id = bxvtweaofqlvtdjztxk5.followed_vacations.vacation_id
   WHERE bxvtweaofqlvtdjztxk5.users.user_name = ?
    `;
//---------------------------CHEACK LIKED VACATIONS----[liked vacation id's by current user id]-----------------------
function likedCheack(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (token === null)
            return res.sendStatus(401);
        jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, userDecoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            else {
                req.userData = userDecoded === null || userDecoded === void 0 ? void 0 : userDecoded.data;
            }
        });
        console.log("XXXXXXXXXXXX req.user XXXXXXXXXXXX");
        console.log(req.userData);
        console.log("XXXXXXXXXXXX req.user XXXXXXXXXXXX");
        const result = yield likedHandleCheack(req.userData.userId);
        return res.status(200).json(result);
    });
}
exports.likedCheack = likedCheack;
function likedHandleCheack(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = likedCheackQuery();
        const [result] = yield (0, data_base_1.getConnection)().execute(query, [userId]);
        console.log(result);
        console.log("******************DATA FATCHED FROM DB**********************");
        return result;
    });
}
const likedCheackQuery = () => {
    return `SELECT vacation_id FROM bxvtweaofqlvtdjztxk5.vacations
    LEFT JOIN bxvtweaofqlvtdjztxk5.followed_vacations
    ON followed_vacations.vacation_id = bxvtweaofqlvtdjztxk5.vacations.id
    WHERE bxvtweaofqlvtdjztxk5.followed_vacations.user_id = ?;
    `;
};
//-----------------------------------GET USER DATA ---[React cheak - Role, user_name, id]---------------------------------
function userData(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (token === null)
            return res.sendStatus(401);
        jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, userDecoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            else {
                req.userData = userDecoded === null || userDecoded === void 0 ? void 0 : userDecoded.data;
            }
        });
        console.log("=(^.^)= =(^.^)= =(^.^)=req.user =(^.^)= =(^.^)= =(^.^)=");
        console.log(req.userData);
        console.log("=(^.^)= =(^.^)= =(^.^)=req.user =(^.^)= =(^.^)= =(^.^)=");
        const result = req.userData;
        return res.status(200).json(result);
    });
}
exports.userData = userData;
//-------------------------------------+++++++++-----ADMIN------+++++++--------------------------------------------
//---------------------------DELETE-----[Vacation ID from REACT component props to params]-------------------------
function deleteVacation(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield deleteVacationHandler(req.params.id);
            if (!results)
                throw new Error("target not found!");
            res.json({ message: "DELETED!!!", products: results });
        }
        catch (err) {
            return console.log(err);
        }
    });
}
exports.deleteVacation = deleteVacation;
function deleteVacationHandler(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = deleteVacationQuery();
        console.log(query);
        const [result] = yield (0, data_base_1.getConnection)().execute(query, [id]);
        console.log("******************VACATION DELETED FROM DB**********************");
        return result;
    });
}
const deleteVacationQuery = () => {
    return `DELETE FROM bxvtweaofqlvtdjztxk5.vacations WHERE (id = ?);`;
};
//-------------------------------------UPDATE VACATION-----------------------------
function updateVacation(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const vacationId = req.params.id;
        yield updateVacationHandler(req.body, vacationId);
        return res.status(200).json({ message: "UPDATED!!!" });
    });
}
exports.updateVacation = updateVacation;
function updateVacationHandler(payload, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const { destination, description, picture, date_start, date_end, price } = payload;
        const query = updateVacationQuery();
        const [result] = yield (0, data_base_1.getConnection)().execute(query, [id, destination, description, picture, date_start, date_end, price]);
        console.log("******************VACATION UPDATED TO DB**********************");
        return result;
    });
}
const updateVacationQuery = () => {
    return `REPLACE INTO bxvtweaofqlvtdjztxk5.vacations (id, destination, description, picture, date_start, date_end, price) VALUES (?,?,?,?,?,?,?) 
    `;
};
