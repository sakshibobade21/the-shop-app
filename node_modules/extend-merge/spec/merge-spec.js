var merge = require('..').merge;

function Collection() {};

describe(".merge()", function() {

  it("merges objects", function() {

    var a = { a: 'foo' };
    var b = { b: 'bar' };

    expect(merge({}, a, b)).toEqual({ a: 'foo', b: 'bar' });

  });

  it("merges objects with arrays", function() {

    var a = { a: 'foo' };
    var b = { b: ['bar'] };

    expect(merge({}, a, b)).toEqual({ a: 'foo', b: ['bar'] });

  });

  it("replaces former values", function() {

    var a = { a: 'foo' };
    var b = { a: 'bar' };

    expect(merge({}, a, b)).toEqual({ a: 'bar' });

  });

  it("supports `undefined`", function() {

    var a = { a: undefined };
    var b = { b: 'foo' };

    expect(merge({}, a, b)).toEqual({ b: 'foo' });
    expect(merge({}, b, a)).toEqual({ b: 'foo' });

  });

  it("supports `0`", function() {

    var a = { a: "default" };
    var b = { a: 0 };

    expect(merge({}, a, b)).toEqual({ a: 0 });
    expect(merge({}, b, a)).toEqual({ a: "default" });

  })

  it("supports `null` argument", function() {

    var a = { foo: 'bar' };
    var b = null;
    var c = void 0;

    expect(merge({}, a, b, c)).toEqual({ foo: 'bar' });
    expect(merge({}, b, a, c)).toEqual({ foo: 'bar' });

  });

  it("merges an array into an existing array", function() {

    var src = [1, {name:"value"}];
    var dst = [{key:"v"}];
    expect(merge(dst, src)).toBe(dst);
    expect(dst).toEqual([1, {name:"value"}]);
    expect(dst[1]).toEqual({name:"value"});

  });

  it('recursively copies objects into dst from left to right', function() {
    var dst = { foo: { bar: 'foobar' }};
    var src1 = { foo: { bazz: 'foobazz' }};
    var src2 = { foo: { bozz: 'foobozz' }};
    merge(dst, src1, src2);
    expect(dst).toEqual({
      foo: {
        bar: 'foobar',
        bazz: 'foobazz',
        bozz: 'foobozz'
      }
    });
  });

  it('replaces primitives with objects', function() {
    var dst = { foo: 'bloop' };
    var src = { foo: { bar: { baz: 'bloop' }}};
    merge(dst, src);
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
    merge(dst, src);
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
    merge(dst, src);
    expect(dst).toEqual({
      foo: fn
    });

  });

  it('creates a new array if destination property is a non-object and source property is an array', function() {

    var dst = { foo: NaN };
    var src = { foo: [1,2,3] };
    merge(dst, src);
    expect(dst).toEqual({
      foo: [1,2,3]
    });

  });

  it("is mutable", function () {

    var a = { foo: 'bar' };

    merge(a, { foo: "baz" });
    expect(a.foo).toEqual("baz");

  });

  it("is immutable with {} as target", function () {

    var a = { foo: 'bar' };

    merge({}, a, { foo: "baz" });
    expect(a.foo).toEqual('bar');

  });

  it("is immutable on arrays", function() {

    var a = { a: 'foo' };
    var b = { b: ['bar'] };

    var result = merge({}, a, b);
    expect(result.b).toEqual(['bar']);
    expect(result.b).not.toBe(b.b);

  });

  it("maintains constructors", function () {

    var a = { foo: new Collection() };

    var c = merge({}, a);
    expect(c.foo instanceof Collection).toBe(true);

  });

  it("maintains immutability", function() {

    var dst = {};
    var src1 = { foo: { bar: { prop1: 'a' }, baz: { prop3: 'c' } } };
    var src2 = { foo: { bar: { prop2: 'b' } } };

    merge(dst, src1, src2);
    expect(dst).toEqual({
      foo: {
        bar: { prop1: 'a', prop2: 'b' },
        baz: { prop3: 'c' }
      }
    });

    expect(src1).toEqual({ foo: { bar: { prop1: 'a' }, baz: { prop3: 'c' } } });
    expect(src2).toEqual({ foo: { bar: { prop2: 'b' } } });

  });

  it("ignores constructors", function () {

    var a = JSON.parse('{"constructor": {"__proto__":{"polluted":"yes"}}}');
    var c = merge({}, a);
    expect({}.polluted).toBe(undefined);

  });

  it("ignores __proto__", function () {

    var a = JSON.parse('{"__proto__":{"polluted":"yes"}}');
    var c = merge({}, a);
    expect({}.polluted).toBe(undefined);

  });

});
