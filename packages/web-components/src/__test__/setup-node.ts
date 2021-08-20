/* eslint-disable */
if (window.document && !window.document.createRange) {
  window.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    // @ts-ignore
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });
}

if (!window.matchMedia) {
  // @ts-ignore
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      };
    };
}

// In order to build under isolated modules, files without imports must at least export an empty namespace.
export {};
