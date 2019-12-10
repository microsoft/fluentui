import * as React from 'react';
import { mergeCss } from '@uifabric/merge-styles';
import { BaseButton, ButtonText } from './BaseButton';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

const getButtonStyles = () => {
  return {
    primaryText: mergeCss({ fontSize: '16px', fontWeight: 600, display: 'block' }),
    secondaryText: mergeCss({ fontSize: '12px', display: 'block' }),
    root: mergeCss({ backgroundColor: 'yellow' })
  };
};

const largeRedBorder = mergeCss({ border: '10px solid red' });
const redBackground = mergeCss({ backgroundColor: 'red' });
const whiteText = mergeCss({ color: 'white' });
const roundedCorner = mergeCss({ borderRadius: 10 });
const largeText = mergeCss({ fontSize: '250%' });

export const ButtonDefaultExample: React.FunctionComponent<IButtonExampleProps> = props => {
  const onClick = React.useCallback(() => console.log('clicked button'), []);
  const buttonStyles = getButtonStyles();

  return (
    <div>
      <div>
        <BaseButton
          className={largeRedBorder}
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
          onClick={onClick}
        />
      </div>

      <div>
        <BaseButton className={[redBackground, largeText, whiteText, roundedCorner].join(' ')} onClick={onClick}>
          Hello, World!
        </BaseButton>
      </div>
    </div>
  );
};
