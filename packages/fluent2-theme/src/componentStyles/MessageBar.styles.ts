import type { IMessageBarStyleProps, IMessageBarStyles } from '@fluentui/react';

export const fullWidthMessageBarStyle: Partial<IMessageBarStyles> = {
  root: {
    borderRadius: '0',
  },
};

export const getMessageBarStyles = (props: IMessageBarStyleProps): IMessageBarStyles => {
  const { theme } = props;
  const { effects } = theme;

  return {
    root: {
      borderRadius: effects.roundedCorner4,
    },
  };
};
