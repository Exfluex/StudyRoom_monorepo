-- Redis Lua Script
-- Try Join Inactive Room
-- password already checked here
-- user already quited from previous room in active room script
-- KEYS:
--   user_uuid 1
--   room_uuid 2
-- ARGV:
-- room_password 1


local c_user_status = KEYS[1] .. ".status"
local c_room_free = KEYS[2] .. ".free"
local c_room_count = KEYS[2] .. ".count"
local c_room_pass = KEYS[2] .. ".pass"
local c_user_seat = KEYS[1] .. ".seat"

redis.call("set",c_room_free,30)
redis.call("set",c_room_count,1)-- set count=1
redis.call("set",c_room_pass,ARGV[1])


-- try change 2 next room
redis.call('set',c_user_status,KEYS[2])
redis.call('set',c_user_seat,"")
return "SUCCEED"


