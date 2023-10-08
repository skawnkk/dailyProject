import * as dailyService from '../services/daily.service';
export const getDailyList = async (req, res, next) => {
  const { year, month } = req.query;
  dailyService.getDailyList({ year, month }, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || 'no data' });
    }
    return res.status(200).send(data);
  });
};

export const getDaily = async (req, res, next) => {
  dailyService.findDaily(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || 'no data' });
    }
    return res.status(200).send(data);
  });
};

export const createDaily = async (req, res, next) => {
  const { date } = req.body;
  dailyService.createDaily(date, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || 'no data' });
    }
    return res.status(200).send(data);
  });
};

export const updateDaily = async (req, res, next) => {
  const { id: dailyId } = req.params;
  const { id, value } = req.body;
  dailyService.updateDaily({ dailyId, id, value }, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || 'no data' });
    }
    return res.status(200).send(data);
  });
};
export const updateSchedule = async (req, res, next) => {
  const { time, schedule } = req.body;
  dailyService.updateSchedule(req.params.id, time, schedule, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || 'no data' });
    }
    return res.status(200).send(data);
  });
};
