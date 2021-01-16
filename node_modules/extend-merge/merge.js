var baseExtend = require("./base-extend");

/**
 * Merges objects in a deep way.
 *
 * Note: -- doesn't merge non plain object together --
 * Note: -- values ARE NOT cloned --
 *
 * @param  Object* ... A list of objects to merge (target, obj1, [obj2], ..., [objN]).
 * @return Object      The merged object.
 */
module.exports = function() {
  return baseExtend(arguments, true);
}
