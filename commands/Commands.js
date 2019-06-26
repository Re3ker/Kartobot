// normal commands
module.exports.helpCommand = require('./main/helpCommand');
module.exports.interactionCommand = require('./main/interactionCommand');
module.exports.gifCommand = require('./main/gifCommand');
module.exports.activitiesCommand = require('./main/activitiesCommand');
module.exports.jokeCommand = require('./main/jokeCommand');

// nsfw commands
module.exports.konaCommand = require('./nsfw/konaCommand');

// master commands
module.exports.leaveCommand = require('./master/leaveCommand');