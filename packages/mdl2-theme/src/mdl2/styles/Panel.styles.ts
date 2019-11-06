import { IPanelStyleProps, IPanelStyles } from 'office-ui-fabric-react/lib/Panel';

export const PanelStyles = (props: IPanelStyleProps): Partial<IPanelStyles> => {
  const { theme } = props;
  const { fonts } = theme;

  return {
    main: {
      boxShadow: '0px 0px 30px 0px rgba(0,0,0,0.2)'
    },
    headerText: [
      fonts.xLarge,
      {
        lineHeight: '27px'
      }
    ],
    footerInner: {
      paddingBottom: 20,
      paddingTop: 20
    }
  };
};
