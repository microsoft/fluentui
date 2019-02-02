import { ICardComponent, ICardStylesReturnType, ICardTokenReturnType } from './Card.types';
import { getGlobalClassNames } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-Card',
  stack: 'ms-Card-stack'
};

const baseTokens: ICardComponent['tokens'] = {
  textColor: 'blue'
};

const warningTokens: ICardComponent['tokens'] = {
  textColor: 'red'
};

export const CardTokens: ICardComponent['tokens'] = (props, theme): ICardTokenReturnType => [baseTokens, warningTokens];

export const CardStyles: ICardComponent['styles'] = (props, theme, tokens): ICardStylesReturnType => {
  const { compact } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        borderColor: 'lightgray',
        borderWidth: '1px',
        borderStyle: 'solid',
        boxShadow: '1px 2px lightgray',
        padding: '12px',
        height: '350px',
        width: '250px'
      }
    ],

    stack: [
      classNames.stack,
      {
        selectors: {
          '> *': {
            height: 'auto',
            textOverflow: 'ellipsis'
          },

          '> *:not(:first-child)': [
            compact && {
              marginLeft: '12px'
            },
            !compact && {
              marginTop: '12px'
            }
          ]
        }
      }
    ]
  };
};
