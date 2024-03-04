/* 
Why isn't this working?

static validateStat(stat, value) {
    let newStatValue = self.stats[stat]
    if (isNaN(value)) {
        console.warn(`Cannot adjust a stat by "${value}".\n  (${this.name}, ${stat})`);
    } else {
        newStatValue += Math.floor(value)
        if (stat != "luck") {
            newStatValue = Math.min(newStatValue, this.STAT_MAX)
            newStatValue = Math.max(newStatValue, this.STAT_MIN)
        }
    }
}

// setters don't set, they ADJUST by the given amount
set salt(value) { self.stats.salt = this.validateStat(salt, value); }
set panache(value) { self.stats.panache = this.validateStat(panache, value); }
set cardio(value) { self.stats.cardio = this.validateStat(cardio, value); }
set tenacity(value) { self.stats.tenacity = this.validateStat(tenacity, value); }
set compassion(value) { self.stats.compassion = this.validateStat(compassion, value); }
set wit(value) { self.stats.wit = this.validateStat(wit, value); }
set executive_function(value) { self.stats.executive_function = this.validateStat(executive_function, value); }
set luck(value) { self.stats.luck = this.validateStat(luck, value); }

 */

class NormalSetter {
    value
    constructor(value) { this.value = value; }
    get value() { return this.value; }
    set value(newValue) { this.value=newValue; }
}

class IgnoreSetter {
    value
    constructor(value) { this.value = value; }
    get value() { return this.value; }
    set value(newValue) { return; }
}

class AdjustSetter {
    value
    constructor(value) { this.value = value; }
    get value() { return this.value; }
    set value(newValue) { this.value+=newValue; }
}

let normalSetter = new NormalSetter(3);
let ignoreSetter = new IgnoreSetter(3);
let adjustSetter = new AdjustSetter(3);

console.log(`\nnormal: ${normalSetter.value}`)
console.log(`set to 5: ${normalSetter.value = 5}`)
console.log(`normal: ${normalSetter.value}`)
// console.log(`set BY 7: ${normalSetter.value.set(7)}`)
// console.log(`normal: ${normalSetter.value}`)

console.log(`\nignore: ${ignoreSetter.value}`)
console.log(`set to 5: ${ignoreSetter.value = 5}`)
console.log(`ignore: ${ignoreSetter.value}`)

console.log(`\nadjust: ${adjustSetter.value}`)
console.log(`set to 5: ${adjustSetter.value = 5}`)
console.log(`adjust: ${adjustSetter.value}`)
