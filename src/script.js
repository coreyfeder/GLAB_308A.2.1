/*
 *  ADVENTURE!
 *  It's fun to be friends with friends.
 */

class Character {
    name
    type
    description = ""
    level = 0
    experience = 0
    health_current = 100
    health_max = 100
    energy_current = 100
    energy_max = 100
    // base stats
    stats = {
        salt               : 10,
        panache            : 10,
        tenacity           : 10,
        compassion         : 10,
        wit                : 10,
        executive_function : 10,
        luck               : 10,
    }
    // belongings
    inventory = []
    consumables = {}

    constructor (name = "Bobert", health=100, energy=100, inventory=[], consumables={}) {
        if (name) this.name = name;
        if (health) {
            this.health_current = health;
            this.health_max = health;
        }
        if (energy) {
            this.energy_current = energy;
            this.energy_max = energy;
        }
        if (Array.isArray(inventory)) {this.inventory = inventory} else {this.inventory = ["hope for a better tomorrow"]};
        if (typeof consumables == 'object' && !Array.isArray(consumables)) {
            this.inventory = inventory
        } else {
            this.inventory = {whoopass: 99, lollipops: 0}
        }
    }

    roll1dX = (dX, mod=0) => { return Math.floor(Math.random() * dX) + 1 + mod }
    rolldX = (dX, mod=0) => { return this.roll1dX(dX, mod) }
    rollNdX = (N, dX, mod = 0) => {
      return mod + (N<1 ? 0 : this.roll1dX(dX) + (N==1 ? 0 : this.rollNdX(N-1, dX)) )
    }
    roll = (N = 1, dX = 20, mod = 0) => {
        const result = this.rollNdX(N=N, dX=dX, mod=mod);
        console.log(`${this.name} rolled a ${result}.`)
    }

    gainItem(...item) { this.inventory.push(...item) };
    loseItem(item) { this.inventory.delete(this.inventory.lastIndexOf(item)) };

    addItem(item, count=1, ...moreitems) {
        this.consumables[item] = count + (isNaN(this.consumables.item) ? 0 : this.consumables.item)
        if (moreitems.length) { addItem(...moreItems); }
    }
    subtractItem(item, count=1) {this.consumables[item] = count + (isNaN(this.consumables.item) ? 0 : this.consumables.item) }

    dies () { console.log('URK! :ded: 💀'); }
}

class Adventurer extends Character {
    static ROLES = [
        'Fighter',
        'Healer',
        'Wizard',
        'Archer',
        'Cleric',
        'Thief',
        'Thief with a Heart of Gold',
        'Monk (chanty-chanty)',
        'Monk (flippy-fighty)',
        'Monk (OCD detective)',
        'Bard (Minstrel)',
        'Bard (Shakespeare, THE Bard)',
        'Bard (Chatbot)',
        'Bartender',
        'Software Engineer',
        'Teacher (aka "Paladin")',
        'AI Prompt Engineer (aka "Illusionist")',
        'Crypto Bro (aka "Evil Illusionist")',
        'Accountant',
        'Lovable Sidekick',
        'Sassy Sidekick',
        'Useless Sidekick',
        'Talent Manager',
        'Talent Manager who does not feel bad about the state of ATS technology',  // must be Evil
        'Motivational Speaker',
        'Personal Assistant',
        'miserable peon',
    ]

    constructor (name, role) {
        super(name);
        // Adventurers have specialized roles.
        if (role in Adventurer.ROLES) {
            this.role = role;
        } else {
            this.role = 'miserable peon'
        }
        // Starting inventory
        this.gainItem("bedroll")
        this.addItem("gold", 50);
    }

    // Adventurers have the ability to scout ahead of them.
    scout() {
        console.log(`${this.name} is scouting ahead...`);
        this.roll();
    }

    // Loot the bodies, you murder hobo.
    loot() {
        console.log(
            `You rifle through the belongings of the miserable creature who now lies in the dust. 
            Sifting through the record and wreckage of a life cut short, you cast aside treasured
            scraps; such paltry things represent this creature's thoughts, deeds, and dreams...
            all worthless to you unless they can be pawned for your filthy lucre.`);
        this.roll();
    }
  }
  

class Companion extends Character {
    companion_to
    companions = [];
    
    constructor (name, role) {
        super(name);
    }

    heroically_die_saving_the_hero () {
        console.log(`NOOOO! ${this.name}! 😭`);
        this.health = 0;
        if (this.companion_to.health <= 0) {
            console.log(`${this.companion_to.name}'s grief turns to vengeful resolution!`)
          this.companion_to.health = this.companion_to.health_max
        }
    }
  
    // Companions have the ability to have inappropriate biological functions.
    gas (modifier = this.companion_to.luck) {
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
  }
  

const adventurer = new Adventurer(name="Robin", role="the Chosen One");
adventurer.inventory = ["sword", "potion", "artifact"];
adventurer.companion = new Character("Leo");
adventurer.companion.type = "Cat";
adventurer.companion.companion = new Character("Frank");
adventurer.companion.companion.type = "Flea";
adventurer.companion.companion.inventory = ["small hat", "sunglasses"];

adventurer.addItem("grappling hook", "the power of friendship")

console.log("\n\nBehold, our heroic savior!!")
console.log(adventurer);

adventurer.scout()
adventurer.scout()
adventurer.scout()
adventurer.loot()

