import { GraphQLList, GraphQLObjectType } from "graphql";
import { MemberType } from "./types/member-types.js";
import { GraphQLContext } from "./context.js";
import { PostType } from "./types/posts.js";
import { UserType } from "./types/users.js";
import { ProfileType } from "./types/profiles.js";

export const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (_, _args, context: GraphQLContext) => {
        return context.prisma.memberType.findMany();
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_, _args, context: GraphQLContext) => {
        return context.prisma.post.findMany();
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (_, _args, context: GraphQLContext) => {
        return context.prisma.user.findMany();
      }
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (_, _args, context: GraphQLContext) => {
        return context.prisma.profile.findMany();
      }
    },
  }
});
