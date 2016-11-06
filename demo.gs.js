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

/**
* This function reate an empty file named 'test' in the authentified Drive
* if the action is successfull it log a code "200" as result
**/
function createFile() {
  // API reference https://developers.google.com/drive/v3/reference/files/create
  // scope https://www.googleapis.com/auth/drive
  var mo2 = new MicroOauth2(ids);
  var url = 'https://www.googleapis.com/drive/v3/files';
  var payload = {
    name: 'test',
  };
  var params = {
    headers: {
      Authorization: 'Bearer ' + mo2.getToken(), //access token from mo2
    },
    method: 'POST',
    payload: JSON.stringify(payload), // stringify is needed it's a known bug
    contentType: 'application/json',
    muteHttpExceptions: true, // to avoid failure
  };
  var response = UrlFetchApp.fetch(url, params);
  Logger.log(response.getResponseCode()); // should be '200'
}
