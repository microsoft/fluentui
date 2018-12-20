import { merge } from 'office-ui-fabric-react/lib/Utilities';
import { isSingleLineText } from '../../../utilities/textHelpers';
import { IVerticalPersonaComponent, IVerticalPersonaStyleVariableTypes } from './VerticalPersona.types';

export const VerticalPersonaStyles: IVerticalPersonaComponent['styles'] = props => {
  const { theme } = props;

  const baseVariables: IVerticalPersonaStyleVariableTypes = {
    verticalPersonaWidth: 122,
    text: {
      height: 35,
      fontFamily: 'SegoeUI',
      textPaddingLeftAndRight: 8
    },
    primaryText: {
      paddingTop: '8px',
      fontSize: '14px',
      fontWeight: 600
    },
    secondaryText: {
      paddingTop: '6px',
      fontSize: '12px'
    }
  };

  const variables = props.styleVariables ? merge(baseVariables, props.styleVariables) : baseVariables;

  const textStyle = `normal normal ${variables.primaryText.fontWeight} 14px ${variables.text.fontFamily}`;
  const textPaddingInPixels = variables.text.textPaddingLeftAndRight * 2;
  const numberOfPixelsAvailableWidthToDisplayText = variables.verticalPersonaWidth - textPaddingInPixels;
  const isPrimaryTextSingleLine = isSingleLineText(numberOfPixelsAvailableWidthToDisplayText, props.text, textStyle);

  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: `${variables.verticalPersonaWidth}px`,
      padding: `0 ${variables.text.textPaddingLeftAndRight}px`,
      boxSizing: 'border-box'
    },
    primaryText: {
      paddingTop: variables.primaryText.paddingTop,
      height: variables.text.height,
      fontFamily: variables.text.fontFamily,
      fontSize: variables.primaryText.fontSize,
      fontWeight: variables.primaryText.fontWeight,
      lineHeight: isPrimaryTextSingleLine ? variables.text.height : variables.text.height / 2,
      color: theme.palette.neutralPrimary,
      textAlign: 'center',
      whiteSpace: 'initial'
    },
    secondaryText: {
      paddingTop: variables.secondaryText.paddingTop,
      height: variables.text.height,
      fontFamily: variables.text.fontFamily,
      fontSize: variables.secondaryText.fontSize,
      lineHeight: '1.42',
      textAlign: 'center',
      whiteSpace: 'initial',
      color: theme.palette.neutralSecondary
    }
  };
};
