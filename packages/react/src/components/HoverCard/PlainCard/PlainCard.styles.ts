import { getGlobalClassNames, HighContrastSelector } from '../../../Styling';
import type { IPlainCardStyles, IPlainCardStyleProps } from './PlainCard.types';

const GlobalClassNames = {
  root: 'ms-PlainCard-root',
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
          [HighContrastSelector]: {
            border: '1px solid WindowText',
          },
        },
      },
      className,
    ],
  };
}
