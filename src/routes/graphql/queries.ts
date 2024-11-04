import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { parseResolveInfo } from "graphql-parse-resolve-info";
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
        return await context.prisma.memberType.findMany();
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
        return await context.prisma.post.findMany();
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
      resolve: async (_, _args, context: GraphQLContext, info) => {
        const parsedInfo = parseResolveInfo(info);

        if (parsedInfo && parsedInfo.fieldsByTypeName) {
          const typeName = Object.keys(parsedInfo.fieldsByTypeName)[0];
          const fields = Object.keys(parsedInfo.fieldsByTypeName[typeName]);
          const includeSubscribedToUser = fields.includes('subscribedToUser');
          const includeUserSubscribedTo = fields.includes('userSubscribedTo');

          const users = await context.prisma.user.findMany({
            include: {
              subscribedToUser: includeSubscribedToUser,
              userSubscribedTo: includeUserSubscribedTo,
            },
          });

          if (includeSubscribedToUser) {
            users.forEach(user => {
              const subscribersIds = user.subscribedToUser.map((subscriber) => subscriber.subscriberId);
              context.loaders.subscribedToUserLoader.prime(
                user.id,
                users.filter(filteredUser => subscribersIds.includes(filteredUser.id.toString()))
              );
            });
          }
          if (includeUserSubscribedTo) {
            users.forEach(user => {
              const authorsIds = user.userSubscribedTo.map((author) => author.authorId);
              context.loaders.userSubscribedToLoader.prime(
                user.id,
                users.filter(filteredUser => authorsIds.includes(filteredUser.id.toString()))
              );
            });
          }

          return users;
        } else {
          return [];
        }
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
        return await context.prisma.profile.findMany();
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
