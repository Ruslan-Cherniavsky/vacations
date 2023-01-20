"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const index_1 = require("../hendlers/index");
router.post('/', index_1.postRegistration);
exports.default = router;
