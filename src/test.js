class StatBlock {
    static StatMax = 25;
    static StatMin = 0;
    #salt
    #panache
    #tenacity
    #compassion
    #wit
    #executive_function
    #luck
    
    constructor(
        salt=10,
        panache=10,
        tenacity=10,
        compassion=10,
        wit=10,
        executive_function=10,
        luck=10,
    ) {
        this.#salt = salt
        this.#panache = panache
        this.#tenacity = tenacity
        this.#compassion = compassion
        this.#wit = wit
        this.#executive_function = executive_function
        this.#luck = luck

    // constructor(modifiers) {
    //     // e.g., { luck: -5 }
    //     for (let mod in modifiers) {
    //         if (self.hasOwnProperty(mod)) {
    //             self.mod += modifiers[mod]
    //         } else {
    //             self[mod] = modifiers.mod
    //         }
    //     }
    // }
    }

    // getters & setters
    get salt() { return this.#salt; }
    
    // setter
    set salt(val) { this.#salt = Math.max(Math.min(val, StatBlock.StatMax), StatBlock.StatMin); }
    
}

console.log('\nTesting:')
let stat
stat = new StatBlock
console.dir(stat)
stat = new StatBlock(11, 12, 13, 14, 15, 16, 17)
console.dir(stat)
stat = new StatBlock(luck=30)
console.dir(stat)
stat = new StatBlock({luck:30})
console.dir(stat)
stat = new StatBlock([luck=30])
console.dir(stat)
