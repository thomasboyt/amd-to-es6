var fs = require('fs');
var path = require('path');
var glob = require('glob');
var expect = require('chai').expect;

var convert = require('./');

var inFiles = glob.sync('fixtures/in/*.js');

inFiles.forEach(function(filename) {
  describe(filename, function() {

    it('compiles to expected', function() {
      var inSrc = fs.readFileSync(filename, 'utf8');
      var expectedSrc = fs.readFileSync(path.join('fixtures/out/', path.basename(filename)), 'utf8');
      var outSrc = convert(inSrc);
      expect(outSrc).to.equal(expectedSrc);
    });

  });
});
