var nodersa=require('node-rsa');
var key=new nodersa({b:1024});

var message='this is RSA encryption';

//var encrypted=key.encrypt(message,'base64');

//console.log(encrypted);

//var decrypted=key.decrypt(encrypted,'utf8');

//console.log(decrypted);

var publickey=key.exportKey('public');
var privatekey=key.exportKey('private');

//console.log(publickey+'\n'+privatekey);


var pubkey='-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDOSea+HBm6YRd9bjpBC/W/0QDlCmrsjsD5IEgLa9GjZlkGwfm7LgbmPMFVgp1Q0642nEPQed/EMaYvVqzNoIOIWqC8NAyusAKlDOocxtfr2W8orHuxtMFnTLFOclIAc6Uu9m8xGy+y5PYdcwODfNE79lou2CXsxibMXx/Y23q3pQIDAQAB-----END PUBLIC KEY-----';

var pk='-----BEGIN RSA PRIVATE KEY-----MIICXQIBAAKBgQDOSea+HBm6YRd9bjpBC/W/0QDlCmrsjsD5IEgLa9GjZlkGwfm7LgbmPMFVgp1Q0642nEPQed/EMaYvVqzNoIOIWqC8NAyusAKlDOocxtfr2W8orHuxtMFnTLFOclIAc6Uu9m8xGy+y5PYdcwODfNE79lou2CXsxibMXx/Y23q3pQIDAQABAoGBAM3V3aBaR626TYcBoqze8zKXqI3h7DjoZFLwzBJhXgfuCuz8RmRoE8hOXRcmwjQxU8b3+46c3RNV+x2HHdv7yuFLi/PziHa0fngbu2SrQ1+47lqG/HrkLVohnw2mgcIk93CRV3M7XEXgvc7t+9E2FahJsj6/0Mla+lWcz4+SOUFBAkEA7/dILzlvkprhtwa9QJAElnrX16yqe0FjF+J5sDE94aqe/J9F+qGaYBOw2wEok1+tbopTkaU6Uvca5kKaoHHEEQJBANwSjjr7FSD+l/x47Kl2g0/RbOIjd4ORJXdp2hSKYuvTKm9PiNbXajyEUFpxN6TXXgddkv4QsreSM+iUeTMwvlUCQDDfyI/1vse5S+efM8SGkKildHi07jQUaT5gHjDIlrXzrlX9ip81ct/Gouq4Ha+GeShefA7Z/DsRoSTsw9mR0kECQQCem5z4czdCJVtiscBXTjvLTfN8c/VR1E09aAOtpCMxNWqy+I510KEXZoEG/ewNmM6C3nTvORek5/ETYdaMB0hVAkB6QcJW5ctidESxbD1RyKiU9bwtxhJR26jB01hIOYPnLGCsIiIlZfcH9PrFxHZSiPhHBU0fJnSRPz0xreoHVuKJ-----END RSA PRIVATE KEY-----';

let keypri=new nodersa(pk);
let keypub=new nodersa(pubkey);

var encrypted=keypub.encrypt(message,'base64');

console.log(encrypted);

var decrypted=keypri.decrypt(encrypted,'utf8');

console.log(decrypted);
