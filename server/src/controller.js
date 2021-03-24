class Controller {
  #users = new Map();

  constructor({ socketServer }) {
    this.socketServer = socketServer;
  }

  onNewConnection(socket) {
    const { id } = socket;
    console.log(`connection stablished ${id}`);

    const userData = { id, socket };

    this.#udpateGlobalUserData(id, userData);

    socket.on('data', this.#onSocketData(id));
    socket.on('error', this.#onSocketClosed(id));
    socket.on('end', this.#onSocketEnded(id));
  }

  #onSocketClosed(id) {
    return data => {
      console.log('onSocketClosed', data.toString());
    }
  }

  #onSocketEnded(id) {
    return data => {
      console.log('onSocketData', data.toString());
    }
  }

  #onSocketData(id) {
    return data => {
      console.log('onSocketData', data.toString());
    }
  }

  #udpateGlobalUserData(socketId, userData) {
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
