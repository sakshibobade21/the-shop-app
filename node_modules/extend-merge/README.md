# extend-merge

[![Build Status](https://travis-ci.org/crysalead-js/extend-merge.svg?branch=master)](https://travis-ci.org/crysalead-js/extend-merge)

Shallow extend and deep merge utility function.

## API

List of methods:

### extend(target, object1, ...)

**Arguments:**

  * `target`  *Object* The target object.
  * `object1` *Object* The object that will extend the target.
  * `objectN` *Object* (optional) More objects.

**Return value:** The extended target object.

**Syntax:**

```js
extend({}, { a: "foo" }, { b: "bar" }));
// => result: { a: "foo", b: "bar" }
```

### merge(target, source1, source2, ...)

**Arguments:**

  * `target`  *Object* The target object.
  * `object1` *Object* The object that will be merged in target.
  * `objectN` *Object* (optional) More objects.

**Return value:** The merged target object.

**Syntax:**

```js
merge({}, { a: { foo: "foo" } }, { a: { bar: "bar" } }));
// => result: { a: { foo: "foo", bar: "bar" } }
```

### blend(target, source1, source2, ...)

**Arguments:**

  * `target`  *Object* The target object.
  * `object1` *Object* The object that will be merged in target.
  * `objectN` *Object* (optional) More objects.

**Return value:** The blended target object.

Same behavior as `merge()` except that it also deeply merges non plain object.

## Acknowledgement

Sorry I don't remember from where I copy pasted this code from. Don't hesitate to let me know.
