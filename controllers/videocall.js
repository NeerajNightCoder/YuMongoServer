exports.getAccessToken=async(req,res,next)=>{
    try{
        var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

// Substitute your Twilio AccountSid and ApiKey details
var ACCOUNT_SID = 'AC335776d9573ccc4497c76ae69437821e';
var API_KEY_SID = 'SKff3c657d7464a378957580d2af59cc76';
var API_KEY_SECRET = 'eBxogKcTcwY0nIdFkIDP5fv7haYU7vf4';

// Create an Access Token
var accessToken = new AccessToken(
  ACCOUNT_SID,
  API_KEY_SID,
  API_KEY_SECRET
);

// Set the Identity of this token
accessToken.identity = req.params.userType=='doc'?`doc-${req.params.docId}`:`user-${req.params.userId}`;

// Grant access to Video
var grant = new VideoGrant();
grant.room = `${req.params.docId}`;
accessToken.addGrant(grant);

// Serialize the token as a JWT
var jwt = accessToken.toJwt();
console.log(jwt);
return res.status(200).json({accessToken:jwt});


    }catch(e){
        console.log(e)
        res.status(400).json({msg:e.message,accessToken:null})
    }
}
