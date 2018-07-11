import { mergeStyleSets, getTheme, ITheme } from 'office-ui-fabric-react';
import {
  createComponentWithProviders,
  IComponentOptions,
  IStyledProps as IFoundationStyledProps,
  IStylingProviders
} from '@uifabric/foundation';
export { IStateProps } from '@uifabric/foundation';

// Centralize Foundation interaction for use throughout this package.

// TODO: mergeStyleSet needs to have formalized, generic typing using IStyle and IStyleSet to tie everything together here
//        (like IStyles and IStyleSet<TStyle> below). Until then, use any typing and define temporary IStyleSet here

export type IStyleSet<TStyles> = { [P in keyof TStyles]: string };

export type IViewProps<TProps, TStyles> = TProps & { styles: IStyleSet<TStyles> };

export type IStyledProps<TProps> = IFoundationStyledProps<TProps, ITheme>;

// tslint:disable-next-line:no-any
const providers: IStylingProviders<any, any, ITheme> = {
  getTheme,
  mergeStyleSets
};

export function createComponent<TProps, TStyles>(
  options: IComponentOptions<TProps, TStyles, IStyleSet<TStyles>, ITheme>
): React.StatelessComponent<TProps> {
  return createComponentWithProviders(options, providers);
}
