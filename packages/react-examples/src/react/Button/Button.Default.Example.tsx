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
} from '@fluentui/react';
// eslint-disable-next-line
import { WindowProvider } from '@fluentui/react-window-provider';
import { CompassNWIcon, DictionaryIcon, TrainSolidIcon } from '@fluentui/react-icons-mdl2';
// eslint-disable-next-line
import root from 'react-shadow';
import { EventMap, Stylesheet } from '@fluentui/merge-styles';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 10 };

type TestCompProps = {
  inShadow: boolean;
};

const TestComp: React.FC<TestCompProps> = ({ inShadow }) => {
  const label = inShadow ? 'Shadow DOM' : 'Light DOM';

  const [disabled, setDisabled] = React.useState(false);
  const onClick = e => {
    setDisabled(!disabled);
  };

  return (
    <Stack tokens={stackTokens}>
      <Text variant="large">{label}</Text>
      <DefaultButton text="Default" allowDisabledFocus disabled={disabled} />
      <PrimaryButton text="Primary" allowDisabledFocus disabled={disabled} />
      <SpinButton label="SpinButton" disabled={disabled} />
      <Checkbox label="Checkbox" disabled={disabled} />
      <TextField label="TextField" disabled={disabled} />
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

    const next = new Map();
    childWindow.__mergeStylesAdoptedStyleSheets__ = new EventMap<string, Stylesheet>();
    window.__mergeStylesAdoptedStyleSheets__?.forEach((value, key) => {
      const sheet = new childWindow.CSSStyleSheet();

      const srcSheet = value.getAdoptableStyleSheet();
      if (!srcSheet) {
        return;
      }

      for (const rule of srcSheet.cssRules) {
        sheet.insertRule(rule.cssText);
      }

      const style = new Stylesheet(undefined, undefined, key);
      style.setAdoptableStyleSheet(sheet);

      childWindow.__mergeStylesAdoptedStyleSheets__?.set(key, style);

      console.log('new sheet', style);
    });

    const childRoot = childWindow.document.body.appendChild(childWindow.document.createElement('div'));

    ReactDOM.render(
      <WindowProvider window={childWindow}>
        <Shadow window={childWindow}>
          <TextField />
        </Shadow>
      </WindowProvider>,
      childRoot,
    );
  };

  // eslint-disable-next-line
  return <PrimaryButton text="Open Child Window" onClick={openWindow} />;
};

const Shadow: React.FC = ({ window, stylesheets, children }) => {
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

export const ButtonDefaultExample: React.FunctionComponent<IButtonExampleProps> = props => {
  const [shadowRootEl, setShadowRootEl] = React.useState<HTMLElement | null>(null);

  return (
    <>
      <MergeStylesRootProvider_unstable>
        <root.div className="shadow-root" delegatesFocus ref={setShadowRootEl}>
          <MergeStylesShadowRootProvider_unstable shadowRoot={shadowRootEl?.shadowRoot}>
            <TestComp inShadow={true} />
          </MergeStylesShadowRootProvider_unstable>
        </root.div>
      </MergeStylesRootProvider_unstable>
      {/* <TestComp inShadow={false} /> */}
      <TestWindow />
    </>
  );
};
