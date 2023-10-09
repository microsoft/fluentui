import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Callout,
  DefaultButton,
  PrimaryButton,
  Checkbox,
  TextField,
  Stack,
  IStackTokens,
  SpinButton,
  Text,
  FontIcon,
  Icon,
  ComboBox,
  IComboBoxOption,
  SelectableOptionMenuItemType,
} from '@fluentui/react';
// eslint-disable-next-line
import { WindowProvider } from '@fluentui/react-window-provider';
import { CompassNWIcon, DictionaryIcon, TrainSolidIcon } from '@fluentui/react-icons-mdl2';
import { Stylesheet } from '@fluentui/merge-styles';

import { Shadow } from './ShadowHelper';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 10 };

const options: IComboBoxOption[] = [
  { key: 'Header1', text: 'First heading', itemType: SelectableOptionMenuItemType.Header },
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C' },
  { key: 'D', text: 'Option D' },
  { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
  { key: 'Header2', text: 'Second heading', itemType: SelectableOptionMenuItemType.Header },
  { key: 'E', text: 'Option E' },
  { key: 'F', text: 'Option F', disabled: true },
  { key: 'G', text: 'Option G' },
  { key: 'H', text: 'Option H' },
  { key: 'I', text: 'Option I' },
  { key: 'J', text: 'Option J' },
];

const TestLayer: React.FC = () => {
  const [showCallout, setShowCallout] = React.useState(false);

  return (
    <>
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <DefaultButton id="callout-button" text="Show callout" onClick={() => setShowCallout(!showCallout)} />
      {showCallout && (
        <Callout
          role="dialog"
          gapSpace={0}
          target={`#callout-button`}
          // eslint-disable-next-line react/jsx-no-bind
          onDismiss={() => setShowCallout(false)}
          setInitialFocus
          styles={{ root: { padding: '1rem' } }}
        >
          <Text as="h1" block>
            Callout shows up next to target within shadow DOM as expected. Default layer host is also created within the
            corresponding shadow DOM if no layer host is provided. Note that if providing a custom layer host, it must
            be in the same shadow DOM as the target.
          </Text>
        </Callout>
      )}
    </>
  );
};

type TestCompProps = {
  inShadow: boolean;
};

const TestComp: React.FC<TestCompProps> = ({ inShadow }) => {
  const label = inShadow ? 'Shadow DOM' : 'Light DOM';

  const [disabled, setDisabled] = React.useState(false);
  const onClick = () => {
    setDisabled(!disabled);
  };

  return (
    <Stack tokens={stackTokens}>
      <Text variant="large">{label}</Text>
      <DefaultButton text="Default Button" disabled={disabled} />
      <PrimaryButton text="Primary Button" disabled={disabled} />
      <SpinButton label="SpinButton" disabled={disabled} />
      <TextField label="TextField" disabled={disabled} />
      <TextField label="TextField2" disabled={disabled} />
      <ComboBox
        multiSelect={true}
        defaultSelectedKey="C"
        label="Basic single-select ComboBox"
        options={options}
        disabled={disabled}
      />

      {/* eslint-disable-next-line */}
      <Checkbox label="Disable controls" checked={disabled} onChange={onClick} />
      <TestLayer />
      <Stack tokens={{ childrenGap: 5 }}>
        <Text>FontIcons</Text>
        <Stack horizontal tokens={{ childrenGap: 5 }}>
          <FontIcon aria-label="Compass" iconName="CompassNW" />
          <FontIcon aria-label="Dictionary" iconName="Dictionary" />
          <FontIcon aria-label="Train" iconName="TrainSolid" />
        </Stack>
      </Stack>
      <Stack tokens={{ childrenGap: 5 }}>
        <Text>Icons</Text>
        <Stack horizontal tokens={{ childrenGap: 5 }}>
          <Icon aria-label="Compass" iconName="CompassNW" />
          <Icon aria-label="Dictionary" iconName="Dictionary" />
          <Icon aria-label="Train" iconName="TrainSolid" />
        </Stack>
      </Stack>
      <Stack tokens={{ childrenGap: 5 }}>
        {/* SVG icons use SCSS and load-themed-styles so we'll need to
            address that to get them rendering correctly in shadow */}
        <Text>SVG Icons</Text>
        <Stack horizontal tokens={{ childrenGap: 5 }}>
          <CompassNWIcon />
          <DictionaryIcon />
          <TrainSolidIcon />
        </Stack>
      </Stack>
    </Stack>
  );
};

const TestWindow: React.FC = () => {
  const openWindow = () => {
    const childWindow = window.open();
    if (!childWindow) {
      return;
    }

    // childWindow.__SENTINAL__ = 'child';

    Stylesheet.getInstance().projectStylesToWindow(childWindow);

    const childRoot = childWindow.document.body.appendChild(childWindow.document.createElement('div'));
    ReactDOM.render(
      <WindowProvider window={childWindow}>
        <Shadow window={childWindow}>
          <TestComp inShadow={true} />
        </Shadow>
      </WindowProvider>,
      childRoot,
    );
  };

  // eslint-disable-next-line
  return <PrimaryButton text="Open Child Window" onClick={openWindow} />;
};

export const ShadowDOMChildWindowExample: React.FunctionComponent = () => {
  return (
    <>
      <Shadow>
        <TestComp inShadow={true} />
      </Shadow>
      <TestWindow />
    </>
  );
};
