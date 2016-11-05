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
 An Object that has the three informations needed to obtain the token: refreshToken, clientId, clientSecret.  

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

### obtaining a client Id and Secret  
Client ID and Secret are obtained from the [Developer console](https://console.developers.google.com/), in order to be easier we will here use the developer console of our Google Apps Script project. Resources > Developer Console Project...  
![resources>DevelopersConsole](http://i.imgur.com/SSNpBLQ.png)  
In the developer console open the Credentials panel  
![credentialPanel](http://i.imgur.com/AFsc0KN.png)  
Now create new creadentials (Oauth2 client)  
![createCredentials>oauth2Client](http://i.imgur.com/1TmyO0q.png)  
Select 'Web application' and give it a name. (at this point you may need to fill the information about the consent screen, you only need to fill a name)  
![selectWebApplication](http://i.imgur.com/Y8uVKml.png)  
At this point you got the client secret and client id that you can copy to the script ids object  
![clientIdSecret](http://i.imgur.com/WPGVT1i.png)  
You now need to obtain a a refresh token  

### obtaining a refresh token  
A refresh token is obtained for a specific scope. so you may need to activate these scope in the developer console prior trying to get one. If you are trying to have the demo working activate the drive library.  
![developerConsole>Library](http://i.imgur.com/4GsPOja.png)  
![driveLibraryActivated](http://i.imgur.com/JUhxfA1.png)  

Now the good libraries are activated we need to obtain that famous refresh token.  
The method that I picked here use the [Google Oauth 2 playground](https://developers.google.com/oauthplayground/) but you can do it in various other ways. [Here](https://docs.google.com/presentation/d/1gQV5Dtka75eXMxqixT5-Pv23cIjo53bvbXG930LA0No/edit#slide=id.p) a link with explanations on how the process is working  
In order to play with the Oauth2 Playground with must authorize it in the developer console.  
In the credential panel open the credentials you created by clicking on it's name ![nicroOauth2Name](http://i.imgur.com/G8GparL.png). You'll then see a panel where you can authorize redirect URIs. Add the Oauth2 Playground url and save (twice)  
![addOauthPlaygroundUrl](http://i.imgur.com/TVRepZS.png)  

**RDV in the Oauth 2 Playground**  
from the parameter icon select "Use your own Oauth credentials" and input your client id and secret  
![useYourOwnCredentials](http://i.imgur.com/SMJmHi7.png)  
In the step one select the API you want to activate. In the demo we will activate the Drive API (https://www.googleapis.com/auth/drive)  
![activateDrive](http://i.imgur.com/6GMpvAQ.png)  
An authorization screen will show up and ask your authorization to proceed, once it's done you'll be redirected to the step 2.  
Finally exchange the authorization code for the refresh token that you can now copy to the ids Object.  
![authorizationCodeExchange](http://i.imgur.com/Kav67HA.png)  

![getTheRefreshToken](http://i.imgur.com/67i91wa.png?1)  
Note: when exchanging Authorization code for a refresh token you are automatically directed to step 3, just reopen step 2 to retrieve the refresh token
