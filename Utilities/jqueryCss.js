/**
 * Implement a jQuery-like function that
 * sets the style of a DOM element
 *
 * @param {string} selector
 * @return {{css: Function}}
 */
export default function $(selector) {
  const element = document.querySelector(selector);

  return {
    css: function (prop, value) {
      if (value === undefined) {
        if (element == null) {
          return undefined;
        }

        const value = element.style[prop];
        return value === "" ? undefined : value;
      }

      if (element != null) {
        element.style[prop] = value;
      }

      return this;
    },
  };
}
