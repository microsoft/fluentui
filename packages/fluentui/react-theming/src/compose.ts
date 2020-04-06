import { useTheme } from './themeContext';
import { resolveTokens } from './resolveTokens';
import jss from 'jss';
import { ITheme } from './theme.types';

type Options = ComposeOptions[];
type SlotsAssignment = any;

interface ComposeOptions {
  name?: string;
  slots?: any;
  tokens?: any;
  styles?: any;
}

export interface Composeable {
  classes?: any;
  slots?: any;
}

/** Defines a helper type for components using forwardRef. */
export type ForwardRefComponent<TProps, TElement> = React.FunctionComponent<TProps & React.RefAttributes<TElement>>;

interface ComposedFunctionComponent<TProps> extends React.FunctionComponent<TProps> {
  __optionsSet?: ComposeOptions[];
  __directRender?: React.FunctionComponent<TProps>;

  // Needed for components using forwardRef (See https://github.com/facebook/react/issues/12453).
  render?: React.FunctionComponent<TProps>;
}

/**
 * _composeFactory returns a compose function.
 * This allows tests to override aspects of compose.
 *
 * @internal
 */
export const _composeFactory = (useThemeHook: any = useTheme) => {
  const composeInstance = <TProps extends Composeable = {}>(
    baseComponent: ComposedFunctionComponent<TProps>,
    options: ComposeOptions = {},
  ) => {
    const classNamesCache = new WeakMap();
    const optionsSet = _mergeOptions(options, baseComponent.__optionsSet);

    const componentName = options.name || baseComponent.displayName;

    const renderFn = baseComponent.__directRender || baseComponent.render || baseComponent;
    const Component: ComposedFunctionComponent<TProps> = (props: TProps) => {
      const theme: ITheme = useThemeHook();
      const slots = resolveSlots(componentName, optionsSet, theme);

      if (!theme) {
        throw new Error(
          'No theme specified. Plese provide a ThemeProvider. See aka.ms/react-theming for more details.',
        );
      }

      return renderFn({
        ...props,
        classes: _getClasses(componentName, theme, classNamesCache, optionsSet),
        slots,
      });
    };

    for (const slotName in options.slots) {
      (Component as any)[slotName] = options.slots[slotName];
    }

    Component.propTypes = baseComponent.propTypes;

    Component.__optionsSet = optionsSet;
    Component.__directRender = renderFn;

    Component.displayName = options.name || 'ComposedComponent';

    return Component as React.FunctionComponent<TProps>;
  };

  const resolveSlots = (name: string | undefined, optionsSet: Options, theme: any): SlotsAssignment => {
    const result = {};
    if (optionsSet && optionsSet.length > 0) {
      optionsSet.forEach(os => {
        if (os.slots) {
          Object.keys(os.slots).forEach(k => {
            (result as any)[k] = os.slots[k];
          });
        }
      });
    }
    if (
      name &&
      theme &&
      theme.components &&
      theme.components[name] &&
      theme.components[name].slots &&
      typeof theme.components[name].slots === 'object'
    ) {
      Object.keys(theme.components[name].slots).forEach(k => {
        (result as any)[k] = theme.components[name].slots[k];
      });
    }
    return result;
  };

  composeInstance.resolveSlots = resolveSlots;

  return composeInstance;
};

/**
 * Composed allows you to create composed components, which
 * have configurable, themable state, view, and slots. Composed
 * components can be recomposed.
 * @public
 */
export const compose = _composeFactory();

const _mergeOptions = (options: ComposeOptions, baseOptions?: Options): Options => {
  let optionsSet: Options = [options];
  if (baseOptions) {
    optionsSet = [...baseOptions, options];
  }
  return optionsSet;
};

const _getClasses = (
  name: string | undefined,
  theme: ITheme,
  classNamesCache: WeakMap<any, any>,
  optionsSet: any[],
) => {
  let classes = classNamesCache.get(theme);

  if (!classes) {
    const tokens = resolveTokens(
      name,
      theme,
      optionsSet.map(o => o.tokens || {}),
    );
    let styles: any = {};

    optionsSet.forEach((options: any) => {
      if (options && options.styles) {
        if (typeof options.styles === 'function') {
          styles = { ...styles, ...options.styles(tokens) };
        } else {
          styles = { ...styles, ...options.styles };
        }
      }
    });

    // Create a stylesheet for this permutation.
    const sheet = jss.createStyleSheet(styles, {
      classNamePrefix: `${name}-`,
    });
    sheet.update(theme);
    sheet.attach();

    classes = sheet.classes;
    classNamesCache.set(theme, classes);
  }

  return classes;
};
