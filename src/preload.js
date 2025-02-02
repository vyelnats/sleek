"use strict";
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld(
  "api", {
    send: (channel, data) => {
      let validChannels = [
        "appData",
        "userData",
        "getContent",
        "translations",
        "showNotification",
        "writeToFile",
        "startFileWatcher",
        "changeLanguage",
        "openOrCreateFile",
        "copyToClipboard",
        "update-badge",
        "triggerFunction",
        "restart",
        "closeWindow",
        "changeWindowTitle",
        "darkmode"
      ];
      if(validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    receive: (channel, func) => {
      let validChannels = [
        "translations",
        "update-badge",
        "getContent",
        "userData",
        "appData",
        "startFileWatcher",
        "buildTable",
        "triggerFunction"
      ];
      if(validChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    }
  }
);
