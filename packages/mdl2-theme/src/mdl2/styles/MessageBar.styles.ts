import { IMessageBarStyles, IMessageBarStyleProps } from 'office-ui-fabric-react/lib/MessageBar';

export const MessageBarStyles = (props: IMessageBarStyleProps): Partial<IMessageBarStyles> => {
  return {
    actions: {
      margin: '8px 12px 8px 8px'
    },
    dismissSingleLine: {
      display: 'flex',
      alignItems: props.truncated ? 'flex-start' : 'center',
      marginRight: 8
    }
  };
};
