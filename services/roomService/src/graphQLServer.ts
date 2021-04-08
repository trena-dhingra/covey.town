import Express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

import { connection } from './data/Utils/index';
import typeDefs from './typeDefs/index';
import resolvers from './resolvers/index';

const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
// Authentication
const client = jwksClient({
  jwksUri: 'https://<YOUR_AUTH0_DOMAIN>/.well-known/jwks.json',
});

function getKey(header: any, cb: any){
  client.getSigningKey(header.kid, (_:any, key: any) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    cb(null, signingKey);
  });
}

const options = {
  audience: '<YOUR_AUTH0_CLIENT_ID>',
  issuer: 'https://<YOUR_AUTH0_DOMAIN>/',
  algorithms: ['RS256'],
};


const cors = require('cors');

const app = Express();
app.use(Express.json());
app.use(cors());

/**
 * Getting the instance of Apollo Server.
 */
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req })  => {
    // simple auth check on every request
    const token = req.headers.authorization;
    const user = new Promise((resolve, reject) => {
      jwt.verify(token, getKey, options, (err : any, decoded: any) => {
        if (err) {
          return reject(err);
        }
        return resolve(decoded.email);
        
      });
    });

    return {
      user,
    };
  },
});


apolloServer.applyMiddleware({ app, path: '/graphql' });
 
// Represents the database connection
connection();

app.listen(process.env.PORT || 8081, () => console.log('Listening'));