// Room controler - kluczowa pod względem strategicznym struktóra w pokoju, im wyższy jej level tym więcej budynków zbudować można.

Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Upgrader1' ); // ten creep zajmować się będzie ulepszaniem kontrolera.

// przekazanie creepom do pamięcy "Memory"(object) ich ról aby uniknąć tego samego zachowania. Pamięć każdego creepa można sprwdzić
Game.creeps['Harvester1'].memory.role = 'harvester';
Game.creeps['Upgrader1'].memory.role = 'upgrader';


//UPGRADER MODULE - role.upgrader

upgradeController // funkcja wykonywana przez upgraedera - wysyła energie do kontrolera
Creep.room.controller // get Controller object with help of this property.

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store[RESOURCE_ENERGY] == 0) { // gdy creep nie ma energii idzie ją zebrać (!do głębszej analizy!)
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else { // gdy creep ma energie idzie ją wysłać do Romm Controllera
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
	}
};

module.exports = roleUpgrader;


//  Pogrupowanie zadań creepów w pętli za pomocą przekazanych im do pamięci modułów w "main"

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}


/*
Important: If you don’t upgrade your Controller within 20,000 game ticks, it loses one level. 
On reaching level 0, you will lose control over the room, and another player will be able to capture it freely. 
Make sure that at least one of your creeps regularly performs the function upgradeController.
*/