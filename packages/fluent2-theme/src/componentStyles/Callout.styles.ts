import type { ICalloutContentStyleProps, ICalloutContentStyles, IStyleFunctionOrObject } from '@fluentui/react';

export function getCalloutContentStyles(
  props: ICalloutContentStyleProps,
): IStyleFunctionOrObject<ICalloutContentStyleProps, ICalloutContentStyles> {
  const { theme } = props;
  const { effects } = theme;

  const styles: Partial<ICalloutContentStyles> = {
    root: {
      borderRadius: effects.roundedCorner4,
    },
    calloutMain: {
      borderRadius: effects.roundedCorner4,
    },
    beakCurtain: {
      borderRadius: effects.roundedCorner4,
    },
  };

  return styles;
}
