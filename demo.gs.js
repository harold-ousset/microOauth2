function touchFile() {
  var mo2 = new MicroOauth2(ids);
  var id = '**********'; //  touched file id
  var url = 'https://www.googleapis.com/drive/v2/files/' + id + '/touch';
  var params = {
    headers: {
      Authorization: 'Bearer ' + mo2.getToken(),
    },
    method: 'POST',
    muteHttpExceptions: true,
  };
  var response = UrlFetchApp.fetch(url, params);
  Logger.log(response.getResponseCode());
  Logger.log(response.getContentText());
}

function createFile() {
  var mo2 = new MicroOauth2(ids);
  var url = 'https://www.googleapis.com/drive/v3/files';
  var payload = {
    name: 'test',
  };
  var params = {
    headers: {
      Authorization: 'Bearer ' + mo2.getToken(),
    },
    method: 'POST',
    payload: JSON.stringify(payload),
    contentType: 'application/json',
    muteHttpExceptions: true,
  };
  var response = UrlFetchApp.fetch(url, params);
  Logger.log(response.getResponseCode());
}
