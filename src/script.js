/*
 *  ADVENTURE!
 *  It's fun to be friends with friends.
 */


class Character {
    name,
    health,
    inventory,
    static MAX_HEALTH = 100, = []

    constructor (name) {
        this.name = name;
        this.health = 100;
        this.inventory = [];

    },
    roll (mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`)
    },
}


class Adventurer extends Character {
    static ROLES = [
        'Fighter',
        'Healer',
        'Wizard',
        'Thief',
        'Archer',
        'Cleric',
        'Monk (chanty)',
        'Monk (flippy-fighty)',
        'Monk (OCD detective)',
        'Bard',
        'Bard, THE Bard',
        'Bard, the Chatbot',
        'Software Engineer / Paladin',
        `AI Prompt Engineer / Illusionist`,
        'CPA',
        'Lovable Sidekick',
        'Sassy Sidekick',
        'Useless Sidekick',
        'Talent Agent',
        'Talent Agent who does not feel bad about the state of ATS technology',  // must be Evil
    ]

    constructor (name, role) {
      super(name);
      // Adventurers have specialized roles.
      this.role = role;
      // Every adventurer starts with a bed and 50 gold coins.
      this.inventory.push("bedroll", "50 gold coins");
    }

    // Adventurers have the ability to scout ahead of them.
    scout() {
      console.log(`${this.name} is scouting ahead...`);
      super.roll();
    }

    // Loot the bodies, you murder hobo.
    loot() {
        console.log(`You rifle through the belongings of the sentient creature who now lies dead, searching pockets and folds for any valuables. You sift through the record and wreckage of a life, hunting for any relic of its actions, hopes, or dreams that you might pawn for your filthy lucre.`);
        super.roll();
    }
  }
  

class Companion extends Character {
    constructor (name, role) {
      super(name);
      // Adventurers have specialized roles.
      this.role = role;
      // Every adventurer starts with a bed and 50 gold coins.
      this.inventory.push("bedroll", "50 gold coins");
    }
    parasites = [];

    // Companions have the ability to have inappropriate biological functions.
    fart (modifier = 0) {
        let severity = super.roll();
        if (severity >= 18) {
            console.log(`An unknown toxin burns your eyes!`);
            console.log(`(Your PERCEPTION has temporarily decreased.)`);
            console.log(`(You receive 3 points of Poison damage.)`);
        } else if (severity >= 15) {
            console.log(`"PBBT!" Nearby creatures become hostile to ${this.parent.name}!`);
            console.log(`(Your CHARISMA has temporarily decreased dramatically.)`);
        } else if (severity >= 10) {
            console.log(`"toot!" Everyone looks at ${this.parent.name} accusingly.`);
            console.log(`(Your CHARISMA has temporarily decreased.)`);
        } else if (severity >= 0) {
            console.log(`A strange look crosses ${this.name}'s face, then it is gone.`);
            console.log(`A moment passes...`);
            console.log(`A strange look crosses ${this.parent.name}'s face, then it is gone.`);
            console.log(`(Your CONCENTRATION has temporarily decreased.)`);
        } else {
            console.log(`${this.name} suddenly holds very still...`);
            console.log(`"pbt!" The tiny explusion so alarms ${this.name} that they fall backwards, flailing, before scrambling behind your legs in fear.`);
            console.log(`Their confused, derpy, adorable face is nearly too much to bear.`);
            console.log(`(Your LUCK has temporarily increased.)`);
            console.log(`(Your CONSTITUTION has temporarily increased.)`);
            console.log(`(Your CHARISMA has temporarily increased.)`);
            console.log(`(You regain 1 health.)`);
        }
    }

    heroically_die_saving_the_hero () {
      console.log(`Nooooooo! ${this.name}! 😭`);
      this.health = 0;
      if (this.parent.health <= 0) {
        this.parent.health = 1
      };
    }
  }
  




const robin = new Adventurer("Robin");
robin.inventory = ["sword", "potion", "artifact"];
robin.companion = new Character("Leo");
robin.companion.type = "Cat";
robin.companion.companion = new Character("Frank");
robin.companion.companion.type = "Flea";
robin.companion.companion.inventory = ["small hat", "sunglasses"];

console.log(dir(Robin));
