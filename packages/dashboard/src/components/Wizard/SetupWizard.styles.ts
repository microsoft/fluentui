import { ISetupWizardStyles } from './SetupWizard.types';
import { DefaultFontStyles } from 'office-ui-fabric-react/lib/Styling';

const regularFontSize = 14;
const regularLineHeight = 20;
const fontWeight = DefaultFontStyles.smallPlus.fontWeight;
const commonFontFamily = DefaultFontStyles.medium.fontFamily;
const subwayNavBaseColor = '#333333';

export const getSetupWizardStyles = (): ISetupWizardStyles => {
  return {
    wizardContainer: {
      fontSize: regularFontSize,
      lineHeight: regularLineHeight,
      fontWeight: fontWeight,
      fontFamily: commonFontFamily,
      color: subwayNavBaseColor,
      display: 'flex',
      flexDirection: 'column'
    },
    titleSection: {
      border: '1px solid #E1DFDD',
      height: '75px',
      padding: '30px'
    }
  };
};
