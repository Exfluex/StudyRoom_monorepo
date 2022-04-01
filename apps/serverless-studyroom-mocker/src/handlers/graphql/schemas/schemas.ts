import { gql } from 'apollo-server-lambda'
export const typeDefs = gql`
type Query {
  me: User
  listRooms(offset: Int! = 0,pageSize: Int! = 5): [Room!]!
}

type RoomCategory{
  id: Int!
  name: String!
  description: String
}
type ChannelCategory{
  id: Int
  name: String!
  description: String
}
type Channel{
  channelUid: String!
  channelOwner: String!
  channelCategory: [ChannelCategory!]!
  channelLatestActiveDate: String!
  channelUserNum: Int!
  channelStar: Int!
  channelMainRoom: String!
}
type Room{
  room_uuid: String!
  room_name: String!
  room_owner: User!
  room_create_date: String!
  room_latest_action_date: String!
  room_status: Int!
  room_description: String!
  room_admninistrator_num: Int!
}
type User{
  user_uuid: String!
  user_name: String!
  user_create_date: String!
  user_latest_login_date: String!
  user_plugins: [Int!]!
  user_email: String!
  owned_rooms(take: Int! = 5): [Room!]!
}
`;
