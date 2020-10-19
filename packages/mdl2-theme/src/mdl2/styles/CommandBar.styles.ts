import { ICommandBarStyleProps, ICommandBarStyles } from '@fluentui/react/lib/CommandBar';

export const CommandBarStyles = (props: ICommandBarStyleProps): Partial<ICommandBarStyles> => {
  const { theme } = props;

  return {
    root: [
      {
        height: 40,
        padding: '0 16px',
        backgroundColor: theme.palette.neutralLighter,
      },
    ],
  };
};
