import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { FocusTrapZone, Toggle } from '@fluentui/react';

export const ShadowDOMFocusTrapZoneChildShadowDomExample: React.FunctionComponent = () => {
  const [disabled, setDisabled] = React.useState(true);
  const buttonsConstructed = React.useRef(false);

  const setRef = (node: HTMLElement | null) => {
    if (node && buttonsConstructed.current === false) {
      const btns = Array.from(node.querySelectorAll('.demo-button'));

      btns.forEach((btn, i) => {
        // Ideally this would be a custom element but because of the way
        // Stories are transpiled, classes are converted to ES5 which breaks
        // custom elements (they require ES6 classes).
        // This approach gives us a shadow root to demonstrate the feature.
        const shadowRoot = btn.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `<button>shadow button ${i + 1}</button>`;
      });

      buttonsConstructed.current = true;
    }
  };

  return (
    <Shadow>
      <Toggle
        checked={!disabled}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={() => setDisabled(!disabled)}
        label="Enable trap zone"
        onText="On (toggle to exit)"
        offText="Off"
      />
      <FocusTrapZone disabled={disabled} forceFocusInsideTrap={false} ref={setRef}>
        <div className="demo-button" />
        <div className="demo-button" />
        <div className="demo-button" />
        <div className="demo-button" />
      </FocusTrapZone>
    </Shadow>
  );
};
