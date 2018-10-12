import { getGlobalClassNames, HighContrastSelector } from '../../../Styling';
import { IPlainCardStyles, IPlainCardStyleProps } from './PlainCard.types';

const GlobalClassNames = {
  root: 'ms-PlainCard-root'
};

export function getStyles(props: IPlainCardStyleProps): IPlainCardStyles {
  const { theme, className } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        pointerEvents: 'auto',
        selectors: {
          '.ms-Callout': {
            boxShadow: '0 0 20px rgba(0, 0, 0, .2)',
            border: 'none',
            selectors: {
              [HighContrastSelector]: {
                border: '1px solid WindowText'
              }
            }
          }
        }
      },
      className
    ]
  };
}
