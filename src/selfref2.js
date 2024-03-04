class SelfRef {
    static selfrefcount = 0;

    static funca() { console.log("funca called"); }
    static funcb() { console.log("funcb called"); this.funca ; }
}

console.log("Initialized.")
console.log('SelfRef.selfrefcount: ', SelfRef.selfrefcount)

// SelfRef.funca()
let selfRef = new SelfRef();
SelfRef.funca();
SelfRef.funcb();
