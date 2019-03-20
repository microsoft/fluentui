import { IOverlayStyleProps, IOverlayStyles } from 'office-ui-fabric-react/lib/Overlay';
import { CommonSemanticColors } from '../AzureColors';

export const OverlayStyles = (props: IOverlayStyleProps): Partial<IOverlayStyles> => {
  const { isDark } = props;
  return {
    root: [
      {
        backgroundColor: CommonSemanticColors.overlay.light
      },
      isDark && {
        backgroundColor: CommonSemanticColors.overlay.dark
      }
    ]
  };
};
