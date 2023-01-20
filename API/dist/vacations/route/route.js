"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const index_1 = require("../hendlers/index");
//----GET---
router.get('/', index_1.getVacations);
//----USER ---
router.post('/follow/:id', index_1.likeVacation);
router.delete('/follow/:id', index_1.unlikeVacation);
router.get('/follow/', index_1.likedCheack);
router.get('/filtered/', index_1.filteredVacation);
router.get('/userData/', index_1.userData);
//----ADMIN ---
router.post('/', index_1.postVacation);
router.delete('/:id', index_1.deleteVacation);
router.post('/updatevacation/:id', index_1.updateVacation);
exports.default = router;
