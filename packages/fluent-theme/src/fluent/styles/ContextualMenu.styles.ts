import { IContextualMenuStyleProps } from 'office-ui-fabric-react/lib/ContextualMenu';
import { fluentBorderRadius } from './styleConstants';
import { Depths } from '../FluentDepths';

export const ContextualMenuStyles = (props: IContextualMenuStyleProps) => {
  // const { theme } = props;
  // const { palette } = theme;

  return {
    subComponentStyles: {
      callout: {
        root: {
          border: 'none',
          borderRadius: fluentBorderRadius,
          boxShadow: Depths.depth8,
          selectors: {
            ['.ms-Callout-main']: { borderRadius: fluentBorderRadius }
          }
        },
        beakCurtain: { borderRadius: fluentBorderRadius }
      },
      menuItem: {
        item: {
          color: 'blue'
        }
      }
    }
  };
};

// list: {
//   selectors: {
//     'li': {
//       color: 'red'
//     }
//   }
// }
