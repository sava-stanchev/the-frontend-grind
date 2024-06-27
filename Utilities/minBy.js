/**
 * Implement a function minBy(array, iteratee)
 * that finds the element inside array
 * with the minimum value after going through iteratee.
 *
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {*} Returns the minimum value.
 */
export default function minBy(array, iteratee) {
  let result, computed;

  for (const value of array) {
    const current = iteratee(value);

    if (current != null && (computed === undefined || current < computed)) {
      computed = current;
      result = value;
    }
  }

  return result;
}
