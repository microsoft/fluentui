import { FontWeights, IPanelStyleProps, IPanelStyles } from 'office-ui-fabric-react';
import { FontSizes } from '../FluentType';

export const PanelStyles = (props: IPanelStyleProps): Partial<IPanelStyles> => {
  const { theme } = props;
  const { effects } = theme;

  return {
    main: {
      boxShadow: effects.elevation64
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
