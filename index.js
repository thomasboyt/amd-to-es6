var recast = require('recast');
var _ = require('underscore');

var n = recast.types.namedTypes;
var b = recast.types.builders;


function generateImportsForAMD(deps, params) {
  return _.zip(deps, params).map(function(depNamePair) {
    var dep = depNamePair[0];
    var identifier = depNamePair[1];

    if ( !identifier ) {
      // imported but not actually used, treat as bare import
      return b.importDeclaration([], 'default', dep);
    }

    return b.importDeclaration([b.importSpecifier(identifier)], 'default', dep);
  });
}

/*
 * |\
 * | \
 * |  \
 * |   \  This should probably be refactored
 * |   /  to not be a pyramid of doom
 * |  /
 * | /
 * |/
 */
module.exports = function convert(source) {
  var ast = recast.parse(source);

  // we don't need to deep traverse, only declarations are top-level
  for (var idx in ast.program.body) {
    var node = ast.program.body[idx];
    if ( n.ExpressionStatement.check(node) ) {
      if ( n.CallExpression.check(node.expression) ) {
        if ( node.expression.callee.name === 'define' ) {
          var args = node.expression.arguments;
          var deps;
          var content;

          if (args.length === 1) {
            content = args[0].body.body;
          } else {
            deps = args[0].elements;
            content = args[1].body.body;
          }

          var imports = [];
          if (deps) {
            imports = generateImportsForAMD(deps, args[1].params);
          }

          // replace the return in the module w/ export default
          for (var j in content) {
            if ( n.ReturnStatement.check(content[j]) ) {
              content[j] = {
                type: 'ExportDeclaration',
                default: true,
                declaration: content[j].argument
              };
            }
          }

          var newBody = imports.concat(content);
          ast.program.body.splice(idx, 1, newBody);
          ast.program.body = _.flatten(ast.program.body);
          break;
        }
      }
    }
  }

  return recast.print(ast).code;
};
