import { ICalloutContentStyleProps, ICalloutContentStyles } from '@fluentui/react/lib/Callout';

export const CalloutContentStyles = (props: ICalloutContentStyleProps): Partial<ICalloutContentStyles> => {
  const { theme } = props;
  const { palette } = theme;

  return {
    root: {
      border: `1px solid ${palette.neutralLight}`,
    },
  };
};
