import { FontSizes, FontWeights, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { IStyle } from '@uifabric/styling';

interface IModalExampleStyles {
  msModalContainer: IStyle;
  msStickyContainer: IStyle;
  msModalHeader: IStyle;
  msModalBody: IStyle;
}

const modalExampleStyle: IModalExampleStyles = {
  msModalContainer: {
    height: '80vh',
    width: '80vw',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch'
  },
  msStickyContainer: {
    width: '80vw',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch'
  },
  msModalHeader: {
    flex: '1 1 auto',
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    display: 'flex',
    alignItems: 'center',
    fontSize: FontSizes.xLargePlus,
    fontWeight: FontWeights.semibold,
    padding: '0 28px',
    minHeight: '40px'
  },
  msModalBody: {
    flex: '4 4 auto',
    padding: '5px 28px',
    overflowY: 'hidden'
  }
};

export { modalExampleStyle, IModalExampleStyles };
