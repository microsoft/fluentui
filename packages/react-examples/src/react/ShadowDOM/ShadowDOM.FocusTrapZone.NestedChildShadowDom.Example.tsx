import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { FocusTrapZone, Toggle } from '@fluentui/react';

type ZoneProps = {
  zoneNumber: number;
  depth: number;
};

const Zone: React.FC<ZoneProps> = ({ zoneNumber, depth, children }) => {
  const [disabled, setDisabled] = React.useState(true);
  const buttonsConstructed = React.useRef(false);

  const style = React.useMemo(() => {
    return {
      marginLeft: 10 * depth,
      border: `2px solid ${!disabled ? '#ababab' : 'transparent'}`,
      padding: 10,
    };
  }, [depth, disabled]);

  const setRef = (node: HTMLElement | null) => {
    if (node && buttonsConstructed.current === false) {
      const btns = Array.from(node.querySelectorAll(':scope > .demo-button'));

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
    <div style={style}>
      <Toggle
        checked={!disabled}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={() => setDisabled(!disabled)}
        label={`Enable trap zone ${zoneNumber}`}
        onText="On (toggle to exit)"
        offText="Off"
      />
      <FocusTrapZone disabled={disabled} forceFocusInsideTrap={false} ref={setRef}>
        <div className="demo-button" />
        <div className="demo-button" />
        <div className="demo-button" />
        <div className="demo-button" />
        {children}
      </FocusTrapZone>
    </div>
  );
};

export const ShadowDOMFocusTrapZoneNestedChildShadowDomExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <Zone zoneNumber={1} depth={0}>
        <Zone zoneNumber={2} depth={1}>
          <Zone zoneNumber={3} depth={2} />
          <Zone zoneNumber={4} depth={2} />
        </Zone>
        <Zone zoneNumber={5} depth={1} />
      </Zone>
    </Shadow>
  );
};
