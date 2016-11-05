var ids = {
  refreshToken: '***********',
  clientId: '***********',
  clientSecret: '***********',
};

function MicroOauth2(ids) {
  function getNewTokenData(ids) {
    var tokenEndpoint = 'https://accounts.google.com/o/oauth2/token';
    var payload = {
      client_secret: ids.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: ids.refreshToken,
      client_id: ids.clientId,
    };
    var options = {
      method: 'post',
      payload: payload,
    };
    var now = +new Date();
    var response = UrlFetchApp.fetch(tokenEndpoint, options);
    var tokenData  = JSON.parse(response.getContentText());
    tokenData.now = now;
    tokenData.isExpired = function () {
      return +new Date() > this.now + Number(this.expires_in);
    };

    return tokenData;
  }

  this.tokenData = {};
  var that = this;

  function GetToken() {
    if (that.tokenData.access_token === undefined) {
      that.tokenData = getNewTokenData(ids);
    } else if (that.tokenData.isExpired()) {
      that.tokenData = getNewTokenData(ids);
    }

    return that.tokenData.access_token;
  }

  this.getToken = GetToken;
}
