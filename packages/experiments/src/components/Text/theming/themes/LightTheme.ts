import { DefaultSwatches as swatches } from './DefaultSwatches';
import { DefaultTypography as typography } from './DefaultTypography';
import { ITheme } from '../ITheme';

export const LightTheme: ITheme = {
  swatches,
  typography,

  schemes: {
    default: {
      background: 'white',
      text: 'black',
      link: 'themePrimary',
      linkVisited: 'themePrimary'
    },

    primary: {
      background: 'themePrimary',
      text: 'white',
      link: 'white',
      linkVisited: 'white'
    },

    neutral: {
      background: 'neutralTertiaryAlt',
      text: 'black',
      link: 'white',
      linkVisited: 'white'
    }
  }
};

export default LightTheme;
