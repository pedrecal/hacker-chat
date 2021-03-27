#!/usr/bin/env node

// REMEMBER TO: chmod +x index.js

import Events from 'events';
import EventManager from './src/eventManager.js';
import CliConfig from './src/cliConfig.js';
import TerminalController from "./src/terminalController.js";
import SocketClient from './src/socket.js';

import dotenv from 'dotenv'
dotenv.config()

const [nodePath, filePath, ...commands] = process.argv;

const config = CliConfig.parseArguments(commands);

const componentEmitter = new Events();
const socketClient = new SocketClient(config);

await socketClient.initialize();

const eventManager = new EventManager({ componentEmitter, socketClient });

const events = eventManager.getEvents();

socketClient.attachEvents(events);

const data = {
  roomId: config.room,
  userName: config.username
};
eventManager.joinRoomAndWaitForMessages(data);

const controller = new TerminalController();
await controller.initializeTable(componentEmitter);
