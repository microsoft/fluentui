import { IOverlayStyleProps, IOverlayStyles } from 'office-ui-fabric-react/lib/Overlay';
import { BaseColors } from '../AzureColors';

export const OverlayStyles = (props: IOverlayStyleProps): Partial<IOverlayStyles> => {
  const { isDark } = props;
  return {
    root: [
      {
        backgroundColor: BaseColors.OVERLAY_LIGHT
      },
      isDark && {
        backgroundColor: BaseColors.OVERLAY_DARK
      }
    ]
  };
};
