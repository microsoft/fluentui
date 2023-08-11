import * as React from 'react';
import {
  DefaultButton,
  PrimaryButton,
  Stack,
  IStackTokens,
  SpinButton,
  Text,
  FontIcon,
  Icon,
  MergeStylesRootProvider_unstable,
  MergeStylesShadowRootProvider_unstable,
} from '@fluentui/react';
import { CompassNWIcon, DictionaryIcon, TrainSolidIcon } from '@fluentui/react-icons-mdl2';
// eslint-disable-next-line
import root from 'react-shadow';

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
      {/* eslint-disable-next-line */}
      <DefaultButton text="Default" onClick={onClick} allowDisabledFocus disabled={disabled} />
      <PrimaryButton text="Primary" allowDisabledFocus disabled={disabled} />
      <SpinButton label="SpinButton" />
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
      <TestComp inShadow={false} />
    </>
  );
};
