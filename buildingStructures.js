/* role.builder - stworzenei creepa który w zależości od tego czy ma surowiec czy nie idzie budować lub ją zbierać
przy każdej zmianie zachowania mówi czyli wyświetla chmurkę z wiadomością o tym czym będzie się teraz zajmował
rysują cprzy tym na mapie linie do wyznaczonego celu. */


build(target) // wznoszenie budynku - "traget" > ConstructionSite (in range  3 squares of the creep).
visualizePathStyle // towrzy i rysuje na mapie domyślnie przeźroczystą ścieżkę creepa, (more options:RoomVisual.poly)
poly(points, [style]) // stylizuje ścieżkę

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) { 
            // jeżeli creep nie ma energii mówi "harvest". i ustawia metode "building" na false
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            //if creep nie ma wolnego miejsca na energie to mówi "build"...
	        creep.memory.building = true; // and set building to "true
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) { // if building == true, zajmuje się cyklem budowniczego
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES); // szuka miejsc na konstrukcje
            if(targets.length) { // jeżeli jakieś są to...
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) { // jeżeli creep nie jest w zasięgu szukanej struktury
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}}); // idzie do niej i rysuje ścieżkę
                }
            }
	    }
	    else { // jeżeli builind == false, czyli że creep nie ma surowców to idzie zbierać
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;