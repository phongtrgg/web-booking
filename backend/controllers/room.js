const Rooms = require("../modules/room");
const Transaction = require("../modules/transaction");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

exports.fetchAll = (req, res, next) => {
  Rooms.find()
    .then((rooms) => {
      res.send(rooms);
    })
    .catch((err) => res.send({ ok: false, message: err }));
};

exports.getRoomCheck = (req, res, next) => {
  const start =
    Number(req.body.start.charAt(8) + req.body.start.charAt(9)) + 1;
  const end = Number(req.body.end.charAt(8) + req.body.end.charAt(9)) + 1;
  const day = end - start;

  const fixId = [];
  req.body.id.map((id) => {
    return fixId.push(new ObjectId(id).toString());
  });
  //tìm toàn bộ room
  Rooms.find()
    .then((room) => {
      const listRooms = [];
      //lặp qua room để lấy những room cần theo id
      room.map((r) => {
        const check = fixId.includes(r._id.toString());
        if (check) {
          return listRooms.push(r);
        }
      });
      return listRooms;
    })
    .then((r) => {
      //sau đó gọi phần giao dịch để check
      Transaction.find()
        .then((trans) => {
          let transList = [];
          let listId = [];
          //tìm kiếm trong toàn bộ giao dịch xem có giao dịch nào có trùng id với
          //id của room hay ko
          r.map((i) => listId.push(i._id));
          trans.map((t) => {
            return t.room.map((i) => {
              return listId.map((id) => {
                if (id.toString() === i._id.toString()) {
                  return transList.push(t);
                }
              });
            });
          });
          //sau khi tìm ra các giao dịch có room trùng thì sẽ check tiếp
          //đến ngày đặt phòng và số phòng
          const updateTrans = [];
          transList.map((item) => {
            const date = Number(item.dateStart.slice(8, 10)) + 1;
            //check ngày đặt đặt xem có trùng hay ko nếu trùng thì push vào 1 arr riêng để check tiếp
            if (date.toString() === start.toString()) {
              return updateTrans.push(item);
            }
          });
          //nếu mà array vừa check có length === 0 nghĩa là ko có ngày trùng
          //ta sẽ send thẳng luôn list room ở trên
          if (updateTrans && updateTrans.length === 0) {
            res.send(r);
          } else {
            //còn nếu trùng thì ta sẽ check tiếp số phòng
            const roomAndId = [];
            updateTrans.map((i) =>
              i.room.map((r) =>
                //đầu tiên ta lấy ra danh sách số phòng và id phòng
                roomAndId.push({ id: r._id, room: r.room })
              )
            );
            const resData = [];
            //sau đó lặp qua danh sách room 1 lần nữa
            r.map((item) => {
              //và mỗi lần lặp qua 1 room ta lại lặp qua danh sách số phòng và id
              roomAndId.map((room) => {
                //check nếu room đó trùng id
                if (room.id.toString() === item._id.toString()) {
                  //ta sẽ edit lại danh sách số phòng dùng filter và !==
                  //để loại bỏ số phòng trùng
                  item.roomNumbers = item.roomNumbers.filter((i) => {
                    return i.toString() !== room.room.toString();
                  });
                }
              });
              //sau đó ta check lại xem danh sách phòng của room đó sau khi lọc
              //nếu mà length===0 thì ta bỏ qua phòng đó luôn vì ko còn phòng trống
              if (item.roomNumbers.length > 0) {
                return resData.push(item);
              }
            });
            res.send(resData);
          }
        })
        .catch();
    })
    .catch();
};

exports.getDetailRoom = (req, res, next) => {
  const id = new ObjectId(req.params.roomId);
  Rooms.findById(id).then((room) => {
    res.send(room);
  });
};
