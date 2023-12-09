const Hotel = require("../modules/hotel");
const Rooms = require("../modules/room");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

exports.fetchAll = (req, res, next) => {
  Hotel.find()
    .then((hotels) => {
      res.send(hotels);
    })
    .catch((err) => res.send({ ok: false, message: err }));
};

//valid search
exports.hotelSearch = (req, res, next) => {
  const fix = () => {
    if (req.body.city === "sai gon") {
      return "ho chi minh";
    }
    if (req.body.city === "HN" || req.body.city === "hn") {
      return "ha noi";
    }
    if (req.body.city === "hcm" || req.body.city === "HCM") {
      return "ho chi minh";
    }
    if (req.body.city === "DN" || req.body.city === "dn") {
      return "da nang";
    }
    return req.body.city;
  };
  const reqCity = fix();
  //gọi danh sách hotel và check theo city theo yêu cầu đề bài
  //3 city chính là hn hcm và dn
  Hotel.find()
    .then((hotels) => {
      let listHotel = [];
      hotels.map((i) => {
        if (i.city.toLocaleUpperCase() === reqCity.toLocaleUpperCase()) {
          return listHotel.push(i);
        }
      });
      return listHotel;
    })
    .then((listHotel) => {
      //sau khi có được danh sách hotel thì ta check xem số người thông qua
      //room liên kết với hotel đó
      Rooms.find()
        .then((ListRoom) => {
          let resData = [];
          //tìm ra room hợp lệ với số người
          const rooms = [];
          if (req.body.people !== "") {
            ListRoom.map((room) => {
              if (room.maxPeople >= Number(req.body.people)) {
                return rooms.push(room);
              }
            });
            //lặp qua danh sách hotel lấy room trùng id với hotel
            listHotel.map((hotel) => {
              if (hotel.rooms.length === 1) {
                const idRoom = new ObjectId(hotel.rooms[0]);
                rooms.map((room) => {
                  if (room._id.toString() === idRoom.toString()) {
                    return resData.push(hotel);
                  }
                });
              } else {
                const idRoom = [];
                hotel.rooms.map((id) => {
                  idRoom.push(new ObjectId(id).toString());
                });
                rooms.map((room) => {
                  const check = idRoom.includes(room._id.toString());
                  if (check) {
                    return resData.push(hotel);
                  }
                });
              }
              return resData;
            });
          }
          //phần này là check theo giá tiền min max nếu như ko có nhập giá
          //thì mặc định bé nhất là 0 lớn là 99999
          if (
            req.body.minPrice !== undefined ||
            req.body.maxPrice !== undefined
          ) {
            let min = req.body.minPrice === "" ? 0 : req.body.minPrice;
            let max = req.body.maxPrice === "" ? 99999 : req.body.maxPrice;

            let updateResData = [];
            //ta sẽ cập nhập lại danh sách khách sạn gửi đi với yêu cầu thoả mãn
            //điều kiện sau khi check giá tiền

            if (resData.length > 0) {
              resData.map((r) => {
                if (
                  Number(r.cheapestPrice) > Number(min) &&
                  r.cheapestPrice < Number(max)
                ) {
                  return updateResData.push(r);
                }
              });
              resData = updateResData;
            }
          }
          return resData;
        })
        .then((resData) => {
          //ở đây ta sửa lại 1 xíu vì sẽ có hotel rất nhiều phòng
          //để tránh gửi lặp ta sẽ check lại hotel và loại bỏ những
          //hotel bị trùng do có nhiều phòng thoả mãn
          const newRes = [];
          if (resData !== 0) {
            resData.map((r) => {
              if (newRes.length === 0) {
                return newRes.push(r);
              } else {
                const check = newRes.filter(
                  (hotel) => hotel._id.toString() === r._id.toString()
                );
                if (check.length === 0) {
                  return newRes.push(r);
                }
              }
            });
            res.send(newRes);
          }
        });
    })

    .catch();
};

//get 1 hotel chi tiết theo id
exports.getDetail = (req, res, next) => {
  const id = new ObjectId(req.params.hotelId);
  Hotel.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send({ ok: false, message: err });
    });
};
