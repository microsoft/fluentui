import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { FocusTrapZone } from '@fluentui/react/lib/FocusTrapZone';
import { Link } from '@fluentui/react/lib/Link';
import { Stack, IStackStyles } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Toggle, IToggle } from '@fluentui/react/lib/Toggle';
import { memoizeFunction } from '@fluentui/react/lib/Utilities';
import { useBoolean, useEventCallback } from '@fluentui/react-hooks';
import type { JSXElement } from '@fluentui/utilities';

const getStackStyles = memoizeFunction(
  (useTrapZone: boolean): Partial<IStackStyles> => ({
    root: { border: `2px solid ${useTrapZone ? '#ababab' : 'transparent'}`, padding: 10 },
  }),
);
const textFieldStyles: Partial<ITextFieldStyles> = { root: { width: 300 } };
const stackTokens = { childrenGap: 8 };

export const FocusTrapZoneBoxExample: React.FunctionComponent = () => {
  const toggle = React.useRef<IToggle | null>(null);
  const [useTrapZone, { toggle: toggleUseTrapZone }] = useBoolean(false);

  const [showIFrame, { toggle: toggleShowIFrame }] = useBoolean(false);

  return (
    <Stack tokens={stackTokens}>
      <Stack.Item>
        <Text>
          If this button is used to enable FocusTrapZone, focus should return to this button after the FocusTrapZone is
          disabled.
        </Text>
      </Stack.Item>
      <Stack.Item>
        <DefaultButton onClick={toggleUseTrapZone} text="Trap Focus" />
      </Stack.Item>
      <FocusTrapZone disabled={!useTrapZone}>
        <Stack horizontalAlign="start" tokens={stackTokens} styles={getStackStyles(useTrapZone)}>
          <Toggle
            label="Use trap zone"
            componentRef={toggle}
            checked={useTrapZone}
            onChange={toggleUseTrapZone}
            onText="On (toggle to exit)"
            offText="Off"
          />
          <TextField label="Input inside trap zone" styles={textFieldStyles} />
          <Toggle
            checked={showIFrame}
            onChange={toggleShowIFrame}
            label="Show IFrame"
            onText="On (toggle to close)"
            offText="Off"
          />
          {showIFrame ? <IFrameWrapper onClick={toggleShowIFrame} /> : null}
          <Link href="https://bing.com" target="_blank">
            Hyperlink inside trap zone
          </Link>
        </Stack>
      </FocusTrapZone>
    </Stack>
  );
};

const IFrameWrapper = (props: { onClick: () => void }): JSXElement => {
  const onClick = useEventCallback(props.onClick);

  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

  React.useEffect(() => {
    if (iframeRef.current) {
      const contentWindow = iframeRef.current.contentWindow;

      if (contentWindow) {
        const root = ReactDOMClient.createRoot(contentWindow.document.body);

        root.render(<DefaultButton onClick={onClick}>Button in IFrame</DefaultButton>);
      }
    }
  }, [onClick]);

  return <iframe style={{ width: '400px', height: '100px' }} ref={iframeRef} />;
};
