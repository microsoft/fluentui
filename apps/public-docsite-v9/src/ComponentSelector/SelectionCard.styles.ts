import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  main: {
    gap: '16px',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '5px 10px 10px 5px',
  },

  card: {
    width: '250px',
    maxWidth: '100%',
    height: 'fit-content',
    minHeight: '196px',
  },

  caption: {
    color: tokens.colorNeutralForeground3,
  },

  cardImage: {
    borderRadius: tokens.borderRadiusXLarge,
    border: '1px solid var(--colorNeutralStroke1, #e1dfdd)',
    filter: 'grayscale(100%) brightness(95%)',
    opacity: 0.5,

    '&:hover': {
      filter: 'grayscale(0%) brightness(100%)',
      opacity: 1,
    },
  },
  cardImageSelected: {
    borderRadius: tokens.borderRadiusXLarge,
    border: '1px solid var(--colorNeutralStroke1, #e1dfdd)',
    filter: 'grayscale(0%) brightness(100%)',
    opacity: 1,
  },

  grayBackground: {
    padding: '0 15px 15px',
  },
});
