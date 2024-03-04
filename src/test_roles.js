// dataclass
class AdventurerRole {
    role = ""
    health_modifier = 0
    energy_modifier = 0
    stat_modifiers = []
    skills = []
    abilities = []

    constructor(
        name, 
        healthmod=0, 
        energymod=0, 
        stats=[],
        skills=[],
        abilities=[], 
    ) {
        super(name, healthmod, energymod)
        this.stat_modifiers = stats
        this.skills = skills
        this.abilities = abilities
    }
}

let role=[]
role[0] = new ClassAdventurers
role[1] = new ClassAdventurers()
role[2] = new ClassAdventurers(
    "Dog Walker", 
    0, 
    10,
)
role[3] = new ClassAdventurers(
    "Psychic", 
    -10, 
    +10, 
    [{compassion: +2, luck: +2}], 
    [], 
    [
        {name: "Vicious Mockery", cost: 30, type: "attack", damage: +0, debuff: ["slow", "sad", "self-conscious"]},
        {name: "I See What You're Up To", cost: 40, type: "defense", protection: 100, debuff: ["chastised"]},
    ]
)
console.dir(role)