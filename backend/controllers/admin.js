const Hotel = require("../modules/hotel");
const Rooms = require("../modules/room");
const Transaction = require("../modules/transaction");
const User = require("../modules/user");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

//lấy trung bình và tổng số doanh thu
exports.getRevenue = (req, res, next) => {
  Transaction.find().then((trans) => {
    let total = 0;
    trans.map((i) => {
      total = total + i.price;
      return total;
    });
    const balance = total / trans.length;
    User.find().then((u) => {
      res.send({
        balance: balance.toFixed(),
        user: u.length,
        order: trans.length,
        total: total.toFixed(),
        ok: true,
      });
    });
  });
};
//lấy danh sách Board lúc mới vào /8 trans gần nhất
exports.getBoard = (req, res, next) => {
  Transaction.find()
    .then((trans) => {
      const reverseTrans = trans.reverse();
      const page = req.body.page;
      const pageSize = 8;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const totalPage = trans.length / pageSize;
      if (reverseTrans.length < 9) {
        res.send({
          trans: reverseTrans,
          page: 1,
          get: true,
          totalPage: totalPage,
        });
      }
      if (reverseTrans.length > 8) {
        const resData = reverseTrans.slice(start, end);
        res.send({
          trans: resData,
          page: page,
          get: true,
          totalPage: totalPage,
        });
      }
    })
    .catch();
};
//lấy danh sách hotel hiện thị chia ra làm 8 item /page
exports.getHotel = (req, res, next) => {
  Hotel.find()
    .then((hotels) => {
      const page = req.body.page;
      const pageSize = 8;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const totalPage = hotels.length / pageSize;
      if (hotels.length < 9) {
        res.send({
          hotels: hotels,
          page: 1,
          get: true,
          totalPage: totalPage,
        });
      }
      if (hotels.length > 8) {
        const resData = hotels.slice(start, end);
        res.send({
          hotels: resData,
          page: page,
          get: true,
          totalPage: totalPage,
        });
      }
    })
    .catch();
};

//thêm 1 hotel mới
exports.postNewHotel = (req, res, next) => {
  //ở đây gọi lại toàn bộ danh sách hotel check name xem hotel
  //đã tồn tại hay chưa
  Hotel.find().then((hotels) => {
    const check = hotels.findIndex((item) => {
      return item.name === req.body.name;
    });
    if (check !== -1) {
      res.send({ ok: false, message: "Hotel đã tồn tại" });
    } else {
      const featured =
        req.body.featured.toString() === "No" ? false : true;
      const hotel = new Hotel({
        address: req.body.address,
        cheapestPrice: req.body.price,
        city: req.body.city,
        desc: req.body.desc,
        distance: req.body.distance,
        featured: featured,
        name: req.body.name,
        title: req.body.title,
        photos: req.body.image,
        rooms: [],
        type: req.body.type,
        rating: 3,
      });
      hotel
        .save()
        .then((result) => {
          console.log("Created");
          res.send({ ok: true });
        })
        .catch((err) => res.send({ ok: false, message: err }));
    }
  });
};

//ở mục deleteHotel này ban đầu sẽ lấy dữ liệu của toàn bộ đơn hàng
exports.deleteHotel = (req, res, next) => {
  const id = new ObjectId(req.body.id);
  Transaction.find().then((trans) => {
    //và check xem id của khách sạn có trùng không
    const check = trans.findIndex((i) => {
      return i.hotel.toString() === id.toString();
    });
    //nếu check ra -1 là ko có trùng id ở đơn hàng nào cả sẽ xác nhận delete luôn
    if (check === -1) {
      Hotel.findByIdAndRemove(id)
        .then((result) => {
          res.send({ delete: true });
        })
        .catch();
      //nếu trùng thì ta check tiếp xem đơn hàng đó người dùng đã checkout hay chưa
      //nếu checkout rồi thì có thể xoá hotel
    } else {
      if (trans[check].status === "Checkout") {
        Hotel.findByIdAndRemove(id)
          .then((result) => {
            res.send({ delete: true });
          })
          .catch();
      } else {
        res.send({
          delete: false,
          message: "Khách sạn đang có lịch đặt trước ",
        });
      }
    }
  });
};

//getrooms lấy danh sách của room chia ra theo từng page với 8 item 1 page
exports.getRooms = (req, res, next) => {
  Rooms.find()
    .then((rooms) => {
      const page = req.body.page;
      const pageSize = 8;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const totalPage = rooms.length / pageSize;
      if (rooms.length < 9) {
        res.send({
          rooms: rooms,
          page: 1,
          get: true,
          totalPage: totalPage,
        });
      }
      if (rooms.length > 8) {
        const resData = rooms.slice(start, end);
        res.send({
          rooms: resData,
          page: page,
          get: true,
          totalPage: totalPage,
        });
      }
    })
    .catch();
};

exports.postNewRoom = (req, res, next) => {
  const room = new Rooms({
    title: req.body.title,
    price: Number(req.body.price),
    maxPeople: Number(req.body.maxPeople),
    roomNumbers: req.body.room,
    desc: req.body.desc,
  });
  room
    .save()
    //sau khi tạo mới đc 1 room ta check lại list hotel lọc ra
    //hotel có trùng tên vừa gửi từ frontend và tiến hành find ID
    //và cập nhập lại mục rooms thêm vào id room vừa tạo
    .then((result) => {
      Hotel.find().then((h) => {
        const hotel = h.filter((item) => {
          return item.name === req.body.hotel;
        });
        if (hotel && hotel[0]) {
          const id = hotel[0]._id;
          Hotel.findById(id)
            .then((item) => {
              item.rooms = [...item.rooms, result._id];
              return item.save();
            })
            .then(() => res.send({ ok: true }));
        }
      });
    })
    .catch((err) => res.send({ ok: false, message: err }));
};

exports.deleteRoom = (req, res, next) => {
  const id = new ObjectId(req.body.id);
  //xoá room có id đc truyền từ frontend
  Rooms.findByIdAndRemove(id)
    .then((result) => {
      //sau khi xoá thì ta sẽ check 1 lượt hotel
      //để xem hotel nào chứa room đó và lọc ra
      //ở đây sài map lặp qua list hotel.rooms và check
      //theo id trùng thì push vào arr rỗng
      Hotel.find()
        .then((hotels) => {
          const hotelUpdate = [];
          hotels.map((i) => {
            return i.rooms.map((r) => {
              const fixId = new ObjectId(r);
              if (fixId.toString() === id.toString()) {
                return hotelUpdate.push(i);
              }
            });
          });
          //sau khi kiếm đc ra hotel chứa room đó đã push arr thì tiến hành
          //ghi đè(xoá) room đó của hotel ở đây sài map lặp qua
          //hotel.rooms cái nào khác thì push lại và cập nhập
          if (hotelUpdate && hotelUpdate[0]) {
            Hotel.findById(hotelUpdate[0]._id).then((i) => {
              const updateRoom = [];
              i.rooms.map((r) => {
                const fixId = new ObjectId(r);
                if (fixId.toString() !== id.toString()) {
                  return updateRoom.push(r);
                }
              });
              i.rooms = updateRoom;
              return i.save();
            });
          }
        })
        .then(() => res.send({ delete: true }));
    })
    .catch();
};

//chỉnh sửa lại hotel hàm này chỉ gọi lại hotel qua id và ghi đè
//lại dữ liệu từ người dùng
exports.postEditHotel = (req, res, next) => {
  const id = new ObjectId(req.params.hotelId);
  Hotel.findById(id).then((hotel) => {
    hotel.title = req.body.title;
    hotel.name = req.body.name;
    hotel.type = req.body.type;
    hotel.city = req.body.city;
    hotel.address = req.body.address;
    hotel.distance = req.body.distance;
    hotel.photos = req.body.image;
    hotel.desc = req.body.desc;
    hotel.featured = req.body.featured === "true" ? true : false;
    hotel.cheapestPrice = req.body.price;
    return hotel
      .save()
      .then(() => res.send({ ok: true }))
      .catch((err) => {
        res.send({ ok: false, message: err });
      });
  });
};
//chỉnh sửa room cũng giống như hotel
exports.postEditRoom = (req, res, next) => {
  const id = new ObjectId(req.params.roomId);
  Rooms.findById(id).then((room) => {
    room.title = req.body.title;
    room.price = req.body.price;
    room.maxPeople = req.body.maxPeople;
    room.roomNumbers = req.body.room;
    room.desc = req.body.desc;
    return room
      .save()
      .then(() => res.send({ ok: true }))
      .catch((err) => {
        res.send({ ok: false, message: err });
      });
  });
};

//hàm để lấy danh sách toàn bộ người dùng và cũng đc chia ra
//8 item /page
exports.getUser = (req, res, next) => {
  User.find()
    .then((user) => {
      const reverseUser = user.reverse();
      const page = req.body.page;
      const pageSize = 8;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const totalPage = user.length / pageSize;
      if (reverseUser.length < 9) {
        res.send({
          user: reverseUser,
          page: 1,
          get: true,
          totalPage: totalPage,
        });
      }
      if (reverseUser.length > 8) {
        const resData = reverseUser.slice(start, end);
        res.send({
          user: resData,
          page: page,
          get: true,
          totalPage: totalPage,
        });
      }
    })
    .catch();
};
exports.deleteUser = (req, res, next) => {
  const id = new ObjectId(req.body.id);
  User.findByIdAndRemove(id)
    .then((result) => {
      res.send({ delete: true });
    })
    .catch();
};

//edit Status của đơn hàng sau khi khách booked checkin checkout
//cái này ko yêu cầu làm nhưng làm thêm cho nó hợp lý để
//admin có thể tự động thay đổi quản lý khi người dùng đặt phòng và rời đi
//cũng như xoá đc hotel sau khi người dùng đã checkout
exports.editTransSTT = (req, res, next) => {
  const id = new ObjectId(req.body.id);
  Transaction.findById(id)
    .then((trans) => {
      trans.status = req.body.status;
      return trans.save();
    })
    .then(() => {
      res.send({ ok: true, edit: true });
    })
    .catch((err) => {
      res.send({ ok: false, edit: false, message: err });
    });
};
