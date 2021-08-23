import { CommonSemanticColors } from '../AzureColors';
import type { IOverlayStyleProps, IOverlayStyles } from '@fluentui/react/lib/Overlay';

export const OverlayStyles = (props: IOverlayStyleProps): Partial<IOverlayStyles> => {
  const { isDark } = props;
  return {
    root: [
      {
        backgroundColor: CommonSemanticColors.overlay.light,
      },
      isDark && {
        backgroundColor: CommonSemanticColors.overlay.dark,
      },
    ],
  };
};
