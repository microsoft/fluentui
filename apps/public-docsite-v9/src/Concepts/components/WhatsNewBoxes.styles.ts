import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useWhatsNewStyles = makeStyles({
  title: {
    marginBottom: '32px',
    marginTop: '0',
    display: 'block',
  },
  wrapper: {
    display: 'flex',
    '@media (max-width: 460px)': {
      flexDirection: 'column',
    },
  },
  whatsNew: {
    marginRight: '40px',
    '@media (max-width: 900px)': {
      marginRight: '20px',
    },
    '@media (max-width: 460px)': {
      marginRight: 0,
      marginBottom: '40px',
    },
    flexBasis: '100%',
    ':last-child': {
      marginRight: 0,
      marginBottom: 0,
    },
  },
  box: {
    ...shorthands.borderRadius('16px'),
    marginBottom: '16px',
    backgroundColor: tokens.colorNeutralBackground3,
  },
  image: {
    width: '100%',
    height: 'auto',
  },
});
