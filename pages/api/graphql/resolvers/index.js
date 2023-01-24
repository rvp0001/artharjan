/**
 * @author 
 */

import  merge from 'lodash/merge';
import AuthServiceJWT from '../../services/authenticationJWT';
import masterdataServices from "../../services/masterdataServices";
import recommendationSrevice from "../../services/recommendationSrevice";

//Importing resolvers







// Merge all of the resolver objects together
// const resolvers = merge(
//                             authenticationResolvers.Query,
//                             authenticationResolvers.Mutation,
//                             Rcecommendation.Mutation,
//                             Rcecommendation.Query,
//                             masterdatResolvers.Query
//                         );

// const resolvers = Object.assign(
//     authenticationResolvers.Query,
//     authenticationResolvers.Mutation,
//     Rcecommendation.Mutation,
//     Rcecommendation.Query,
//     masterdatResolvers.Query
// );

//  const resolvers = {
//     Query :
//     {
//         asyn currentUserUsernameJWT() { 

//          }
//     }
//  };

 const resolvers = {
  Query: 
  {
    
      currentUsernameJWT: AuthServiceJWT.currentUserUsernameJWT,
      users:AuthServiceJWT.users,
  recommendations:recommendationSrevice.recommendations(root, args, context),
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

// Export merged resolvers
export default resolvers;