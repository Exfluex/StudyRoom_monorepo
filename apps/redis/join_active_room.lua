-- Redis Lua Script
-- Try Join Active Room
-- KEYS:
--   user_uuid 1
--   room_uuid 2
-- ARGV:
-- input_password 1 (md5 encoded)

-- "assume room active" script here --
-- check re-enter
-- get user status
local c_user_status = KEYS[1] .. ".status"
local c_room_free = KEYS[2] .. ".free"
local c_room_count = KEYS[2] .. ".count"
local c_room_pass = KEYS[2] .. ".pass"
local c_room_seats = KEYS[2] .. ".seats"
local c_user_seat = KEYS[1] .. ".seat"
local user_current_room = redis.call("get",c_user_status) or "";

if( user_current_room == KEYS[2]) then
  -- re-enter room
  return "REENTER"
end

-- quit current room
if(user_current_room ~= nil and user_current_room ~= "") then
  -- leave seat
  -- get current user's seats if nil set ""
  local user_seat = redis.call("getset",c_user_seat,"");
  -- remove user's seat from previous room's seats "set"
  redis.call("srem",user_current_room .. ".seats",user_seat or "")
  -- decrease current room's count
  redis.call("decr",user_current_room .. ".count")
end
-- try change 2 next room
local next_room_count = tonumber(redis.call("get",c_room_free))

if( next_room_count == nil ) then
-- in-active room
  return "INACTIVE"
end
-- active room

local room_pass = redis.call("get",c_room_pass)
-- TODO retrieve to another initial script
if(room_pass == ARGV[1]) then
  if(next_room_count < 30) then
    redis.call("incr",c_room_count)
    redis.call('set',c_user_status,KEYS[2])
    return "SUCCEED"
  end
  return "MAXSEAT"
end
-- excced max room capacity
return "ERRORPASSWORD"
