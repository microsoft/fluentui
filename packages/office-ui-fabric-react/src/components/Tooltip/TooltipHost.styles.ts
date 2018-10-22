import { ITooltipHostStyleProps, ITooltipHostStyles } from './TooltipHost.types';
import { getGlobalClassNames } from '../../Styling';

const GlobalClassNames = {
  host: 'ms-TooltipHost'
};

export const getStyles = (props: ITooltipHostStyleProps): ITooltipHostStyles => {
  const { className, theme } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    host: [
      classNames.host,
      {
        display: 'inline'
      },
      className
    ]
  };
};
