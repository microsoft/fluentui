import { ISetupBannerStyles } from './SetupBanner.types';

export const getStyles = (): ISetupBannerStyles => {
  return {
    root: {
      display: 'flex',
      height: '296px',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    visualizationPartition: {
      display: 'flex',
      minWidth: '400px',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    },
    textPartition: {
      display: 'flex',
      minWidth: '400px',
      flexDirection: 'column',
      flex: 1
    },
    headerSection: {
      display: 'flex',
      fontWeight: 'bold',
      fontSize: '42px',
      lineHeight: '51px'
    },
    bodySection: {
      display: 'flex',
      flex: '1 1 0%',
      paddingBottom: '16px',
      alignItems: 'center'
    },
    actionButton: {
      marginRight: '32px'
    },
    actionLink: {
      marginRight: '32px',
      top: '7px',
      fontSize: '14px !important'
    }
  };
};
