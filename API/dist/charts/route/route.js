"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const charts_1 = require("../handlers/charts");
const router = express_1.default.Router();
router.get("/", charts_1.charts);
exports.default = router;
