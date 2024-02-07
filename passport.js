const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const localStrategy = require('passport-local').Strategy;
const googleTokenStrategy = require('passport-google-oauth20');

const facebookTokenStrategy = require('passport-facebook-token');

const User = require('./models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

//JSON web token strategy, This particular middleware is to verify tokens coming from front end
passport.use(new jwtStrategy({ 
    jwtFromRequest: extractJwt.fromHeader('authorization'), //header name is passed
    secretOrKey: process.env.JWT_SECRET
},async(payload,done)=>{ 
    try{               
         const userID=payload.sub; 
         const user=await User.findById(userID);   
      
         //if user doesn't exist, handle it
        if(!user) return done(null,false); //null-no errors, false- instead of user obj
      
        //otherwise return the user
        done(null,user); // null- for errors, user- for actual user
        // done will actually set req.user=user inside it
    }catch(error){
        done(error,false);
    }

}));

//LOCAL Stragegy
passport.use(new localStrategy({ 
    usernameField: 'email',
}, async(email,password,done)=>{
    try{
        //find the user given the email
        const user= await User.findOne({"local.email":email});
        //if not found, handle it
        if(!user) return done(null,false);
    
        //if found, check if password is correct(bcryptjs does it)
        const validPassword = await bcrypt.compare(password,user.local.password);

        //if not, handle it
        if(!validPassword) return done(null,false);

        //otherwise, return the user
        done(null,user);
    }catch(error){
        done(error,false);
    }
    
})); 



//Google OAuth Strategy
passport.use(new googleTokenStrategy({
    callbackURL:'/api/v1/auth/oauth/google/redirect',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET

},async (accessToken,refreshToken,profile,done) => {
    
    
    //console.log(profile);
    try{
        console.log('access token', accessToken);
        console.log('refresh token', refreshToken);
        console.log('profile', profile);
    
        //Check whether this new user exist in our DB
        const existingUser= await User.findOne({"gid":profile.id});
        console.log(existingUser)
        if(existingUser){
            console.log('User already exist in DB');
            return done(null, existingUser);
        } 
        
        console.log('User doesnt exist we are creating new one');
    //     //If new account
    //     console.log("***********************************************************************")
    // userName=profile.displayName
    // userEmail=profile.emails[0].value
    // userId=profile.id
    // console.log("***********************************************************************")

        const newUser = await User.create({
            method:'google',
            
                name: profile.displayName,
                gid: profile.id,
                email: profile.emails[0].value
            
        });
        console.log("newUser",newUser);
        console.log(await newUser.save());
        done(null,newUser);
    }catch(error){
        done(error,false,error.message);
    }
} 
));

//Facebook OAuth Strategy
// passport.use('facebookToken',new facebookTokenStrategy({
//     clientID: process.env.FACEBOOK_CLIENT_ID,
//     clientSecret: process.env.FACEBOOK_SECRET
// }, async(accessToken,refreshToken,profile,done)=>{

//     try{
//         // console.log('access token', accessToken);
//         // console.log('refresh token', refreshToken);
//         // console.log('profile', profile);
    
//         //Check whether this new user exist in our DB
//         const existingUser= await User.findOne({"facebook.id":profile.id});
//         if(existingUser){
//             console.log('User already exist in DB');
//             return done(null, existingUser);
//         } 
        
//         console.log('User doesnt exist we are creating new one');
//         //If new account
//         const newUser = new User({
//             method:'facebook',
//             facebook:{
//                 name: profile.displayName,
//                 id: profile.id,
//                 email: profile.emails[0].value
//             }
//         });
//         await newUser.save();
//         done(null,newUser);
//     }catch(error){
//         done(error,false,error.message);
//     }
   
// }));