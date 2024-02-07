const referralCodes=require('referral-codes')
var i=0

for (i;i<50;i++)
{
  console.log(referralCodes.generate({length:6,count:1})[0])
}