import { merge } from 'office-ui-fabric-react/lib/Utilities';
import { IVerticalPersonaComponent, IVerticalPersonaStyleVariableTypes } from './VerticalPersona.types';

export const VerticalPersonaStyles: IVerticalPersonaComponent['styles'] = (props, theme) => {
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
      maxHeight: variables.text.height,
      fontFamily: variables.text.fontFamily,
      fontSize: variables.primaryText.fontSize,
      fontWeight: variables.primaryText.fontWeight,
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
