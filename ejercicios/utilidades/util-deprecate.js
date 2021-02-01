const util = require('util');

const helloPluto = util.deprecate(() => {
    console.log('hello pluto')
}, 'Pluto is deprecated. It is not a planet anymore.');

helloPluto()