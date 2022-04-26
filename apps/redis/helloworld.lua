-- Redis Lua Script
-- Helloworld
-- KEYS:
--   user_name 1
-- ARGV:
-- sentence 1
local name = redis.call('get',KEYS[1]) or "undefined"
return "[" .. name .. "]: ".. ARGV[1]
