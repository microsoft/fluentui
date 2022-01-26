import { getGlobalClassNames } from '../../Styling';
import type { IHoverCardStyles, IHoverCardStyleProps } from './HoverCard.types';

const GlobalClassNames = {
  host: 'ms-HoverCard-host',
};

export function getStyles(props: IHoverCardStyleProps): IHoverCardStyles {
  const { className, theme } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    host: [classNames.host, className],
  };
}
