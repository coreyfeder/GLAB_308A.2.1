/*
 *  ADVENTURE!
 *  It's fun to be friends with friends.
 */


class Character {
    name
    health = 100
    inventory = []
    consumables = {}
    static MAX_HEALTH = 100

    // one way to add defaults: give constructor default values
    constructor (name, health, inventory) {
      // one way to add defaults: have logic inside constructor
        if (name) this.name = name;
        if (health) this.health = health;
        if (inventory) {this.inventory = inventory} else {this.inventory = ["the courage to change the world"]};
    }

    const roll1dX = (dX, mod=0) => { return Math.floor(Math.random() * dX) + 1 + mod }

    const rolldX = (dX, mod=0) => { return roll1dX(dX, mod) }

    const rollNdX = (N, dX, mod = 0) => {
      return mod + (N<1 ? 0 : this.roll1dX(dX) + (N==1 ? 0 : this.rollNdX(N-1, dX)) )
    }

    const roll = (N = 1, dX = 20, mod = 0) => {
        const result = rollNdX(N=N, dX=dX, mod=mod);
        console.log(`${this.name} rolled a ${result}.`)
    }

    gainItem(...item) { this.inventory.push(...item) };
    loseItem(item) { this.inventory.delete(this.inventory.lastIndexOf(item)) };

    addItem(item, count=1) {this.consumables[item] = count + (isNaN(this.consumables.item) ? 0 : this.consumables.item) }
    subtractItem(item, count=1) {this.consumables[item] = count + (isNaN(this.consumables.item) ? 0 : this.consumables.item) }

    dies () {
      console.log('URK! :ded: 💀');
    }
}

let theArgumentor // elucidate the behavior of construction parameters
theArgumentor = new Character();
console.log(`\nCharacter():\n${theArgumentor}`)
theArgumentor = new Character("Rocky");
console.log('\nCharacter("Rocky"):'); console.log(theArgumentor)
theArgumentor = new Character(name="Rocky");
console.log('\nCharacter(name="Rocky"):\n', theArgumentor)
theArgumentor = new Character(health=99);
console.log('\nCharacter(health=99):\n' + theArgumentor.toString())
theArgumentor = new Character(inventory=["I got sunshine"]);
console.log('\nCharacter(inventory=["I got sunshine"]):'); console.dir(theArgumentor)


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
        'AI Prompt Engineer / Illusionist',
        'CPA',
        'Lovable Sidekick',
        'Sassy Sidekick',
        'Useless Sidekick',
        'Talent Agent',
        'Talent Agent who does not feel bad about the state of ATS technology',  // must be Evil
        'Hapless Patsy',
        'a lowly stablehand',
    ]

    constructor (name, role) {
      super(name);
      // Adventurers have specialized roles.
      debugger;
      if (Adventurer.ROLES.includes(role)) {
          this.role = role;
      } else {
        this.role = 'a lowly stablehand'
      }
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
  

const robin = new Adventurer(name="Robin", role="the Chosen One");
robin.inventory = ["sword", "potion", "artifact"];
robin.companion = new Character("Leo");
robin.companion.type = "Cat";
robin.companion.companion = new Character("Frank");
robin.companion.companion.type = "Flea";
robin.companion.companion.inventory = ["small hat", "sunglasses"];

robin.addItem("grappling hook", "the power of friendship")

console.log("\n\nBehold, our heroic savior!!")
console.log(robin);

