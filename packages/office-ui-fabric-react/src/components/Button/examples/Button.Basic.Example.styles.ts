import { IStyle } from '../../../Styling';

export interface IButtonBasicExampleStyleProps {
  /**
   * 404 No Style Props Found
   */
}

export interface IButtonBasicExampleStyles {
  example?: IStyle;
  twoup?: IStyle;
}

export function getStyles(props: IButtonBasicExampleStyleProps): IButtonBasicExampleStyles {
  return ({
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
  });
}
