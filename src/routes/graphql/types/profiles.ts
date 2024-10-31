import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLObjectType } from "graphql";
import { MemberTypeEnum } from "./member-types.js";

export const ProfileType = new GraphQLObjectType ({
  name: 'ProfileType',
  fields: () => ({
    id: { type: GraphQLID },
    isMale: {type: GraphQLBoolean },
    yearOfBirth: {type: GraphQLInt },
    userId: { type: GraphQLID },
    memberTypeId: { type: MemberTypeEnum },
  })
});
