
import {
  ITheme,
  mergeStyles
} from '../../Styling';
import { IFabricStyleProps, IFabricStyles } from './Fabric.types';

const inheritFont = { fontFamily: 'inherit' };

export interface IFabricClassNames {
  root: string;
}

export const getStyles = (props: IFabricStyleProps): IFabricStyles => {
  const {
    theme,
    className,
  } = props;

  return {
    root: [
      'ms-Fabric',
      theme.fonts.medium,
      {
        color: theme.palette.neutralPrimary,
        selectors: {
          '& button': inheritFont,
          '& input': inheritFont,
          '& textarea': inheritFont,
          ':global(button)': {
            overflow: 'visible'
          }
        }
      },
      className
    ]
  };
};
