import { IPanelStyleProps, IPanelStyles } from 'office-ui-fabric-react/lib/Panel';
import { Depths } from '../FluentDepths';
import { FontSizes } from '../FluentType';
import { FontWeights } from 'office-ui-fabric-react/lib/Styling';

export const PanelStyles = (props: IPanelStyleProps): Partial<IPanelStyles> => {
  return {
    main: {
      boxShadow: Depths.depth64
    },
    headerText: {
      fontSize: FontSizes.size20,
      fontWeight: FontWeights.semibold,
      lineHeight: '27px'
    },
    footerInner: {
      paddingBottom: 16,
      paddingTop: 16
    }
  };
};
