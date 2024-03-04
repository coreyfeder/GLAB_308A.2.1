class SelfRef {
    static selfrefcount = 0;

    funca() { console.log("funca called"); }
    funcb() { console.log("funcb called"); this.funca(); }
}

console.log("Initialized.")
console.log('SelfRef.selfrefcount: ', SelfRef.selfrefcount)

// SelfRef.funca()  // only works if funca is static
let selfRef = new SelfRef();
selfRef.funca();  // only works if funca is NOT static
selfRef.funcb();  // only works if funca is NOT static
