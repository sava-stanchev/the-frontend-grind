/**
 * Implement a function mean(array)
 * that returns the mean (also known as average)
 * of the values inside array, which is an array of numbers.
 *
 * @param {Array} array - Array from which the elements are all numbers.
 * @return {Number} Returns mean.
 */
export default function mean(array) {
  return array.reduce((a, b) => a + b, 0) / array.length;
}
