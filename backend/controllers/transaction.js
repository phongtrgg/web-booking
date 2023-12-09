const Transaction = require("../modules/transaction");
const Room = require("../modules/room");

exports.addTransaction = (req, res, next) => {
  const start = String(req.body.dateStart).slice(0, 10);
  const end = String(req.body.dateEnd).toString().slice(0, 10);
  const transaction = new Transaction({
    userName: req.body.userName,
    hotel: req.body.hotel,
    user: req.body.user,
    room: req.body.room,
    dateStart: start,
    dateEnd: end,
    price: req.body.price,
    payment: req.body.payment,
    status: req.body.status,
  });
  transaction
    .save()
    .then(() => {
      res.send({ ok: true, booked: true });
    })
    .catch();
};

exports.getTransaction = (req, res, next) => {
  Transaction.find()
    .then((trans) => {
      const resData = [];
      trans.map((t) => {
        if (t.userName === req.body.name) {
          return resData.push(t);
        }
      });
      return resData.reverse();
    })
    .then((resData) => res.send(resData))
    .catch();
};
