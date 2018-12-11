import * as React from 'react';
import { createStatelessComponent, IStatelessComponent, IStyleableComponentProps, IComponentProviders } from '@uifabric/foundation';
import {
  Customizations,
  CustomizerContext,
  getThemedContext,
  ICustomizerContext,
  IProcessedStyleSet,
  ISchemeNames,
  IStyle,
  ITheme,
  mergeStyleSets
} from 'office-ui-fabric-react';

// This file exists only to create a temporary stateless component for applying styles.
// TODO: Once Stack (or any other Foundation created layout component) is promoted out of experiments,
//        we can remove this file and also remove foundation as a dependency of example-app-base.
export type IExampleCardComponent = IStatelessComponent<
  IExampleCardComponentProps,
  IExampleCardComponentStyles,
  IProcessedStyleSet<IExampleCardComponentStyles>,
  ITheme,
  {}
>;

export interface IExampleCardComponentProps
  extends IStyleableComponentProps<IExampleCardComponentProps, IExampleCardComponentStyles, ITheme, ISchemeNames> {}

export interface IExampleCardComponentStyles {
  root: IStyle;
}

// tslint:disable-next-line:no-any
const providers: IComponentProviders<any, any, any, ICustomizerContext, ITheme, ISchemeNames> = {
  mergeStyleSets,
  getCustomizations,
  CustomizerContext
};

// tslint:disable-next-line:typedef
const ExampleCardComponentView: IExampleCardComponent['view'] = props => {
  return props.children ? <div className={props.classNames.root}>{props.children}</div> : null;
};

export const ExampleCardComponent: React.StatelessComponent<IExampleCardComponentProps> = createStatelessComponent(
  {
    displayName: 'ExampleCardComponent',
    styles: () => undefined,
    view: ExampleCardComponentView
  },
  providers
);

// These utils are temporarily copied from OUFR's Foundation.ts until a promoted component can be used directly.
function getCustomizations<TViewProps, TStyleSet>(
  displayName: string,
  context: ICustomizerContext,
  fields?: string[]
): IStyleableComponentProps<TViewProps, TStyleSet, ITheme, ISchemeNames> {
  const DefaultFields = ['theme', 'styles', 'styleVariables'];
  return Customizations.getSettings(fields || DefaultFields, displayName, context.customizations);
}
