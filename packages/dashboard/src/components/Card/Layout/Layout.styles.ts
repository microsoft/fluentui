import { ILayoutProps, ILayoutStyles } from './Layout.types';
import { CardSize } from '../Card.types';

export const getStyles = (props: ILayoutProps): ILayoutStyles => {
  const { cardSize, header } = props;
  const isMediumTall: boolean = cardSize === CardSize.mediumTall;
  const isSmall: boolean = cardSize === CardSize.small;
  const isHeaderPresent: boolean = header !== undefined;
  return {
    root: {
      width: '100%',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    },
    contentLayout: {
      display: 'flex',
      flex: 1,
      flexDirection: isMediumTall ? 'column' : 'row'
    },
    contentAreaLayout: {
      display: 'flex',
      marginTop: isHeaderPresent ? '30px' : '32px',
      overflow: 'hidden',
      flex: 1
    },
    contentArea1: {
      margin: isSmall ? '0px' : isMediumTall ? '0 0px 13px 0' : '0 12px 16px 0',
      flex: isMediumTall ? '0 1 auto' : 1,
      flexDirection: 'column',
      overflow: 'hidden'
    },
    dataVizLastUpdatedOn: {
      fontSize: '10px',
      opacity: 0.6,
      paddingBottom: '9px',
      fontWeight: 600
    },
    contentArea2: {
      margin: isMediumTall ? '13px 0px 16px 0' : '0px 0px 16px 12px',
      flex: isMediumTall ? '0 1 auto' : 1
    },
    footer: {
      width: '100%',
      minHeight: '32px'
    }
  };
};
