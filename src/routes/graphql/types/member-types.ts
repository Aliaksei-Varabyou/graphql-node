import { GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLEnumType } from "graphql";
import { MemberTypeId } from "../../member-types/schemas.js";

export const MemberTypeEnum = new GraphQLEnumType({
  name: 'MemberTypeEnum',
  values: {
    [MemberTypeId.BASIC]: { value: MemberTypeId.BASIC },
    [MemberTypeId.BUSINESS]: { value: MemberTypeId.BUSINESS },
  }
})

export const MemberType = new GraphQLObjectType ({
  name: 'MemberType',
  fields: () => ({
    id: { type: MemberTypeEnum },
    discount: {type: GraphQLFloat },
    postsLimitPerMonth: { type:  GraphQLInt },
  })
});
