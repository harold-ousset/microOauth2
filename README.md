# MicroOauth2
## obtain an access token to use with G Suite apps
----------

### Note  

This JS script do not use the lastest ECMAScript specifications because it's dedicated to be used in Google Apps Script. So it's a mix of different [older specifications](https://developers.google.com/apps-script/guides/services/#basic_javascript_features). I propose this script as a small utility (I use it myself in my own scripts) but it's also sufficient simple to understand the behind process and learn how one of the oauth2 process work. Keeping that in mind I'm sure that you'll find more convenient script to use the Google Oauth2 APIs like the one made by [Eric Koleda](https://github.com/googlesamples/apps-script-oauth2)

### Install  
Copy the file "microOauth2.gs.js" in your Google Apps Script and change the **** for your own credentials (see part 'Initialize the script')

#### Syntax  
> var mo2 = new MicroOauth2(ids);  
> mo2.getToken();  

#### Parameters  
**ids**  
 An Object that has the three informations needed to obtain a token: refreshToken, clientId, clientSecret.  

#### Return value  
return a string that correspond to the token.  


### example  

You can copy past in your script one of the functions given in the demo file 'demo.gs.js'. Here is the 'createFile' function. It will create a file named 'test' on the authenticated drive  

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

In order to have the script to work, you'll need to have a correct **ids** object.
In this section I'll show you how to obtain these ids. Please keep in mind everything here is subject to Google changes.

### obtaining a Client Id and Secret  
Client ID and Secret are obtained from the [Developer console](https://console.developers.google.com/). In order to make it easier we will here use the developer console of our Google Apps Script project. From the appScript menu go to:  
Resources > Developer Console Project...  
![resources>DevelopersConsole](http://i.imgur.com/SSNpBLQ.png)  
In the developer console open the Credentials panel  
![credentialPanel](http://i.imgur.com/AFsc0KN.png)  
Now create new creadentials (Oauth2 client)  
![createCredentials>oauth2Client](http://i.imgur.com/1TmyO0q.png)  
Select 'Web application' and give it a name. (you may be asked to fill the information about the consent screen, the only mandatory field is "name")  
![selectWebApplication](http://i.imgur.com/Y8uVKml.png)  

![clientIdSecret](http://i.imgur.com/WPGVT1i.png)  
At this point you got the client secret and client id that you can copy to the script ids object  
![copyCliendIdSecret](http://i.imgur.com/zo4EK8y.png)
You now need to obtain a refresh token  

### obtaining a refresh token  
A refresh token is obtained for a specific scope. so you may need to authorize these scope in the developer console prior trying to get a refresh token. If you are trying to have the demo working activate the drive API from the library panel.  
![developerConsole>Library](http://i.imgur.com/4GsPOja.png)  
![driveLibraryActivated](http://i.imgur.com/JUhxfA1.png)  

Ones the libraries are activated we can obtain that famous refresh token.  
The method that I picked here use the [Google Oauth 2 playground](https://developers.google.com/oauthplayground/) but you can do it in various other ways. [Here](https://docs.google.com/presentation/d/1gQV5Dtka75eXMxqixT5-Pv23cIjo53bvbXG930LA0No/edit#slide=id.p) a link with explanations on how the process is working  
In order to play with the Oauth2 Playground we must authorize it in the developer console.  
In the credential panel open the credentials you created by clicking on it's name ![nicroOauth2Name](http://i.imgur.com/G8GparL.png). You'll then see a panel where you can authorize redirect URIs. Add the Oauth2 Playground url and save (twice)  
![addOauthPlaygroundUrl](http://i.imgur.com/TVRepZS.png)  

**RDV in the Oauth 2 Playground**  
From the parameter icon select "Use your own Oauth credentials" and input your client id and secret  
![useYourOwnCredentials](http://i.imgur.com/SMJmHi7.png)  
In the step one select the API you want to activate. In the demo we will activate the Drive API (https://www.googleapis.com/auth/drive)  
![activateDrive](http://i.imgur.com/6GMpvAQ.png)  
An authorization screen will show up and ask your authorization to proceed, once it's done you'll be redirected to the step 2.  
Finally exchange the authorization code for the refresh token that you can now copy to the ids Object.  
![authorizationCodeExchange](http://i.imgur.com/Kav67HA.png)  

![getTheRefreshToken](http://i.imgur.com/67i91wa.png?1)  
Note: when exchanging Authorization code for a refresh token you are automatically directed to step 3, just reopen step 2 to retrieve the refresh token  
![copyRefreshToken](http://i.imgur.com/kBKa3qb.png)
