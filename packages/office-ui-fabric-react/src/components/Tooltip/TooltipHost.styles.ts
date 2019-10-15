import { ITooltipHostStyleProps, ITooltipHostStyles } from './TooltipHost.types';
import { getGlobalClassNames } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-TooltipHost',
  ariaPlaceholder: 'ms-TooltipHost-aria-placeholder'
};

export const getStyles = (props: ITooltipHostStyleProps): ITooltipHostStyles => {
  const { className, theme } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        display: 'inline'
      },
      className
    ]
  };
};
