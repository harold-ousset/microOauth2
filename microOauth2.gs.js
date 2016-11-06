var ids = {
  refreshToken: '***********', // Obtained from the Oauth 2 playground
  clientId: '***********', // Obtained from the developer console
  clientSecret: '***********', // Obtained from the developer console
};
/**
* MicroOauth2 will provide you with a valid access token
* @param {Object} ids, the credentials needed to obtain a access token
* @return {String} accessToken, to be used for a google api request
**/
function MicroOauth2(ids) {
  /**
  * getNewTokenData retrieve the accessToken informations
  * @param {Object} ids, the credentials needed to obtain a access token
  * @return {Object} tokenData, the access token information retrieved
  * from Google + a time method to verify it's validity
  **/
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
  var _this = this;

  /**
  * GetToken the method to retrieve a token
  * @return {String} accessToken, a valid accessToken
  **/
  function GetToken() {
    if (_this.tokenData.access_token === undefined) {
      _this.tokenData = getNewTokenData(ids);
    } else if (_this.tokenData.isExpired()) {
      _this.tokenData = getNewTokenData(ids);
    }

    return _this.tokenData.access_token;
  }

  this.getToken = GetToken;
}
