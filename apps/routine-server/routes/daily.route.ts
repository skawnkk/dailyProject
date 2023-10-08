import express from 'express';
import * as dailyController from '../controllers/daily.controller';
const dailyRouter = express.Router();

//monthly
dailyRouter.get('/daily', dailyController.getDailyList);

//daily
dailyRouter.get('/daily/:id', dailyController.getDaily);
dailyRouter.post('/daily', dailyController.createDaily);
dailyRouter.post('/daily/:id', dailyController.updateDaily);

//daily_timetable
dailyRouter.post('/daily/:id/schedule', dailyController.updateSchedule);

export default dailyRouter;
