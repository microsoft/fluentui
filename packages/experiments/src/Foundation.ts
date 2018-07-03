import { mergeStyleSets, getTheme, ITheme } from 'office-ui-fabric-react';
import { createComponentWithProviders, IComponentOptions, IStylingProviders } from '@uifabric/foundation';
export { IStateProps } from '@uifabric/foundation';

// Centralize Foundation interaction for use throughout this package.

// TODO: mergeStyleSet needs to have formalized, generic typing using IStyle and IStyleSet to tie everything together here
//        (like TStyles and TStyleSet<TStyle>). Until then, use any typing and define temporary TStyleSet here

export declare type IStyleSet<TStyles> = { [P in keyof TStyles]: string };

export type IViewProps<TProps, TStyles> = TProps & { styles: IStyleSet<TStyles> };

// tslint:disable-next-line:no-any
const providers: IStylingProviders<ITheme, any, any> = {
  getTheme,
  mergeStyleSets
};

export function createComponent<TProps, TStyles>(
  options: IComponentOptions<TProps, TStyles, IStyleSet<TStyles>, ITheme>
): React.StatelessComponent<TProps> {
  return createComponentWithProviders(options, providers);
}
