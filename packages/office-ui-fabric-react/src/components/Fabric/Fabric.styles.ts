import { getGlobalClassNames } from '../../Styling';
import { IFabricStyleProps, IFabricStyles } from './Fabric.types';

const inheritFont = { fontFamily: 'inherit' };

const GlobalClassNames = {
  root: 'ms-Fabric'
};

export interface IFabricClassNames {
  root: string;
}

export const getStyles = (props: IFabricStyleProps): IFabricStyles => {
  const { theme, className, isFocusVisible } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      isFocusVisible && 'is-focusVisible',
      theme.fonts.medium,
      {
        color: theme.palette.neutralPrimary,
        selectors: {
          '& button': inheritFont,
          '& input': inheritFont,
          '& textarea': inheritFont,
          ':global(button)': {
            overflow: 'visible',
            margin: 0
          }
        }
      },
      className
    ]
  };
};
