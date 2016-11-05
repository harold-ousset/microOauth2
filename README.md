# MicroOauth2
## obtain an access token to use with G Suite apps
----------

### Note  

this is a full JS script it do not use ECMAScript 2015 specifications because it's dedicated to be used in Google Apps Script

#### Syntax  
> var mo2 = new MicroOauth2(ids);  
> mo2.getToken();  

#### Parameters  
**ids**  
 an Object that has the three informations needed to obtain the token: refreshToken, clientId, clientSecret.  

#### Return value  
return a string that correspond to the token.  


### example  

Launching this function will create a file named 'test' on the authenticated drive  

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

## Initialize the script  

In order to have the script to work, you'll need to have corrects ids.
Here is a demo on how to obtain these. Please keep in mind everything here is subject to Google changes.

//todo
