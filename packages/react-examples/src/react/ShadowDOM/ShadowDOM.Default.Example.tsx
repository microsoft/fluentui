import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
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
  MergeStylesRootProvider_unstable,
  MergeStylesShadowRootProvider_unstable,
  ComboBox,
  IComboBoxOption,
  SelectableOptionMenuItemType,
} from '@fluentui/react';
// eslint-disable-next-line
import { WindowProvider } from '@fluentui/react-window-provider';
import { CompassNWIcon, DictionaryIcon, TrainSolidIcon } from '@fluentui/react-icons-mdl2';
// eslint-disable-next-line
import root from 'react-shadow';
import { Stylesheet } from '@fluentui/merge-styles';

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

type TestCompProps = {
  inShadow: boolean;
};

const TestComp: React.FC<TestCompProps> = ({ inShadow }) => {
  const label = inShadow ? 'Shadow DOM' : 'Light DOM';

  const [disabled, setDisabled] = React.useState(false);
  const onClick = () => {
    setDisabled(!disabled);
  };

  // return <PrimaryButton text="Primary shadow" allowDisabledFocus disabled={disabled} />;
  return (
    <Stack tokens={stackTokens}>
      <Text variant="large">{label}</Text>
      <DefaultButton text="Default" allowDisabledFocus disabled={disabled} />
      <PrimaryButton text="Primary" allowDisabledFocus disabled={disabled} />
      <SpinButton label="SpinButton" disabled={disabled} />
      <Checkbox label="Checkbox" disabled={disabled} />
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

type ShadowProps = {
  window?: Window;
};

const Shadow: React.FC<ShadowProps> = ({ window, children }) => {
  // This is a ref but we're using state to manage it so we can force
  // a re-render.
  const [shadowRootEl, setShadowRootEl] = React.useState<HTMLElement | null>(null);

  return (
    <MergeStylesRootProvider_unstable window={window}>
      <root.div className="shadow-root" delegatesFocus ref={setShadowRootEl}>
        <MergeStylesShadowRootProvider_unstable shadowRoot={shadowRootEl?.shadowRoot}>
          {children}
        </MergeStylesShadowRootProvider_unstable>
      </root.div>
    </MergeStylesRootProvider_unstable>
  );
};

export const ShadowDOMDefaultExample: React.FunctionComponent = () => {
  return (
    <>
      <Shadow>
        <TestComp inShadow={false} />
      </Shadow>
      <TestWindow />
    </>
  );
};
