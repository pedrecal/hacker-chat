class CliConfig {
  constructor({ username, room, hostUri = process.env.HOST_URL }) {
    this.username = username;
    this.room = room;

    const { hostname, port, protocol } = new URL(hostUri);

    this.host = hostname;
    this.port = port;
    this.protocol = protocol.replace(/\W/, '');
  }

  static parseArguments(commands) {
    const commandPrefix = '--';

    const cmd = new Map();

    for (const key in commands) {

      const index = parseInt(key);
      const command = commands[key];

      if (!command.includes(commandPrefix)) {
        continue;
      }

      cmd.set(
        command.replace(commandPrefix, ''),
        commands[index + 1]
      );
    }

    return new CliConfig(Object.fromEntries(cmd));
  }
}

export default CliConfig;
