/*
 *  ADVENTURE!
 *  It's fun to be friends with friends.
 */

// treating this like an enumeration, to limit impact of inevitable typos
const salt = "salt"
const panache = "panache"
const cardio = "cardio"
const tenacity = "tenacity"
const compassion = "compassion"
const wit = "wit"
const executive_function = "executive_function"
const luck = "luck"


// TODO: Implement stats
// TODO: Implement combat abilities
// TODO: Create separate class of combat actions


/* role: {
    health: health restoration rate,
    energy: energy restoration rate,
    stats: {
        {stat}: stat modifier, [...]
    },
    inventory: [starting inventory],
    skills: [proficiencies],
    abilities: [special abilities: override methods to create unique effects; consumes energy],
} */
const ROLE_SPECS = {
    'Fighter': {
        modifier_to_health_restoration: +7, 
        modifier_to_energy_restoration: -5, 
        stats:{
            salt: +3, 
            tenacity: +1, 
            compassion: -4, 
            wit: -2,
        }, 
        inventory: ["sword", "shield", "chain armor"],
        skills: ["intimidation", "drinking"],
        abilities: [
            { name: "bull rush", type: "attack", cost: 35, description: "roll(this.salt) vs. roll(enemy.tenacity); success = stun target for one turn." },
            { name: "walk it off", type: "buff", cost: 40, description: "regain 50 health. usable once per combat." },
        ]
    },
    'Healer': {
        modifier_to_health_restoration: +5, 
        modifier_to_energy_restoration: +10, 
        stats: {
            salt: -4,
            tenacity: +1,
            compassion: +5,
            executive_function: +3,
            luck: +1,
        },
        inventory: ["plague mask", "herbal balm", "wand of restoration (3)", "a really good chicken soup recipe"],
        skills: ["medicine", "herbalism", "anatomy"],
        abilities: [
            { name: "healing word", type: "buff", cost: 20, description: "heal ally with lowest health" },
            { name: "restoration", type: "buff", cost: 0, item_charges: "wand of restoration", description: "remove all negative statuses from an ally" },
        ]
    },
    'Wizard': {
        modifier_to_health_restoration: -8, 
        modifier_to_energy_restoration: +15,
        stats: {
            salt: -5, 
            cardio: -2, 
            wit: +2, 
            executive_function: +5, 
            pedantry: +3,
        },
        inventory: ["staff", "robe", "pointy hat", "spellbook", "mana potion (2)"],
        skills: ["arcane", "alchemy", "demonology", "pointy hats"],
        abilities: [
            { name: "fireball", type: "attack", cost: 50, description: "[AOE] damage each enemy failing a roll(enemy.cardio) vs. your roll(this.pedantry). Affects enemies that cannot be targeted." },
            { name: "magic missile", type: "attack", cost: 10, description: "pew!" },
        ],
    },
    'Cleric': {
        modifier_to_health_restoration: +5,
        modifier_to_energy_restoration: +10,
        stats: {
            salt: +3, 
            panache: -4, 
            tenacity: +4, 
            compassion: +5, 
            wit: -5, 
            luck: +7,
        },
        inventory: ["mace", "shield", "chain armor", "holy relic", "gold (-25)"],
        skills: ["religion", "history", "lecture", "immune to Existential Dread"],
        abilities: [
            { name: "sanctuary", type: "buff", cost: 30, description: "ally with the lowest health cannot be targeted by enemies next turn" },
            { name: "smite", type: "attack", cost: 40, description: "calling in a Favour" },
        ]
    },
    // more classes coming soon!
    /* 
    'Assassin': {
        abilities: [
            { name: "melt into shadow", type: "defense", cost: 30, description: "becomes Hidden. While Hidden, cannot be targeted. Loses Hidden when attacking or taking damage." },
            { name: "darkness' embrace", type: "attack", cost: 20, requires: this.Hidden, description: "a venemous strike from the shadows: roll(this.panache) vs. roll(enemy.executive_function); success = damage * 1.25 and target is Poisoned." },
        ]
    },
    'Archer (aka Offensively Stereotypical Elf)': {},
    'Vampire': {},  // Regains health when attacks. Sparkles.
    'Thief': {},
    'Thief with a Heart of Gold': {},
    'Monk (chanty-chanty)': {},
    'Monk (flippy-fighty)': {},
    'Monk (OCD detective)': {},
    'Bard (Minstrel)': {},
    'Bard (Shakespeare, THE Bard)': {},
    'Bard (Chatbot)': {},
    'Bartender': {},
    'Software Engineer': {},  // Luck -10
    'Teacher (aka "Paladin")': {},
    'AI Prompt Engineer (aka "Illusionist")': {},
    'Crypto Bro (aka "Evil Illusionist")': {},
    'Accountant': {},
    'Dog Walker': {},
    'Lovable Sidekick': {},
    'Sassy Sidekick': {},
    'Useless Sidekick': {},
    'Talent Manager': {},
    'Talent Manager who does not feel bad about the state of ATS technology': {},
    'Motivational Speaker': {},
    'Personal Assistant': {},
    'miserable peon': {},
     */
}

// const ROLES = Object.keys(ROLE_SPECS);
/* 
What...the...hell kind of back-assward construction is `Object.keys(myObject)`?
If I want the keys of myObject, how is `myObject.keys()` not the intuitive approach?
Is there some reason it's necessary for this NOT to be an instance method? 
Do you not trust an object to report its own keys? 

JavaScript, this is one of the reasons people hate you so much.
It's mostly Prototypes and Promises, but also this unnecessary friction.
*/

class Character {
    static MAX_ENERGY = 100
    static MAX_HEALTH = 100
    static ENERGY_MAX = 100
    static HEALTH_MAX = 100
    static STAT_MAX = 20
    static STAT_MIN = -10
    name
    description = ""
    level = 0
    experience = 0
    health_current = 100
    health_restore = 5
    energy_current = 100
    energy_restore = 20
    gold = 0
    is_conscious = true
    // base stats
    stats = {
        salt                : 0,
        panache             : 0,
        cardio              : 0,
        tenacity            : 0,
        compassion          : 0,
        wit                 : 0,
        executive_function  : 0,
        luck                : 5,  // spice up every roll
    }
    // belongings
    inventory = []
    consumables = {}
    // other
    companions = []
    affiliations = []  // guilds, governments, gangs, etc.

    constructor (name = "Bobert", inventory=[], consumables={}) {
        if (name) this.name = name;
        if (Array.isArray(inventory)) {this.inventory = inventory} else {this.inventory = ["hope for a better tomorrow"]};
        if (typeof consumables == 'object' && !Array.isArray(consumables)) {
            this.consumables = consumables
        } else {
            this.consumables = {whoopass: 99, lollipops: 0}
        }
    }
    
    // this is tedious. is there a quicker way?
    get salt() { return self.stats.salt; }
    get panache() { return self.stats.panache; }
    get cardio() { return self.stats.cardio; }
    get tenacity() { return self.stats.tenacity; }
    get compassion() { return self.stats.compassion; }
    get wit() { return self.stats.wit; }
    get executive_function() { return self.stats.executive_function; }
    // get luck() { return self.stats.luck; }
    get luck() { return Math.floor(Math.random() * this.stats.luck) }
    
    static validateStat(currentvalue, newvalue) {
        if (isNaN(newvalue)) {
            console.warn(`Cannot adjust a stat by "${newvalue}".\n  (${this.name}, ${currentvalue}, ${newvalue})`);
            return currentvalue;
        } else {
            newvalue = Math.floor(newvalue)
            newvalue = Math.min(newStatValue, this.STAT_MAX)
            newvalue = Math.max(newStatValue, this.STAT_MIN)
            return newvalue;
        }
    }

    set salt(value) { self.stats.salt = this.validateStat(self.stats.salt, value); }
    set panache(value) { self.stats.panache = this.validateStat(self.stats.panache, value); }
    set cardio(value) { self.stats.cardio = this.validateStat(self.stats.cardio, value); }
    set tenacity(value) { self.stats.tenacity = this.validateStat(self.stats.tenacity, value); }
    set compassion(value) { self.stats.compassion = this.validateStat(self.stats.compassion, value); }
    set wit(value) { self.stats.wit = this.validateStat(self.stats.wit, value); }
    set executive_function(value) { self.stats.executive_function = this.validateStat(self.stats.executive_function, value); }
    set luck(value) { self.stats.luck = value; }

    // making rolls
    roll1dX = (dX, mod=0) => { return Math.floor(Math.random() * dX) + 1 + mod }
    rolldX = (dX, mod=0) => { return this.roll1dX(dX, mod) }
    rollNdX = (N, dX, mod = 0) => {
      return mod + (N<1 ? 0 : this.roll1dX(dX) + (N==1 ? 0 : this.rollNdX(N-1, dX)) )
    }
    // dumbLuck() {
    //     return floor(Math.random * Math.abs(this.luck))
    // }
    // roll = (N = 1, dX = 20, mod = 0) => {
    //     const result = this.rollNdX(N=N, dX=dX, mod=mod);
    //     console.log(`${this.name} rolled a ${result}.`)
    // }
    roll = (
        stat=null, 
        N=1, 
        dX=20, 
        mod=this.luck,  // fate's finger, by default
    ) => {
        let newMod = mod
        if (stat && this.hasOwnProperty(stat)) {
            newMod += this.stats[stat]
        }
        const result = this.rollNdX(N=N, dX=dX, mod=newMod);
        // console.debug(`${this.name} rolled a ${result}.`)
        return result
    }

    loseHealth = (damage) => {
        this.health_current = max(this.health_current - damage, 0)
        if (this.health_current <= 0) this.dies();
    }

    hasEnoughEnergy = (exhaustion) => {
        return this.energy_current >= exhaustion
    }

    loseEnergy = (exhaustion) => {
        this.energy_current = max(this.energy_current - exhaustion, 0)
    }

     restoreHealth = (hp, overrideLimits=false) => {
        let gain = hp
        let newHealth = this.health_current + hp
        if (!overrideLimits && (newHealth > Adventurer.HEALTH_MAX)) {
            gain = (Adventurer.HEALTH_MAX - this.health_current)
            this.health_current = Adventurer.HEALTH_MAX;
        }
        // console.log(`${this.name} regains ${gain} health.`)
        return gain
     }

    restoreEnergy = (ep, overrideLimits=false) => {
        let gain = ep
        let newEnergy = this.energy_current + ep
        if (!overrideLimits && (newEnergy > Adventurer.ENERGY_MAX)) {
            gain = (Adventurer.ENERGY_MAX - this.energy_current)
            this.energy_current = Adventurer.ENERGY_MAX;
        }
        // console.log(`${this.name} regains ${gain} energy.`)
        return gain
     }

     fullRestore = () => {
        this.restoreHealth(Adventurer.HEALTH_MAX)
        this.restoreEnergy(Adventurer.ENERGY_MAX)
        // console.debug(`${this.name} fully recovers their health (${this.health_current}) and energy (${this.energy_current}).`)
     }

     gainItem = (...item) => { this.inventory.push(...item) };
     loseItem = (item) => { this.inventory.delete(this.inventory.lastIndexOf(item)) };
 
     addItem = (item, count=1, ...moreitems) => {
         this.consumables[item] = count + (isNaN(this.consumables.item) ? 0 : this.consumables.item)
         if (moreitems.length) { addItem(...moreItems); }
     }
     subtractItem = (item, count=1) => {this.consumables[item] = count + (isNaN(this.consumables.item) ? 0 : this.consumables.item) }
  
     turnBegins = () => {
        // override for time-based effects
     }

     turnEnds = () => {
        // override for time-based effects
     }

     dies = () => { 
        this.is_conscious = false; 
        console.log(`URK! ${this.name} is down! 💀`);
    }
}

class Adventurer extends Character {
    static ROLES = Object.keys(ROLE_SPECS)
    
    honor = 0
    duel_victories = 0
    duel_defeats = 0

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

    adoptCompanion (type, name) {
        let newFriend = new Companion(this, type, name);
        this.companions.push(newFriend);
        return newFriend;
    }

    // Adventurers have the ability to scout ahead of them.
    scout() {
        console.log(`${this.name} is scouting ahead...`);
        this.roll();
    }

    // Loot the bodies, you murder hobo.
    loot() {
        console.log(
            "You rifle through the belongings of the miserable creature who now lies " +
            "in the dust. Sifting through the record and wreckage of a life cut short, " +
            "you cast aside treasured scraps; such paltry things represent this creature's " +
            "thoughts, deeds, and dreams... all worthless to you unless they can be pawned " +
            "for your filthy lucre.");
        this.roll();
    }

    rest() {
        // Rest up in combat to regain energy
        let restored = this.restoreEnergy(this.energy_restore + this.luck)
    }

    duel(opponent) {
        // TODO: implement duel abilities
        // TODO: duel with different styles
        // TODO: implement ties

        // start at full health. the instructions don't indicate this, but fair's fair.
        
        console.group(`\nDuel: ${this.name} vs ${opponent.name}`)
        console.log(`${this.name.toUpperCase()} has issued a challenge to ${opponent.name.toUpperCase()}! To the Arena!`)
        
        console.log(`Wait, while the combatants ready themselves...`)
        let challengerRoll, opponentRoll, victor, defeated
        let rounds = 0
        opponent.fullRestore()
        this.fullRestore()

        console.group(`Parry and strike!`)
        while ((this.health_current > 50) && (opponent.health_current > 50)) {
            // TODO: cycle through stats?
            // TODO: implement dueling skills
            rounds++
            challengerRoll = this.roll()
            opponentRoll = opponent.roll()
            // console.debug(`  (${this.name}'s ${challengerRoll} to ${opponent.name}'s ${opponentRoll}`)
            if (challengerRoll > opponentRoll) {
                opponent.health_current -= 1
            } else if (challengerRoll < opponentRoll) {
                this.health_current -= 1
            }
        }
        console.groupEnd()
        
        if (this.health_current > opponent.health_current) {
            victor = this
            defeated = opponent
        } else {
            victor = opponent
            defeated = this
        }
        console.log(`It's over! Glory shines upon both combatants, but after ${rounds} rounds, ${victor.name} claims victory!`)
        victor.honor += 3
        victor.gold += 25
        victor.duel_victories += 1
        defeated.honor += 1
        defeated.gold += 10
        defeated.duel_defeats += 1
        console.groupEnd()
    }
};

class Companion extends Character {
    companion_to
    companions = [];
    
    constructor (companion_to, type, name) {
        super(name)
        this.companion_to = companion_to
        this.type = type
    }

    heroically_die_saving_the_hero () {
        console.log(`NOOOO! ${this.name}! 😭`);
        this.health = 0;
        if (this.companion_to.health <= 0) {
            console.log(`${this.companion_to.name}'s grief turns to vengeful resolution!`)
          this.companion_to.health = this.companion_to.HEALTH_MAX
        }
    }
  
    // Movies have taught me that Companions sometimes have inappropriate biological functions.
    // I think I need to watch a higher class of movie.
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

console.log(`\nTesting Robin's luck.`)
console.log(adventurer.luck)
console.log(adventurer.luck)
console.log(adventurer.luck)
adventurer.scout()
adventurer.scout()
adventurer.scout()

console.log(`\nLet's fight for fun!`)
let fighter = new Adventurer("Fiona", "Fighter")
let healer = new Adventurer("Helena", "Healer")
let wizard = new Adventurer("Wanda", "Wizard")
let cleric = new Adventurer("Cedric", "Cleric")

wizard.duel(cleric)
fighter.duel(healer)
cleric.duel(fighter)
healer.duel(wizard)

console.log(`\nAfter four exhibition bouts:`)
for (let combatant of [cleric, fighter, healer, wizard]) {
    console.log(`  ${combatant.name} has scored ${combatant.duel_victories} victories!`)
}
