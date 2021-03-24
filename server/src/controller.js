import { constants } from "../../client/src/constants.js";

class Controller {
  #users = new Map();
  #rooms = new Map();

  constructor({ socketServer }) {
    this.socketServer = socketServer;
  }

  onNewConnection(socket) {
    const { id } = socket;
    console.log(`connection stablished ${id}`);

    const userData = { id, socket };

    this.#updateGlobalUserData(id, userData);

    socket.on('data', this.#onSocketData(id));
    socket.on('error', this.#onSocketClosed(id));
    socket.on('end', this.#onSocketEnded(id));
  }

  async joinRoom(socketId, data) {
    const userData = JSON.parse(data);
    console.log(`${userData.userName} joined!`[socketId]);

    const { roomId } = userData;
    const users = this.#joinUserOnRoom(roomId, user);

    const currentUsers = Array.from(users.values())
      .map(({ id, userName }) => ({ userName, id }));


    this.socketServer.sendMessage(user.socket, constants.events.UPDATE_USERS, currentUsers);

    const user = this.#updateGlobalUserData(socketId, userData);
  }

  #joinUserOnRoom(roomId, user) {
    const usersOnRoom = this.#rooms.get(roomId) ?? new Map;
    usersOnRoom.set(user.id, user);
    this.#rooms.set(roomId, usersOnRoom);

    return usersOnRoom;
  }

  #onSocketClosed(id) {
    return data => {
      console.log('onSocketClosed', id);
    }
  }

  #onSocketEnded(id) {
    return data => {
      console.log('onSocketData', data.toString());
    }
  }

  #onSocketData(id) {
    return data => {
      try {
        const { event, message } = JSON.parse(data);
        this[event](id, message);
      } catch (error) {
        console.error(`wrong event format!!`, data.toString());
      }

    }
  }

  #updateGlobalUserData(socketId, userData) {
    const users = this.#users;
    const user = users.get(socketId) ?? {};

    const updatedUserData = {
      ...user,
      ...userData
    };

    users.set(socketId, updatedUserData);

    return users.get(socketId);
  }
}

export default Controller;
