import { IPanelStyleProps, IPanelStyles } from 'office-ui-fabric-react/lib/Panel';
import { Depths } from '../FluentDepths';
import { FontSizes } from '../FluentType';
import { FontWeights } from 'office-ui-fabric-react/lib/Styling';

export const PanelStyles = (props: IPanelStyleProps): Partial<IPanelStyles> => {
  return {
    main: {
      selectors: {
        // increasing the specificity to override all the media queries in the default styles
        '.ms-Panel &': {
          boxShadow: Depths.depth64,
          border: 'none'
        }
      }
    },
    header: {
      selectors: {
        // increasing the specificity to override all the media queries in the default styles
        '.ms-Panel-contentInner &': {
          marginTop: 0
        }
      }
    },
    headerText: {
      fontSize: FontSizes.size20,
      fontWeight: FontWeights.semibold,
      lineHeight: '27px'
    },
    footerInner: {
      paddingBottom: 16,
      paddingTop: 16
    },
    closeButton: {
      width: 32,
      height: 32,
      margin: '10px 5px 0 0', // 5px right taking into account the 5px padding coming from the wrapper.
      selectors: {
        '.ms-Button-icon': {
          fontSize: FontSizes.size12
        }
      }
    }
  };
};
