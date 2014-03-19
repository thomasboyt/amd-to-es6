var fs = require('fs');
var convert = require('./index');
var fix = fs.readFileSync('./fixtures/route.js', 'utf8');

console.log(convert(fix));
