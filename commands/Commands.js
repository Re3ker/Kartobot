// normal commands
module.exports.help = require('./main/help');
module.exports.interaction = require('./main/interaction');
module.exports.gif = require('./main/gif');
module.exports.activities = require('./main/activities');
module.exports.joke = require('./main/joke');

// nsfw commands
module.exports.kona = require('./nsfw/kona');

// master commands
module.exports.leaveServer = require('./master/leaveserver');

// player commands
module.exports.play = require('./player/play');
module.exports.leave = require('./player/leave');