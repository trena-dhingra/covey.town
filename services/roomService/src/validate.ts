require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

function getKey(header:any, callback:any) {
  client.getSigningKey(header.kid, (_:any, key:any) =>{
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

const isTokenValid = async (token: any): Promise<any> => {
  if (token) {
    const bearerToken = token.split(' ');

    const result = new Promise((resolve) => {
      jwt.verify(
        bearerToken[1],
        getKey,
        {
          audience: process.env.API_IDENTIFIER,
          issuer: `https://${process.env.AUTH0_DOMAIN}/`,
          algorithms: ['RS256'],
        },
        (error: any, decoded: any) => {
          if (error) {
            resolve({ error });
          }
          if (decoded) {
            resolve({ decoded });
          }
        },
      );
    });

    return result;
  }

  return { error: 'No token provided' };
};

export default isTokenValid;