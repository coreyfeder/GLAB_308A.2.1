class Hand {
    name
    luck = 50;
    static COUNT = 1;

    constructor(name) {
        this.name = name
    }

/*     roll1dX = (dX, mod=0) => { return Math.floor(Math.random() * dX) + 1 + mod }
    rolldX = (dX, mod=0) => { return roll1dX(dX, mod) }
    rollNdX = (N, dX, mod = 0) => {
      return mod + (N<1 ? 0 : this.roll1dX(dX) + (N==1 ? 0 : this.rollNdX(N-1, dX)) )
    }
    roll = (N = 1, dX = 20, mod = 0) => {
        const result = this.rollNdX(N=N, dX=dX, mod=mod);
        console.log(`${this.name} rolled a ${result}.`)
        return result
    }
 */

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
        console.log(`${this.name} rolled a ${result}.`)
        return result
    };

}

let handy = new Hand
handy.roll()

