import { ApolloServer, gql } from "apollo-server-micro";
import typeDefs from "./graphql/schemas";
import { PrismaClient } from '@prisma/client'
import Cors from 'micro-cors'
//import { createContext } from './context';


import AuthServiceJWT from ".//services/authenticationJWT";
import masterdataServices from ".//services/masterdataServices";
import recommendationSrevice from ".//services/recommendationSrevice";

const resolvers = {
  Query: 
  {
    
      currentUsernameJWT: AuthServiceJWT.currentUserUsernameJWT,
      users:AuthServiceJWT.users,
        recommendations:recommendationSrevice.recommendations,
  stocks:masterdataServices.getStocks
  },

  Mutation:
  {
      signUpMobileJWT:AuthServiceJWT.signUpMobileJWT,
      signUpUsernameJWT : AuthServiceJWT.signUpUsernameJWT,
      signInUsernameJWT : AuthServiceJWT.signInUsernameJWT,
      signInMobileJWT:AuthServiceJWT.signInMobileJWT,
      verifyMobileOTPJWT:AuthServiceJWT.verifyMobileOTPJWT,
      saveUsername:AuthServiceJWT.saveUsername,
      deleteUsername:AuthServiceJWT.deleteUsername,
      saveRecommendation : recommendationSrevice.saveRecommendation,
      deleteRecommendation : recommendationSrevice.deleteRecommendation,
      sendRecommendationNotification:recommendationSrevice.sendRecommendationNotification
      
  }
  };

   
      
const cors = Cors()
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req,res }) => {
    // create a new Prisma client instance
    const prisma = new PrismaClient();
    // return the request object and the Prisma client instance
    // as properties of the context object
    return { req,res, prisma };
}
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};