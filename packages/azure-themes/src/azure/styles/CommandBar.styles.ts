import { ICommandBarStyleProps, ICommandBarStyles } from 'office-ui-fabric-react/lib/CommandBar';

export const CommandBarStyles = (props: ICommandBarStyleProps): Partial<ICommandBarStyles> => {
  const { theme } = props;
  const { semanticColors } = theme;

  return {
    root: [
      {
        backgroundColor: semanticColors.bodyBackground,
        height: '36px',
        padding: 0,
      },
    ],
  };
};
