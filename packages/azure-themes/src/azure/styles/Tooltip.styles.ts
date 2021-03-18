import { ITooltipStyles, ITooltipStyleProps } from 'office-ui-fabric-react';

export const TooltipStyles = (props: ITooltipStyleProps): Partial<ITooltipStyles> => {
  return {
    root: {
      maxWidth: '480px',
    },
  };
};
