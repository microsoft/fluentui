import { mergeStyleSets, getTheme, ITheme } from 'office-ui-fabric-react';
import { createComponentWithProviders, IComponentOptions, IStylingProviders } from '@uifabric/foundation';
export { TStateProps } from '@uifabric/foundation';

// Centralize Foundation interaction for use throughout this package.

// TODO: mergeStyleSet needs to have formalized, generic typing using IStyle and IStyleSet to tie everything together here
//        (like TStyles and TStyleSet<TStyle>). Until then, use any typing and define temporary TStyleSet here

export declare type TStyleSet<TStyles> = { [P in keyof TStyles]: string };

export type TViewProps<TProps, TStyles> = TProps & { styles: TStyleSet<TStyles> };

// tslint:disable-next-line:no-any
const providers: IStylingProviders<ITheme, any, any> = {
  getTheme,
  mergeStyleSets
};

export function createComponent<TProps, TStyles>(
  options: IComponentOptions<TProps, TStyles, TStyleSet<TStyles>, ITheme>
): React.StatelessComponent<TProps> {
  return createComponentWithProviders(options, providers);
}
