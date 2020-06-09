export function browserDownload(json) {
  let output = JSON.stringify(json);
  let ws = new WebSocket("ws://localhost:" + global.backendPort + "/web/app/events");
  ws.onopen = () => {
    ws.send(JSON.stringify({
      "Event": "layout-data",
      "AtrNameInFrontend": output,
    }))
  }
}

export function browserUpload() {
  return new Promise(function (resolve, reject) {

    let fileInput = document.createElement('input');
    fileInput.type = 'file';

    fileInput.addEventListener('change', function (event) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.addEventListener('load', (fileEvent) => {
        let loadedData = fileEvent.target.result;
        resolve(loadedData);
      });
      reader.readAsText(file);
    });

    fileInput.click();
  });
}
