import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { MemberType, MemberTypeEnum } from "./member-types.js";
import { UUIDType } from "./uuid.js";
import { GraphQLContext } from "../context.js";

export const Profile = new GraphQLObjectType ({
  name: 'ProfileType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: {type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: {type: new GraphQLNonNull(GraphQLInt) },
    // userId: { type: UUIDType },
    // memberTypeId: { type: MemberTypeEnum },
    memberType: {
      type: MemberType,
      resolve: async (profile, _args, context: GraphQLContext) => {
        return await context.prisma.memberType.findUnique({
          where: { id: profile.memberTypeId }
        });
      }
    }
  })
});
