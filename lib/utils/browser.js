'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.browserDownload = browserDownload;
exports.browserUpload = browserUpload;
var electron = window.require('electron');
var ipcRenderer = electron.ipcRenderer;

function browserDownload(json) {
  var output = JSON.stringify(json);
  ipcRenderer.sendSync('layout-data', { output: output });
}

function browserUpload() {
  return new Promise(function (resolve, reject) {

    var fileInput = document.createElement('input');
    fileInput.type = 'file';

    fileInput.addEventListener('change', function (event) {
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.addEventListener('load', function (fileEvent) {
        var loadedData = fileEvent.target.result;
        resolve(loadedData);
      });
      reader.readAsText(file);
    });

    fileInput.click();
  });
}