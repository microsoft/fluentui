import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { FocusZone, FocusZoneDirection } from '@fluentui/react-focus';

export const ShadowDOMFocusZoneHorizontalMenuShadowDomExample: React.FunctionComponent = () => {
  const buttonsConstructed = React.useRef(false);

  const setRef = (node: HTMLElement | null) => {
    if (node && buttonsConstructed.current === false) {
      const btns = Array.from(node.querySelectorAll('.demo-button'));

      btns.forEach((btn, i) => {
        // Ideally this would be a custom element but because of the way
        // Stories are transpiled, classes are converted to ES5 which breaks
        // custom elements (they require ES6 classes).
        // This approach gives us a shadow root to demonstrate the feature.
        const shadowRoot = btn.attachShadow({ mode: 'open', delegatesFocus: true });

        shadowRoot.innerHTML = `<button>shadow button ${i + 1}</button>`;
      });

      buttonsConstructed.current = true;
    }
  };

  return (
    <Shadow>
      <FocusZone
        direction={FocusZoneDirection.domOrder}
        role="menubar"
        // eslint-disable-next-line react/jsx-no-bind
        elementRef={setRef}
        style={{ display: 'flex', gap: 10 }}
      >
        <div className="demo-button" />
        <div className="demo-button" />
        <div className="demo-button" />
        <div className="demo-button" />
      </FocusZone>
    </Shadow>
  );
};
