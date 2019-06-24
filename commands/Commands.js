// normal commands
module.exports.helpCommand = require('./helpCommand').run;
module.exports.interactionCommand = require('./interactionCommand').run;
module.exports.gifCommand = require('./gifCommand').run;
module.exports.activitiesCommand = require('./activitiesCommand').run;

// master commands
module.exports.leaveCommand = require('./master/leaveCommand').run;