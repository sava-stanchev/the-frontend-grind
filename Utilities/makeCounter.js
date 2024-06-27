/**
 * Implement a function that accepts an integer value
 * and returns a function that can be
 * repeatedly called to return increasing values
 *
 * @param {number} initialValue
 * @return {Function}
 */
export default function makeCounter(initialValue = 0) {
  let count = initialValue;

  return () => {
    return count++;
  };
}
