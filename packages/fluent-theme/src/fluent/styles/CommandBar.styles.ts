import { ICommandBarStyleProps, ICommandBarStyles } from 'office-ui-fabric-react/lib/CommandBar';

export const CommandBarStyles = (props: ICommandBarStyleProps): Partial<ICommandBarStyles> => {
  return {
    root: [
      {
        height: 44,
        padding: '0 14px 0 24px'
      }
    ]
  };
};
