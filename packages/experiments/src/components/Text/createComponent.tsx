import { IClassNames, IStyleFunction, mergeStyleSets } from 'office-ui-fabric-react';
import * as React from 'react';
import { ITheme } from './theming/ITheme';
import { ThemeConsumer } from './theming/ThemeProvider';

export type IStyleFunction<TProps, TStyles> = (props: TProps) => Partial<TStyles>;

export interface IPropsWithStyles<TProps, TStyles> {
  styles?: IStyleFunction<TProps, TStyles> | Partial<TStyles>;
}

// Components should accept styling.
export type IComponentProps<TProps, TStyles> = TProps & {
  styles?: IStyleFunction<IPropsWithStyles<TProps, TStyles>, TStyles> | Partial<TStyles>;
};

export type IStyleProps<TProps, TStyles> = TProps & {
  theme: ITheme;
};

// Views should accept processed classNames.
export type IViewProps<TProps, TStyles> = TProps & {
  classNames: IClassNames<TStyles>;
};

const augmentations: any = {};

export interface IComponentOptions<TProps, TStyles, TStatics> {
  displayName: string;
  state?: React.ComponentType<IComponentProps<TProps, TStyles>>;
  styles?: IStyleFunction<IStyleProps<TProps, TStyles>, TStyles> | Partial<TStyles>;
  view?: React.ComponentType<IViewProps<TProps, TStyles>>;
  statics?: TStatics;
}

function evaluateStyle<TProps, TStyles>(
  props: TProps,
  styles?: IStyleFunction<TProps, TStyles> | Partial<TStyles> | undefined
): Partial<TStyles> | undefined {
  if (typeof styles === 'function') {
    return styles(props);
  }

  return styles;
}

// Helper function to tie them together.
export function createComponent<TProps, TStyles, TStatics = {}>(
  options: IComponentOptions<TProps, TStyles, TStatics>
): React.StatelessComponent<IComponentProps<TProps, TStyles>> & TStatics {
  const result: React.StatelessComponent<TProps> = (userProps: TProps) => {
    const augmented = augmentations[options.displayName] || {};
    const ComponentState = augmented.state || options.state;
    const ComponentView = augmented.view || options.view;
    const componentStyles = augmented.styles || options.styles;

    ComponentView.displayName = ComponentView.displayName || options.displayName;

    const content = (processedProps: IComponentProps<TProps, TStyles>) => {
      const { styles } = processedProps;

      return (
        <ThemeConsumer>
          {(theme: ITheme) => {
            const styleProps = { theme, ...(processedProps as {}) };

            return ComponentView({
              ...(processedProps as {}),
              classNames: mergeStyleSets(
                evaluateStyle(styleProps, componentStyles),
                evaluateStyle(styleProps, styles as any)
              )
            });
          }}
        </ThemeConsumer>
      );
    };

    return !!ComponentState ? <ComponentState {...userProps}>{content}</ComponentState> : content(userProps);
  };

  // Assign display name.
  result.displayName = options.displayName;

  // Assign statics.
  Object.assign(result, options.statics);

  return result as React.StatelessComponent<IComponentProps<TProps, TStyles>> & TStatics;
}

// Helper function to augment existing components that have been created.
export function augmentComponent<TProps, TStyles, TStatics>(options: IComponentOptions<TProps, TStyles, TStatics>) {
  augmentations[options.displayName] = {
    ...augmentations[options.displayName],
    ...options
  };
}
