import { getGlobalClassNames, HighContrastSelector } from '../../../Styling';
import { IBasicCardStyles, IBasicCardStyleProps } from './BasicCard.types';

const GlobalClassNames = {
  root: 'ms-BasicCard-root',
  contentWrapper: 'ms-BasicCard-content'
};

export function getStyles(props: IBasicCardStyleProps): IBasicCardStyles {
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
      }
    ],
    contentWrapper: [classNames.contentWrapper, className]
  };
}
