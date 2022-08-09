// Inspired by: https://github.com/nolanlawson/shadow-selector-benchmark
function createStyleTag(css: string) {
  const style = document.createElement('style');
  style.textContent = css;
  return style;
}

export function injectGlobalCss(css?: string) {
  performance.mark('fluent-inject-global-css-start');
  css = `
    div {
      background-color: yellow;
    }

    button {
      background-color: hotpink;
    }

    hr {
      background-color: red;
    }

    stress-app {
      background-color: yellow;
    }

    stress-container {
      background-color: green;
    }

    stress-component {
      background-color: aliceblue;
    }
  `;

  document.head.appendChild(createStyleTag(css));
  performance.measure('fluent-inject-global-css', 'fluent-inject-global-css-start');
}
