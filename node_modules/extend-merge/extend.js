var baseExtend = require("./base-extend");

/**
 * Extends objects.
 *
 * Note: -- values ARE NOT cloned --
 *
 * @param  Object* ... A list of objects to extend (target, obj1, [obj2], ..., [objN]).
 * @return Object      The extended object.
 */
module.exports = function() {
  return baseExtend(arguments, false);
}
