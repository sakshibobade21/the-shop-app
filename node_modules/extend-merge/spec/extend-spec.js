var extend = require('..').extend;

function Collection() {};

describe(".extend()", function() {

  it("extends objects", function() {

    var a = { a: 'foo' };
    var b = { b: 'bar' };

    expect(extend({}, a, b)).toEqual({ a: 'foo', b: 'bar' });

  });

  it("extends objects with arrays", function() {

    var a = { a: 'foo' };
    var b = { b: ['bar'] };

    expect(extend({}, a, b)).toEqual({ a: 'foo', b: ['bar'] });

  });

  it("replaces former values", function() {

    var a = { a: 'foo' };
    var b = { a: 'bar' };

    expect(extend({}, a, b)).toEqual({ a: 'bar' });

  });

  it("supports `undefined`", function() {

    var a = { a: undefined };
    var b = { b: 'foo' };

    expect(extend({}, a, b)).toEqual({ b: 'foo' });
    expect(extend({}, b, a)).toEqual({ b: 'foo' });

  });

  it("supports `0`", function() {

    var a = { a: "default" };
    var b = { a: 0 };

    expect(extend({}, a, b)).toEqual({ a: 0 });
    expect(extend({}, b, a)).toEqual({ a: "default" });

  })

  it("supports `null` argument", function() {

    var a = { foo: 'bar' };
    var b = null;
    var c = void 0;

    expect(extend({}, a, b, c)).toEqual({ foo: 'bar' });
    expect(extend({}, b, a, c)).toEqual({ foo: 'bar' });

  });

  it("extends an array into an existing array", function() {

    var src = [1, {name:"value"}];
    var dst = [{key:"v"}];
    expect(extend(dst, src)).toBe(dst);
    expect(dst).toEqual([1, {name:"value"}]);
    expect(dst[1]).toEqual({name:"value"});

  });

  it('extends objects into dst from left to right', function() {
    var dst = { foo: { bar: 'foobar' }};
    var src1 = { foo: { bazz: 'foobazz' }};
    var src2 = { foo: { bozz: 'foobozz' }};
    extend(dst, src1, src2);
    expect(dst).toEqual({
      foo: { bozz: 'foobozz' }
    });
  });

  it('replaces primitives with objects', function() {
    var dst = { foo: 'bloop' };
    var src = { foo: { bar: { baz: 'bloop' }}};
    extend(dst, src);
    expect(dst).toEqual({
      foo: {
        bar: {
          baz: 'bloop'
        }
      }
    });
  });

  it('replaces null values in destination with objects', function() {
    var dst = { foo: null };
    var src = { foo: { bar: { baz: 'bloop' }}};
    extend(dst, src);
    expect(dst).toEqual({
      foo: {
        bar: {
          baz: 'bloop'
        }
      }
    });
  });

  it('copies references to functions by value rather than merging', function() {

    function fn() {}
    var dst = { foo: 1 };
    var src = { foo: fn };
    extend(dst, src);
    expect(dst).toEqual({
      foo: fn
    });

  });

  it('creates a new array if destination property is a non-object and source property is an array', function() {

    var dst = { foo: NaN };
    var src = { foo: [1,2,3] };
    extend(dst, src);
    expect(dst).toEqual({
      foo: [1,2,3]
    });

  });

  it("is mutable", function () {

    var a = { foo: 'bar' };

    extend(a, { foo: 'baz' });
    expect(a.foo).toEqual('baz');

  });

  it("is immutable with {} as target", function () {

    var a = { foo: 'bar' };

    extend({}, a, { foo: 'baz' });
    expect(a.foo).toEqual('bar');

  });

  it("is immutable on arrays", function() {

    var a = { a: 'foo' };
    var b = { b: ['bar'] };

    var result = extend({}, a, b);
    expect(result.b).toEqual(['bar']);
    expect(result.b).not.toBe(b.b);

  });

  it("maintains constructors", function () {

    var a = { foo: new Collection() };

    var c = extend({}, a);
    expect(c.foo instanceof Collection).toBe(true);

  });

  it("maintains immutability", function() {

    var dst = {};
    var src1 = { foo: { bar: { prop1: 'a' }, baz: { prop3: 'c' } } };
    var src2 = { foo: { bar: { prop2: 'b' } } };

    extend(dst, src1, src2);
    expect(dst).toEqual({
      foo: {
        bar: { prop2: 'b' }
      }
    });

    expect(src1).toEqual({ foo: { bar: { prop1: 'a' }, baz: { prop3: 'c' } } });
    expect(src2).toEqual({ foo: { bar: { prop2: 'b' } } });

  });

});