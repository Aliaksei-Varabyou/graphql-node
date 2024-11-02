import { GraphQLNonNull, GraphQLObjectType, GraphQLScalarType, GraphQLString } from "graphql";
import { User } from "./types/users.js";
import { ChangePostInput, ChangeProfileInput, ChangeUserInput, CreatePostInput, CreateProfileInput, CreateUserInput } from "./inputs.js";
import { GraphQLContext } from "./context.js";
import { Post } from "./types/posts.js";
import { Profile } from "./types/profiles.js";
import { UUIDType } from "./types/uuid.js";

export const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createUser: {
      type: new GraphQLNonNull(User),
      args: {
        dto: { type: CreateUserInput }
      },
      resolve: async (_, args, context: GraphQLContext) => {
        return await context.prisma.user.create({
          data: args.dto,
        });
      }
    },
    createPost: {
      type: new GraphQLNonNull(Post),
      args: {
        dto: { type: CreatePostInput }
      },
      resolve: async (_, args, context: GraphQLContext) => {
        return await context.prisma.post.create({
          data: args.dto,
        });
      }
    },
    createProfile: {
      type: new GraphQLNonNull(Profile),
      args: {
        dto: { type: CreateProfileInput }
      },
      resolve: async (_, args, context: GraphQLContext) => {
        return await context.prisma.profile.create({
          data: args.dto,
        });
      }
    },
    deleteUser: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) }
      },
      resolve: async (_, args, context: GraphQLContext) => {
        await context.prisma.user.delete({
          where: {
            id: args.id,
          },
        });
        return 'User deleted';
      }
    },
    deletePost: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) }
      },
      resolve: async (_, args, context: GraphQLContext) => {
        await context.prisma.post.delete({
          where: { id: args.id },
        });
        return 'Post deleted';
      }
    },
    deleteProfile: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) }
      },
      resolve: async (_, args, context: GraphQLContext) => {
        await context.prisma.profile.delete({
          where: {
            id: args.id,
          },
        });
        return 'Profile deleted';
      }
    },
    changeUser: {
      type: new GraphQLNonNull(User),
      args: {
        id: {type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInput) },
      },
      resolve: async (_, args, context: GraphQLContext) => {
        return await context.prisma.user.update({
          where: { id: args.id },
          data: args.dto,
        });
      }
    },
    changePost: {
      type: new GraphQLNonNull(Post),
      args: {
        id: {type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangePostInput) },
      },
      resolve: async (_, args, context: GraphQLContext) => {
        return await context.prisma.post.update({
          where: { id: args.id },
          data: args.dto,
        });
      }
    },
    changeProfile: {
      type: new GraphQLNonNull(Profile),
      args: {
        id: {type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInput) },
      },
      resolve: async (_, args, context: GraphQLContext) => {
        return await context.prisma.profile.update({
          where: { id: args.id },
          data: args.dto,
        });
      }
    },
    subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: {type: new GraphQLNonNull(UUIDType) },
        authorId: {type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args, context: GraphQLContext) => {
        await context.prisma.subscribersOnAuthors.create({
          data: {
            subscriberId: args.userId,
            authorId: args.authorId,
          }
        });
        return 'User subscribed';
      }
    },
    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: {type: new GraphQLNonNull(UUIDType) },
        authorId: {type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args, context: GraphQLContext) => {
        await context.prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: args.userId,
              authorId: args.authorId,
            },
          },
        });
        return 'User unsubscribed';
      }
    },
  }
});
