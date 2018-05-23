import * as React from 'react';
import { mergeStyleSets, getTheme } from 'office-ui-fabric-react';

export type IStyleFunction<TStylesProps, TStyles> = (
  props: TStylesProps
) => Partial<TStyles>;

// TODO: if merged, figure out typing
// tslint:disable-next-line:no-any
const _augmentations: any = {};

export interface IComponentOptions<
  TUserProps,
  TStyles,
  TViewProps = TUserProps
  > {
  scope: string;
  state?: React.ComponentType<TUserProps>;
  styles?: IStyleFunction<TViewProps, TStyles> | Partial<TStyles>;
  view?: React.ComponentType<TViewProps>;
}

// Helper function to tie them together.
export function createComponent<TProps, TStyles>(
  options: IComponentOptions<TProps, TStyles>
): React.StatelessComponent<TProps> {
  const result: React.StatelessComponent<TProps> = (userProps: TProps) => {
    const augmented = _augmentations[options.scope] || {};
    const StateComponent = augmented.state || options.state;
    const ViewComponent = augmented.view || options.view;
    const getStyles = augmented.styles || options.styles;
    const theme = getTheme();

    ViewComponent.displayName =
      ViewComponent.displayName || options.scope + 'View';
    const content = (processedProps: TProps) => {
      let styles: TStyles | undefined = undefined;

      switch (typeof getStyles) {
        case 'function':
          styles = getStyles({ theme, ...(processedProps as {}) });
          break;
        case 'object':
          styles = getStyles;
          break;
        default:
          break;
      }

      return (
        <ViewComponent { ...processedProps } styles={ mergeStyleSets(styles) } />
      );
    };

    return !!StateComponent ? (
      <StateComponent>{ content }</StateComponent>
    ) : (
        content(userProps)
      );
  };

  result.displayName = options.scope;

  return result;
}

// Helper function to augment existing components that have been created.
export function augmentComponent<TProps, TStyles>(
  options: IComponentOptions<TProps, TStyles>
): void {
  _augmentations[options.scope] = {
    ..._augmentations[options.scope],
    ...options
  };
}
