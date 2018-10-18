import { IButtonComponent } from './Button.types';
import { getFocusStyle, getGlobalClassNames, concatStyleSets } from '../../Styling';
import { memoizeFunction } from '../../Utilities';
import { getComponentStyles, ILayer, IThemeCore, getStatesForLayer, IPartialComponentStyle } from '@uifabric/theming-core';

const GlobalClassNames = {
  icon: 'ms-Icon'
};

const constButtonStyles: ILayer = {
  fontVariant: 'standard',
  padding: 0,
  display: 'inline-block',
  justifyContent: 'center',
  boxSizing: 'border-box',
  borderStyle: 'solid',
  userSelect: 'none',
  textDecoration: 'none',
  textAlign: 'center',
  verticalAlign: 'baseline',
  overflow: 'hidden',
  lineHeight: '1',
  slots: {
    icon: {
      parent: 'iconBase',
      display: 'flex'
    },
    stack: {
      height: '100%',
      padding: '8px 16px'
    },
    text: {
      overflow: 'visible'
    }
  }
};

const getBaseStyles = memoizeFunction(
  (theme: IThemeCore, states: string | undefined, layerName: string, disabled: boolean, iconClass: string): object => {
    return getComponentStyles(theme, {
      layer: layerName,
      constLayer: constButtonStyles,
      states,
      selectors: !disabled,
      slots: { icon: iconClass }
    });
  }
);

export const getButtonStyles: IButtonComponent['styles'] = props => {
  const { theme, className, circular, disabled } = props;

  const layerName = circular ? 'CircularButton' : 'Button';
  const states = getStatesForLayer(props);
  const globalClassNames = getGlobalClassNames(GlobalClassNames, theme, true);

  // now get the memoized styles
  const baseStyle = getBaseStyles(theme, states, layerName, !!disabled, globalClassNames.icon || '');

  const propsLayer = props.styleVariables;
  const propsStyle =
    propsLayer &&
    getComponentStyles(theme, {
      constLayer: propsLayer,
      selectors: !disabled,
      slots: { icon: globalClassNames.icon },
      style: baseStyle as IPartialComponentStyle
    });

  // Styles!
  const styleSets = concatStyleSets(
    {
      root: getFocusStyle(theme)
    },
    baseStyle,
    propsStyle,
    {
      root: className,
      icon: globalClassNames.icon
    }
  );
  return styleSets;
};
