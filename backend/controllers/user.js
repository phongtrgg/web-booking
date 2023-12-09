const User = require("../modules/user");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const Transaction = require("../modules/transaction");

exports.addUser = (req, res, next) => {
  if (req.body.length === 0) {
    return res.send({ ok: false });
  } else {
    User.find()
      .then((user) => {
        const check = user.findIndex((i) => {
          return i.username === req.body.username;
        });
        if (check === -1) {
          const user = new User({
            username: req.body.username,
            password: req.body.password,
            fullName: "null",
            phoneNumber: 0,
            email: "null",
            isAdmin: false,
          });
          user
            .save()
            .then((r) => {
              console.log("Created");
            })
            .then(() => {
              User.find()
                .then((users) => {
                  return users.filter(
                    (i) => i.username === req.body.username
                  );
                })
                .then((user) => {
                  res.send({ ok: true, userId: user[0]._id });
                });
            });
        } else {
          res.send({ ok: false, message: "người dùng đã tồn tại" });
        }
      })
      .catch();
  }
};

exports.loginUser = (req, res, next) => {
  User.find()
    .then((users) => {
      return users.filter((i) => i.username === req.body.username);
    })
    .then((user) => {
      //check danh sách toàn bộ user loc ra theo tên username nếu ko có phản hổi
      //nếu có thì check tiếp password
      if (user && user.length === 0) {
        res.send({ ok: false, message: "người dùng không tồn tại" });
      } else {
        if (req.body.password !== user[0].password) {
          res.send({ ok: false, message: "mật khẩu không chính xác" });
        } else {
          //ở đây sẽ check tiếp xem user có phải admin hay ko và phản hồi
          if (user[0].isAdmin) {
            res.send({
              ok: true,
              user: { name: user[0].username, id: user[0]._id },
              admin: true,
            });
          } else {
            res.send({
              ok: true,
              user: { name: user[0].username, id: user[0]._id },
              admin: false,
            });
          }
        }
      }
    })
    .catch((err) => res.send(err));
};

//từ phần user trở đi thì ko thấy đề yêu cầu nhưng làm thêm để hợp lý
//người dùng có thể tự edit thêm thông tin cá nhân
//cũng như thay đổi password
exports.getDetail = (req, res, next) => {
  const id = new ObjectId(req.body.id);
  User.findById(id)
    .then((user) => {
      Transaction.find()
        .then((trans) => {
          const resData = [];
          trans.map((t) => {
            if (t.userName === req.body.user) {
              return resData.push(t);
            }
          });
          return resData.length;
        })
        .then((resData) =>
          res.send({ user: user, ok: true, get: "user", order: resData })
        )
        .catch();
    })
    .catch((err) => {
      res.send({ ok: false, message: err });
    });
};

exports.editUser = (req, res, next) => {
  console.log(req.body);
  const id = new ObjectId(req.body.id);
  User.findById(id)
    .then((user) => {
      user.email = req.body.email;
      user.phoneNumber = Number(req.body.phone);
      user.fullName = req.body.fullName;
      user.password = req.body.password;
      console.log("save");
      return user.save().then(() => res.send({ ok: true, edit: true }));
    })
    .catch();
};
