




const newConsole = console.Console({
    stdout: process.stdout,
    stderr: process.stderr
})

const perso = {
    log: "  \u001b[37m ☺",
    danger: "  \u001b[31m ☠",
    info: "  \u001b[34m ℹ",
    warning: "  \u001b[33m ⚠",
    love: "  \u001b[35m ❤"
};

console.Console.prototype.logger = function(text){
    this.log(`${perso.log} ${text}`)
}

console.Console.prototype.danger = function(text){
    this.log(`${perso.danger} ${text}`)
}

console.Console.prototype.information = function(text){
    this.log(`${perso.info} ${text}`)
}

console.Console.prototype.warning = function(text){
    this.log(`${perso.warning} ${text}`)
}

console.Console.prototype.love = function(text){
    this.log(`${perso.love} ${text}`)
}


newConsole.logger("this is a normal log");
newConsole.danger('danger log');
newConsole.information('info log');
newConsole.warning('warning log');
newConsole.love('love you')
