import * as React from 'react';
import { DefaultButton, PrimaryButton, Stack, IStackTokens } from 'office-ui-fabric-react';
import { mergeCss } from '@uifabric/merge-styles';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 40 };

const getButtonStyles = () => {
  return {
    primaryText: mergeCss({ fontSize: '16px', fontWeight: 600, display: 'block' }),
    secondaryText: mergeCss({ fontSize: '12px', display: 'block' }),
    root: mergeCss({ backgroundColor: 'yellow' })
  };
};

const borderClassName = mergeCss({ border: '10px solid red' });

export const ButtonDefaultExample: React.FunctionComponent<IButtonExampleProps> = props => {
  const { disabled, checked } = props;
  const buttonStyles = getButtonStyles();

  return (
    <Stack horizontal tokens={stackTokens}>
      <BaseButton
        className={borderClassName}
        slots={{ primaryText: ButtonText, secondaryText: ButtonText }}
        slotProps={{
          primaryText: {
            className: buttonStyles.primaryText
          },
          secondaryText: {
            className: buttonStyles.secondaryText
          },
          root: {
            className: buttonStyles.root
          }
        }}
        // tslint:disable-next-line:jsx-no-lambda
        onClick={() => console.log('clicked button')}
      />
      <DefaultButton text="Standard" onClick={_alertClicked} allowDisabledFocus disabled={disabled} checked={checked} />
      <PrimaryButton text="Primary" onClick={_alertClicked} allowDisabledFocus disabled={disabled} checked={checked} />
    </Stack>
  );
};

function _alertClicked(): void {
  alert('Clicked');
}

/**
 * issues:
 * 1) do we really need slots prop
 */
interface IBaseButtonProps extends React.AllHTMLAttributes<any> {
  slots?: any;
  slotProps?: any;
}

const ButtonText: React.FunctionComponent<any> = props => <span {...props}>my button</span>;

const BaseButton: React.FunctionComponent<IBaseButtonProps> = props => {
  const { slots, children, slotProps, ...rest } = props;
  const { root: Root = 'button', icon: Icon, primaryText: PrimaryText, secondaryText: SecondaryText } = slots;
  const { root = {}, icon = {}, primaryText = {}, secondaryText = {} } = slotProps;

  const rootClassName = `${root.className || ''}${` ${rest.className}` || ''}`;
  const content = children ? (
    children
  ) : (
    <>
      {Icon && <Icon {...icon} />}
      {PrimaryText && <PrimaryText {...primaryText} />}
      {SecondaryText && <SecondaryText {...secondaryText} />}
    </>
  );

  return (
    <Root {...root} {...rest} className={rootClassName}>
      {content}
    </Root>
  );
};
