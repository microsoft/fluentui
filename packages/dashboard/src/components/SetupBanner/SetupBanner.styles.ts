import { ISetupBannerStyles } from './SetupBanner.types';

export const getStyles = (rtl: boolean): ISetupBannerStyles => {
  return {
    root: {
      display: 'flex',
      height: '296px',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    visualizationPartition: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      paddingLeft: rtl ? '10px' : undefined,
      paddingRight: rtl ? undefined : '10px',
      selectors: {
        '@media(max-width: 1000px)': [
          {
            display: 'none'
          }
        ]
      }
    },
    visualizationShimmer: {
      paddingTop: '20px',
      width: '70%',
      margin: 'auto'
    },
    textPartition: {
      display: 'flex',
      minWidth: '240px',
      flexDirection: 'column',
      flex: 1
    },
    headerSection: {
      display: 'flex',
      fontWeight: 'bold',
      fontSize: '42px',
      lineHeight: '51px',
      selectors: {
        '@media(max-width: 1200px)': [
          {
            fontSize: '28px',
            lineHeight: '34px'
          }
        ]
      }
    },
    headerShimmer: {
      width: '75%'
    },
    bodySection: {
      display: 'flex',
      flex: '1 1 0%',
      paddingBottom: '16px',
      alignItems: 'center'
    },
    bodyShimmer: {
      width: '100%'
    },
    actionSection: {
      display: 'flex',
      alignItems: 'center',
      selectors: {
        '&>:nth-child(1n)': {
          marginRight: '32px'
        }
      }
    }
  };
};
