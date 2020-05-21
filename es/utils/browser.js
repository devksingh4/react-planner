var electron = window.require('electron');
var ipcRenderer = electron.ipcRenderer;

export function browserDownload(json) {
  var output = JSON.stringify(json);
  ipcRenderer.sendSync('layout-data', { output: output });
}

export function browserUpload() {
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