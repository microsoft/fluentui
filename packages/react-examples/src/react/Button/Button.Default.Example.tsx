import * as React from 'react';
import { Stack, IStackTokens, SpinButton } from '@fluentui/react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import {
  MergeStylesRootProvider_unstable,
  MergeStylesShadowRootProvider_unstable,
  useAdoptedStylesheet_unstable,
} from '@fluentui/utilities';
// eslint-disable-next-line
import root from 'react-shadow';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 40 };

const Hmmm = props => {
  useAdoptedStylesheet_unstable('Hmmm');
  return <div {...props} />;
};

export const ButtonDefaultExample: React.FunctionComponent<IButtonExampleProps> = props => {
  const [shadowRootEl, setShadowRootEl] = React.useState<HTMLElement | null>(null);

  const setter = val => {
    setShadowRootEl(val);
  };

  const [disabled, setDisabled] = React.useState(false);
  const onClick = e => {
    setDisabled(!disabled);
  };

  return (
    <>
      <MergeStylesRootProvider_unstable>
        <root.div className="shadow-root" delegatesFocus ref={setter}>
          <MergeStylesShadowRootProvider_unstable shadowRoot={shadowRootEl?.shadowRoot}>
            <Stack horizontal tokens={stackTokens}>
              {/* eslint-disable-next-line */}
              <DefaultButton text="In the shadows" onClick={onClick} allowDisabledFocus disabled={disabled} />
              {/* <PrimaryButton
                text="Primary"
                onClick={_alertClicked}
                allowDisabledFocus
                disabled={disabled}
                checked={checked}
              />
              <PrimaryButton
                text="Primary 2"
                onClick={_alertClicked}
                allowDisabledFocus
                disabled={disabled}
                checked={checked}
              />*/}
              <SpinButton label="Shadow Button" />
            </Stack>
          </MergeStylesShadowRootProvider_unstable>
        </root.div>
      </MergeStylesRootProvider_unstable>
      <Stack horizontal tokens={stackTokens}>
        {/* eslint-disable-next-line */}
        <DefaultButton text="In the light" onClick={onClick} allowDisabledFocus disabled={disabled} />
        <SpinButton label="Light Button" />
      </Stack>
    </>
  );
};
