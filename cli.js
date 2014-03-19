var convert = require('./index');
var path = require('path');
var fs = require('fs');

var opts = require('nomnom')
  .nocolors()
  .script('amd-to-es6')
  .options({
    'path': {
      help: 'Path to AMD file(s).',
      required: true,
      list: true,
      position: 0
    },
    'dest': {
      help: 'Destination folder for ES6ified files.\t[required]',
      metavar: 'FOLDER',
      required: true
    }
  })
  .parse();

opts.path.forEach(function(filename) {
  var src = fs.readFileSync(filename, 'utf8');
  var out = convert(src);
  var outPath = path.join(opts.dest, filename);
  require('mkdirp').sync(path.dirname(outPath));
  fs.writeFileSync(outPath, out);
});
