Game // klasa w której jest cała gra.
Game.spawns // spawny.
Game.spawns['<nazwa spawnu>'] // wybranie spawnu.
Game.spawns['<nazwa spawnu>'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1' ); // rekrutacja pracownika.

harvest(target) // wymaga żródła przylegającego do creepa oraz: WORK,CARRY,MOVE

// wysłanie creepa do zbierania.
module.exports.loop = function () {
    var creep = Game.creeps['Harvester1']; // sterowanie creepem po jego imieniu.
    var sources = creep.room.find(FIND_SOURCES); // "find" znajduje wszystko w pokoju, "FIND_SOURCES" filtruje wyniki
    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) { // czy źródło przylega do creepa
        creep.moveTo(sources[0]); // jeśli po za zasięgiem przemieść się do źródła podanego w filtrze
    }
}

// EXCENDET VERSION - creep idzie zbierać, gdy jest pełny to wraca z energią i pprzekazuje ją po czym kontynuuje.

store // object that contains cargo of this creep.
transfer(target, resourceType, [amount]) // musi przylegać, "target" może być spawnem lub nawet innym creepem

// przyniesienie energi przez creepa do spawnu i jej transfer
module.exports.loop = function () {
    var creep = Game.creeps['Harvester1'];

    if(creep.store.getFreeCapacity() > 0) { // sprawdza czy creep ma wolne miejsce na przechowanie energii
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        } // jeżeli ma to idzie ją zebrać
    }
    else { // kiedy jest pełny
        if( creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) { // sprawdza czy spawn przylega do creepa
            creep.moveTo(Game.spawns['Spawn1']);
        }
    }
}

//SECOUND EXTENSION - zaangażowanie dwóch creepów(harvesterów) w cykl zbioru energii.
// ( można by również skopiować) powyższy kod dla drugiego harvestera

module.exports.loop = function () {
    for(var name in Game.creeps) { // dla każdego creepa w grze
        var creep = Game.creeps[name];

        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
    }
}


// Kolejna porawa - przeniesienie zachowania robotników do osobnego modułu. / Organising harvesters behavior into separate moodules

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) { // FUNKCJA NAPISANA POWYŻEJ
	    if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
	}
};

module.exports = roleHarvester; 


// MAIN MODULE CODE REWRITE - pozostawienie jedynie pętli "for" i odwołanie się do nowego modułu.

var roleHarvester = require('role.harvester'); // metoda wzywająca moduł "role.harvester"

module.exports.loop = function () {

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        roleHarvester.run(creep);
    }
}