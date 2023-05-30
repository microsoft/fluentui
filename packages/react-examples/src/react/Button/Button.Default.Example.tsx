import * as React from 'react';
import { Stack, IStackTokens, SpinButton } from '@fluentui/react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { MergeStylesProvider_unstable, useAdoptedStylesheet_unstable } from '@fluentui/utilities';
// import { createProxy as _createProxy, default as _root } from 'react-shadow';
// eslint-disable-next-line
import root from 'react-shadow';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}
// type CreateProxyRenderFn = ({ children }: { children: React.ReactNode; root: ShadowRoot }) => React.ReactNode;
// type CreateProxyFn = (target: unknown, id: string, render: CreateProxyRenderFn) => typeof _root;

// const createProxy: CreateProxyFn = _createProxy;

// const FluentWrapper: React.FC<{ children: React.ReactNode; root: ShadowRoot }> = ({ children, root }) => {
//   // I think we'll need to implement something here to allow mergeStyles
//   // to add styles to the shadowRoot.

//   return <>{children}</>;
// };

// export const root = createProxy({}, 'fluentui-v8', ({ children, root }) => (
//   <FluentWrapper root={root}>{children}</FluentWrapper>
// ));

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 40 };

const Hmmm = props => {
  useAdoptedStylesheet_unstable('Hmmm');
  return <div {...props} />;
};

export const ButtonDefaultExample: React.FunctionComponent<IButtonExampleProps> = props => {
  const { disabled, checked } = props;
  const [shadowRootEl, setShadowRootEl] = React.useState<HTMLElement | null>(null);

  const setter = val => {
    setShadowRootEl(val);
  };

  return (
    <root.div className="shadow-root" delegatesFocus ref={setter}>
      <MergeStylesProvider_unstable shadowRoot={shadowRootEl?.shadowRoot}>
        <Stack horizontal tokens={stackTokens}>
          <DefaultButton
            text="Standard"
            onClick={_alertClicked}
            allowDisabledFocus
            disabled={disabled}
            checked={checked}
          />
          <PrimaryButton
            text="Primary"
            onClick={_alertClicked}
            allowDisabledFocus
            disabled={disabled}
            checked={checked}
          />
          <Hmmm>Hmmm</Hmmm>
          <SpinButton />
        </Stack>
      </MergeStylesProvider_unstable>
    </root.div>
  );
};

function _alertClicked(): void {
  alert('Clicked');
}
