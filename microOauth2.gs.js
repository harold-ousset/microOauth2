/*
Copyright 2016 Harold Ousset

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

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
