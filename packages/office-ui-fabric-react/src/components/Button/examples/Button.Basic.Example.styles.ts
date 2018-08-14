import { IStyle } from '../../../Styling';

export type IButtonBasicExampleStyleProps = {};

export interface IButtonBasicExampleStyles {
  example?: IStyle;
  twoup?: IStyle;
}

export function getStyles(props: IButtonBasicExampleStyleProps): IButtonBasicExampleStyles {
  return {
    example: [
      'ms-BasicButtonsExample',
      {
        selectors: {
          '.ms-Button': {
            margin: '10px 0'
          }
        }
      }
    ],
    twoup: [
      'ms-BasicButtonsTwoUp',
      {
        display: 'flex',
        selectors: {
          '& > *': {
            flexGrow: 1
          },
          '.ms-Label': {
            marginBottom: '10px'
          }
        }
      }
    ]
  };
}
