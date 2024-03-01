class Character {
    constructor (name) {
        this.name = name;
        this.currentHealth = 100;
        this.currentAttack = 20;
        this.inventory = [];
    }
    addItem(item) {
        this.inventory.push(item)
    }
    addItems(items) {
        items.forEach(element => {
            this.inventory.push(element)
        });
    }
    attack(target) {
        target.takeDamage(this.currentAttack)
    }
    takeDamage(amt) {
        this.currentHealth -= amt
        if(this.currentHealth <= 0) {
            this.die();
        }
    }
    die() {
        console.log(`${this.name} is dead!`)
    }
}
class Hero extends Character {
    constructor(name) {
        super(name)
    }
    dodge() {
        console.log(`${this.name} has dodged the enemy attack`)
    }
}
class Enemy extends Character {
    constructor(name) {
        super(name)
    }
}
const hero = new Hero('Bob');
const enemy = new Enemy('Jack');
console.log(enemy.currentHealth);
hero.attack(enemy);
hero.attack(enemy);
hero.attack(enemy);
console.log(enemy.currentHealth)

