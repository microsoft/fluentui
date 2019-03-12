import { getFocusStyle } from '../../../Styling';
import { ISplitMenuButtonComponent, ISplitMenuButtonStylesReturnType, ISplitMenuButtonTokenReturnType } from './SplitMenuButton.types';

const baseTokens: ISplitMenuButtonComponent['tokens'] = (props, theme): ISplitMenuButtonTokenReturnType => {
  return {
    contentPadding: '8px 0px 8px 10px'
  };
};

export const SplitMenuButtonTokens: ISplitMenuButtonComponent['tokens'] = (props, theme): ISplitMenuButtonTokenReturnType => [baseTokens];

export const SplitMenuButtonStyles: ISplitMenuButtonComponent['styles'] = (props, theme, tokens): ISplitMenuButtonStylesReturnType => {
  return {
    root: [getFocusStyle(theme)],
    button: {
      selectors: {
        '> *': {
          padding: tokens.contentPadding
        }
      }
    },
    splitDivider: {
      borderColor: tokens.color,
      borderRight: '1px solid',
      boxSizing: 'border-box',
      height: '100%',
      padding: '8px 0px',
      width: 1
    }
  };
};
