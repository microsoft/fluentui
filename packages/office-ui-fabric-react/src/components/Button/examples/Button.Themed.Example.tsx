import * as React from 'react';
import { mergeCss } from '@uifabric/merge-styles';
import { BaseButton, ButtonText } from './BaseButton';

const getButtonStyles = () => {
  return {
    primaryText: mergeCss({ fontSize: '16px', fontWeight: 600, display: 'block' }),
    secondaryText: mergeCss({ fontSize: '12px', display: 'block' }),
    root: mergeCss({ backgroundColor: 'yellow' })
  };
};

const borderClassName = mergeCss({ border: '10px solid red' });

export const ButtonThemedExample: React.FunctionComponent<{}> = props => {
  const onClick = React.useCallback(() => console.log('clicked button'), []);
  const buttonStyles = getButtonStyles();

  return (
    <div>
      <div>
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
          onClick={onClick}
        />
      </div>
    </div>
  );
};
