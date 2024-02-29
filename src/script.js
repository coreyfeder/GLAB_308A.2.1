/*
 *  ADVENTURE!
 *  It's fun to be friends with friends.
 */

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
    roll (mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`)
    },
}

adventurer.roll();
adventurer.roll();
adventurer.roll();
