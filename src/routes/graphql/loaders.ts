import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export const getLoaders = (prisma: PrismaClient) => {
  return {
    profileLoader: new DataLoader<string, unknown[] | null>(async (userIds) => {
      const profiles = await prisma.profile.findMany({
        where: {
          userId: { in: Array.from(userIds) }
        }
      });
      const profileMap = {};
      profiles.forEach(profile => {
        profileMap[profile.userId] = profile;
      });
      return userIds.map(userId => profileMap[userId] || null);
    }),

    postLoader: new DataLoader<string, unknown[]>(async (authorIds: readonly string[]) => {
      const posts = await prisma.post.findMany({
        where: {
          authorId: { in: Array.from(authorIds) }
        }
      });
      const postsMap: Record<string, unknown[]> = {};
      
      posts.forEach(post => {
        if (!postsMap[post.authorId]) {
          postsMap[post.authorId] = [];
        }
        postsMap[post.authorId].push(post);
      });
      return authorIds.map(authorId => postsMap[authorId] || []);
    }),

    userSubscribedToLoader: new DataLoader<string, unknown[]>(async (userIds) => {
      const users = await prisma.user.findMany({
        where: {
          subscribedToUser: {
            some: {
              subscriberId: {
                in: [...userIds],
              },
            },
          },
        },
        include: {
          subscribedToUser: true,
        },
      });
    
      const userMap = new Map();
      userIds.forEach(id => userMap.set(id, []));
    
      users.forEach(user => {
        user.subscribedToUser.forEach(subscription => {
          if (userMap.has(subscription.subscriberId)) {
            userMap.get(subscription.subscriberId).push(user);
          }
        });
      });
    
      return userIds.map(userId => userMap.get(userId));
    }),

    subscribedToUserLoader: new DataLoader<string, unknown[]>(async (authorIds) => {
      const authors = await prisma.user.findMany({
        where: {
          userSubscribedTo: {
            some: {
              authorId: { in: [...authorIds] },
            },
          },
        },
        include: {
          userSubscribedTo: true,
        },
      });
    
      const authorMap = new Map();
      authorIds.forEach(id => authorMap.set(id, []));
    
      authors.forEach(user => {
        user.userSubscribedTo.forEach(subscription => {
          if (authorMap.has(subscription.authorId)) {
            authorMap.get(subscription.authorId).push(user);
          }
        });
      });
    
      return authorIds.map(id => authorMap.get(id));
    }),

    memberTypeLoader: new DataLoader<string, unknown[] | null>(async (memberTypesIds) => {
      const memberTypes = await prisma.memberType.findMany({
        where: {
          profiles: {
            some: {
              memberTypeId: { in: Array.from(memberTypesIds) }
            }
          }
        }
      });
      const memberTypesMap = {};
      memberTypes.forEach(memberType => {
        memberTypesMap[memberType.id] = memberType;
      });
      return memberTypesIds.map(id => memberTypesMap[id] || null);
    }),

  };
};