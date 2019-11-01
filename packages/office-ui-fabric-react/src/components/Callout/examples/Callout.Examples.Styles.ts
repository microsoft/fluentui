import { FontSizes, FontWeights, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { IStyle } from '@uifabric/styling';

interface ICalloutExampleStyle {
  msCalloutExampleCallout?: IStyle;
  msCalloutExampleConfigArea?: IStyle;
  msCalloutExampleButtonArea?: IStyle;
  msCalloutCoverExampleButtonArea?: IStyle;
  msCalloutBasicExamplebButtonArea?: IStyle;
  msCalloutExampleCmdBarHost?: IStyle;
  msCalloutExampleInner?: IStyle;
  msCalloutExampleHeader?: IStyle;
  msCalloutExampleTitle?: IStyle;
  msCalloutExampleSubText?: IStyle;
  msCalloutExampleLink?: IStyle;
  msCalloutExampleActions?: IStyle;
  msCalloutExampleButton?: IStyle;
}

const calloutExampleStyle: ICalloutExampleStyle = {
  msCalloutExampleCallout: {
    maxWidth: '300px'
  },
  msCalloutExampleConfigArea: {
    minWidth: '300px',
    display: 'inline-block'
  },
  msCalloutExampleButtonArea: {
    verticalAlign: 'top',
    display: 'inline-block',
    minWidth: '130px',
    margin: '0 100px',
    textAlign: 'center',
    height: '32px'
  },
  msCalloutCoverExampleButtonArea: {
    verticalAlign: 'top',
    display: 'inline-block',
    margin: '0 100px',
    textAlign: 'center',
    minWidth: '130px'
  },

  msCalloutBasicExamplebButtonArea: {
    verticalAlign: 'top',
    display: 'inline-block',
    textAlign: 'center'
  },

  msCalloutExampleCmdBarHost: {
    width: '350px',
    padding: '10px'
  },

  msCalloutExampleInner: {
    height: '100%',
    padding: '0 24px 20px'
  },

  msCalloutExampleHeader: {
    padding: '18px 24px 12px'
  },

  msCalloutExampleTitle: {
    margin: '0',
    fontSize: FontSizes.xLarge,
    color: DefaultPalette.neutralPrimary,
    fontWeight: FontWeights.semilight
  },

  msCalloutExampleSubText: {
    margin: '0',
    fontSize: FontSizes.small,
    color: DefaultPalette.neutralPrimary,
    fontWeight: FontWeights.semilight
  },

  msCalloutExampleLink: {
    fontSize: FontSizes.medium,
    color: DefaultPalette.neutralPrimary
  },

  msCalloutExampleActions: {
    position: 'relative',
    marginTop: '20px',
    width: '100%',
    whiteSpace: 'nowrap'
  },

  msCalloutExampleButton: {
    width: '100%'
  }
};

export { calloutExampleStyle, ICalloutExampleStyle };
