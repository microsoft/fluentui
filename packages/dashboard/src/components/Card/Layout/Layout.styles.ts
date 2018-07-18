import { ILayoutProps, ILayoutStyles } from './Layout.types';
import { CardSize } from '../Card.types';

export const getStyles = (props: ILayoutProps): ILayoutStyles => {
  const { cardSize } = props;
  const isMediumTall: boolean = cardSize === CardSize.mediumTall;
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
      paddingBottom: '16px',
      overflow: 'hidden',
      flex: 1
    },
    contentArea1: {
      margin: isMediumTall ? '20px 16px 12px 0' : '20px 12px 16px 0',
      flex: isMediumTall ? 'none' : 1,
      overflow: 'hidden'
    },
    contentArea2: {
      margin: isMediumTall ? '12px 16px 16px 0' : '20px 0 16px 12px',
      flex: isMediumTall ? 'none' : 1,
      overflow: 'hidden'
    },
    footer: {
      width: '100%',
      minHeight: '32px'
    }
  };
};
