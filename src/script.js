/*
 *  ADVENTURE!
 *  It's fun to be friends with friends.
 */


class Character {
    name,
    health,
    inventory,

    constructor (name) {
        this.name = name;
        this.health = 100;
        this.inventory = [];
    },
    roll (mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`)
    },
\
}


const adventurer = {
    name: "Robin",
    health: 10,  // bra ur so ded
    inventory: ["sword", "potion", "artifact"],
    companion: {
        name: "Leo",
        type: "Cat",
        companion: {
            name: "Frank",
            type: "Flea",
            inventory: ["small hat", "sunglasses"],
        },
    },
}

adventurer.roll();
adventurer.roll();
adventurer.roll();
