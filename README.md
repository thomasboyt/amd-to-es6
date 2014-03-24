This is a comically naive AMD-to-ES6 converter.

It turns this:

```javascript
define(['foo', 'bar', 'baz'], function(Foo, Bar) {
  return 'hi!';
});
```

Into this:

```javascript
import Foo from 'foo';
import Bar from 'bar';
import 'baz';

export default 'hi!';
```

You can use it from the command line like:

```
amd-to-es6 fixtures/foo.js --dest tmp/
```

And it will output to `tmp/fixtures/foo.js`. You can also give it a shell wildcard that expands into a whole bunch of files:

```
amd-to-es6 fixtures/**/*.js --dest tmp/
```

and it does what you'd expect.
