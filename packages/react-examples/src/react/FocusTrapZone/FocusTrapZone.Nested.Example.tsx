import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { FocusTrapZone } from '@fluentui/react/lib/FocusTrapZone';
import { Stack, IStackStyles } from '@fluentui/react/lib/Stack';
import { Toggle, IToggleStyles } from '@fluentui/react/lib/Toggle';
import { memoizeFunction } from '@fluentui/react/lib/Utilities';
import { useBoolean, useEventCallback } from '@fluentui/react-hooks';

const getStackStyles = memoizeFunction(
  (isActive: boolean): Partial<IStackStyles> => ({
    root: { border: `2px solid ${isActive ? '#ababab' : 'transparent'}`, padding: 10 },
  }),
);

const stackTokens = { childrenGap: 10 };
const fixedWidthToggleStyles: Partial<IToggleStyles> = { root: { width: 200 } };
const FocusTrapComponent: React.FunctionComponent<React.PropsWithChildren<{ zoneNumber: number }>> = props => {
  const [isActive, { toggle: toggleIsActive }] = useBoolean(false);
  const { zoneNumber, children } = props;
  const onStringButtonClicked = (): void => {
    alert(`Button ${zoneNumber} clicked`);
  };

  const [showIFrame, { toggle: toggleShowIFrame }] = useBoolean(false);

  return (
    <FocusTrapZone disabled={!isActive} forceFocusInsideTrap={false}>
      <Stack horizontalAlign="start" tokens={stackTokens} styles={getStackStyles(isActive)}>
        <Toggle
          checked={isActive}
          onChange={toggleIsActive}
          label={'Enable trap zone ' + zoneNumber}
          onText="On (toggle to exit)"
          offText="Off"
          // Set a width on these toggles in the horizontal zone to prevent jumping when enabled
          styles={zoneNumber >= 2 && zoneNumber <= 4 ? fixedWidthToggleStyles : undefined}
        />
        <Toggle
          checked={showIFrame}
          onChange={toggleShowIFrame}
          label="Show IFrame"
          onText="On (toggle to close)"
          offText="Off"
        />
        {showIFrame ? <IFrameWrapper onClick={toggleShowIFrame} /> : null}
        <DefaultButton
          // eslint-disable-next-line react/jsx-no-bind
          onClick={onStringButtonClicked}
          text={`Zone ${zoneNumber} button`}
        />
        {children}
      </Stack>
    </FocusTrapZone>
  );
};

export const FocusTrapZoneNestedExample = () => (
  <div>
    <FocusTrapComponent zoneNumber={1}>
      <FocusTrapComponent zoneNumber={2}>
        <FocusTrapComponent zoneNumber={3} />
        <FocusTrapComponent zoneNumber={4} />
      </FocusTrapComponent>
      <FocusTrapComponent zoneNumber={5} />
    </FocusTrapComponent>
  </div>
);

const IFrameWrapper = (props: { onClick: () => void }): JSX.Element => {
  const onClick = useEventCallback(props.onClick);

  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

  React.useEffect(() => {
    if (iframeRef.current) {
      const contentWindow = iframeRef.current.contentWindow;

      if (contentWindow) {
        const root = contentWindow.document.createElement('div');
        contentWindow.document.body.appendChild(root);

        ReactDOM.render(<DefaultButton onClick={onClick}>Button in IFrame</DefaultButton>, root);
      }
    }
  }, [onClick]);

  return <iframe style={{ width: '400px', height: '100px' }} ref={iframeRef} />;
};
