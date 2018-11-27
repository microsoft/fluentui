import { IVerticalPersonaComponent } from './VerticalPersona.types';

export const VerticalPersonaStyles: IVerticalPersonaComponent['styles'] = props => {
  const { theme } = props;

  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '122px'
    },
    text: {
      paddingTop: '8px',
      width: '106px',
      height: '35px',
      fontFamily: 'SegoeUI',
      fontSize: '14px',
      fontWeight: 600,
      color: theme.palette.neutralPrimary
    },
    secondaryText: {
      paddingTop: '12px',
      width: '106px',
      height: '34px',
      fontFamily: 'SegoeUI',
      fontSize: '12px',
      lineHeight: '1.42',
      textAlign: 'center',
      color: theme.palette.neutralSecondary
    }
  };
};
