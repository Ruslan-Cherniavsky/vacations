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
Object.defineProperty(exports, "__esModule", { value: true });
exports.charts = void 0;
const data_base_1 = require("../../data_base/data_base");
//-------------------------------------- CHART ----------------------------------
function charts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield getCharts();
        return res.status(200).json(result);
    });
}
exports.charts = charts;
function getCharts() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = getChartsQuery();
        const [result] = yield (0, data_base_1.getConnection)().execute(query);
        console.log(result);
        console.log("******************DATA FATCHED FROM DB**********************");
        return result;
    });
}
const getChartsQuery = () => {
    return `SELECT 
     destination, COUNT(user_id) as user_likes
FROM
    bxvtweaofqlvtdjztxk5.followed_vacations 
    LEFT JOIN bxvtweaofqlvtdjztxk5.vacations
ON vacations.id = bxvtweaofqlvtdjztxk5.followed_vacations.vacation_id 
GROUP BY vacation_id Order By user_likes  DESC 
LIMIT 5 `;
};
