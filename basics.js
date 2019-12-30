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