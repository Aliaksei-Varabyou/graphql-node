import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from "graphql";
import { UUIDType } from "./uuid.js";
import { Profile } from "./profiles.js";
import { GraphQLContext } from "../context.js";
import { Post } from "./posts.js";

export const User = new GraphQLObjectType ({
  name: 'UserType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: {type: new GraphQLNonNull(GraphQLString) },
    balance: {type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: Profile,
      resolve: async (user, _args, context: GraphQLContext) => {
        return await context.loaders.profileLoader.load(user.id);
      }
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
      resolve: async (user, _args, context: GraphQLContext) => {
        return await context.loaders.postLoader.load(user.id);
      }
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
      resolve: async (user, _args, context: GraphQLContext) => {
        return await context.loaders.userSubscribedToLoader.load(user.id);
      }
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
      resolve: async (user, _args, context: GraphQLContext) => {
        return await context.loaders.subscribedToUserLoader.load(user.id);
      }
    },
  })
});
