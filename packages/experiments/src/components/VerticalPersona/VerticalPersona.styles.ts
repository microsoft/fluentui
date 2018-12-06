import { IVerticalPersonaComponent } from './VerticalPersona.types';
import { processVariables } from '../../utilities/VariableProcessing';

export const VerticalPersonaStyles: IVerticalPersonaComponent['styles'] = props => {
  const { theme } = props;

  const variables = processVariables(
    {
      text: {
        height: '35px',
        fontFamily: 'SegoeUI',
        width: '106px'
      },
      primaryText: {
        paddingTop: '8px',
        fontSize: '14px',
        fontWeight: 600
      },
      secondaryText: {
        paddingTop: '12px',
        fontSize: '12px'
      }
    },
    props.styleVariables
  );

  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '122px'
    },
    text: {
      paddingTop: variables.primaryText.paddingTop,
      width: variables.text.width,
      height: variables.text.height,
      fontFamily: variables.text.fontFamily,
      fontSize: variables.primaryText.fontSize,
      fontWeight: variables.primaryText.fontWeight,
      color: theme.palette.neutralPrimary
    },
    secondaryText: {
      paddingTop: variables.secondaryText.paddingTop,
      width: variables.text.width,
      height: variables.text.height,
      fontFamily: variables.text.fontFamily,
      fontSize: variables.secondaryText.fontSize,
      lineHeight: '1.42',
      textAlign: 'center',
      color: theme.palette.neutralSecondary
    }
  };
};
