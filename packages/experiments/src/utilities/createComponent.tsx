import * as React from 'react';
import { mergeStyleSets, getTheme } from 'office-ui-fabric-react';

export type IStyleFunction<TStylesProps, TStyles> = (props: TStylesProps) => Partial<TStyles>;

export type TStateProps<TProps> = TProps & { view: (props: TProps) => JSX.Element };
export type TStylesProp<TProps, TStyles> = IStyleFunction<TProps, TStyles> | Partial<TStyles>;
export type TViewProps<TProps, TStyles> = TProps & { styles: { [key in keyof TStyles]: string } };

export interface IAugmentations<TUserProps, TStyles> {
  [scope: string]: IComponentOptions<TUserProps, TStyles>;
}

// TODO: if merged, figure out typing. could maybe provide a template accessor to prevent 'any' type arg
// tslint:disable-next-line:no-any
const _augmentations: IAugmentations<any, any> = {};

// TODO: which of these options do we really want to be optional? view? styles?
export interface IComponentOptions<TUserProps, TStyles> {
  scope: string;
  state?: React.ComponentType<TStateProps<TUserProps>>;
  styles?: TStylesProp<TUserProps, TStyles>;
  view: React.ComponentType<TViewProps<TUserProps, TStyles>>;
}

// Helper function to tie them together.
export function createComponent<TProps, TStyles>(
  options: IComponentOptions<TProps, TStyles>
): React.StatelessComponent<TProps> {
  const result: React.StatelessComponent<TProps> = (userProps: TProps) => {
    const augmented: IComponentOptions<TProps, TStyles> = _augmentations[options.scope] || {};
    const StateComponent = augmented.state || options.state;
    const ViewComponent = augmented.view || options.view;
    // TODO: fix typing
    // tslint:disable-next-line:no-any
    const getStyles: any = augmented.styles || options.styles;
    const theme = getTheme();

    ViewComponent.displayName = ViewComponent.displayName || options.scope + 'View';
    const content = (processedProps: TProps) => {
      let styles: TStyles | undefined = undefined;

      // TODO: use TypeScript type guards
      switch (typeof getStyles) {
        case 'function':
          styles = getStyles({ theme, ...(processedProps as {}) });
          break;
        case 'object':
          styles = getStyles;
          break;
        default:
          // TODO: do something here?
          break;
      }

      return <ViewComponent {...processedProps} styles={mergeStyleSets<keyof TStyles>(styles)} />;
    };

    return !!StateComponent ? <StateComponent {...userProps} view={content} /> : content(userProps);
  };

  result.displayName = options.scope;

  return result;
}

// Helper function to augment existing components that have been created.
export function augmentComponent<TProps, TStyles>(options: IComponentOptions<TProps, TStyles>): void {
  _augmentations[options.scope] = {
    ..._augmentations[options.scope],
    ...options
  };
}
