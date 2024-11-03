import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { MemberType, MemberTypeEnum } from "./types/member-types.js";
import { GraphQLContext } from "./context.js";
import { Post } from "./types/posts.js";
import { User } from "./types/users.js";
import { Profile } from "./types/profiles.js";
import { UUIDType } from "./types/uuid.js";

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
      resolve: async (_, _args, context: GraphQLContext) => {
        return context.prisma.memberType.findMany();
      }
    },
    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeEnum) },
      },
      resolve: async (_, args: { id: string }, context: GraphQLContext) => {
        return await context.prisma.memberType.findUnique({
          where: {
            id: args.id,
          },
        });
      }
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
      resolve: async (_, _args, context: GraphQLContext) => {
        return context.prisma.post.findMany();
      }
    },
    post: {
      type: Post,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args: { id: string }, context: GraphQLContext) => {
        return await context.prisma.post.findUnique({
          where: {
            id: args.id,
          },
        });
      }
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
      resolve: async (_, _args, context: GraphQLContext) => {
        return context.prisma.user.findMany();
      }
    },
    user: {
      type: User,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args: { id: string }, context: GraphQLContext) => {
        const user = await context.prisma.user.findUnique({
          where: {
            id: args.id,
          },
        });
        if (!user) {
          return null;
        }
        return user;
      }
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Profile))),
      resolve: async (_, _args, context: GraphQLContext) => {
        return context.prisma.profile.findMany();
      }
    },
    profile: {
      type: Profile,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args: { id: string }, context: GraphQLContext) => {
        return await context.prisma.profile.findUnique({
          where: {
            id: args.id,
          },
        });
      }
    },
  }
});
