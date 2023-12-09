import React from "react";

function TypeRoom(props) {
  const room = props.room;

  const checkRoom = (e) => {
    if (!room) {
      props.setRoom({
        room: e.target.id,
        price: props.price,
        _id: props.id,
        title: props.title,
      });
    } else {
      const check = room.findIndex((i) => {
        return e.target.id === i.room;
      });
      if (check !== -1) {
        const update = room.filter((i) => {
          return e.target.id !== i.room;
        });
        props.setRoom(update);
      } else {
        return props.setRoom([
          ...room,
          {
            room: e.target.id,
            price: props.price,
            _id: props.id,
            title: props.title,
          },
        ]);
      }
    }
  };

  return (
    <React.Fragment>
      {props && (
        <div className="flex">
          <div className="flex01">
            <h2>{props.title}</h2>
            <p>{props.desc} </p>
            <p>{`Max people: ${props.people}`}</p>
            <p>
              <strong>{`$${props.price}`}</strong>
            </p>
          </div>
          <div className="flex02">
            {props.roomNum.map((item, i = 0) => {
              return (
                <div className="numberRoom" key={i++}>
                  <p>{item}</p>
                  <input
                    type="checkbox"
                    key={item}
                    id={item}
                    onChange={checkRoom}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default TypeRoom;
