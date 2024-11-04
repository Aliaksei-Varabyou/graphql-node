import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export interface GraphQLContext {
  prisma: PrismaClient;
  loaders: {
    profileLoader: DataLoader<string, unknown[]>;
    postLoader: DataLoader<string, unknown[]>;
    userSubscribedToLoader: DataLoader<string, unknown[]>;
    subscribedToUserLoader: DataLoader<string, unknown[]>;
    memberTypeLoader: DataLoader<string, unknown[]>;
  };
}