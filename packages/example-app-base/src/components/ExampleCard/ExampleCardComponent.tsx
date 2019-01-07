import * as React from 'react';
import { createStatelessComponent, IStatelessComponent, IStyleableComponentProps } from '@uifabric/foundation';
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
//        we can remove this file AND remove foundation as a dependency of example-app-base.
export type IExampleCardComponent = IStatelessComponent<IExampleCardComponentProps, IExampleCardComponentStyles>;

export interface IExampleCardComponentProps extends IStyleableComponentProps<IExampleCardComponentProps, IExampleCardComponentStyles> {}

export interface IExampleCardComponentStyles {
  root: IStyle;
}

// tslint:disable-next-line:typedef
const ExampleCardComponentView: IExampleCardComponent['view'] = props => {
  return props.children ? <div className={props.classNames.root}>{props.children}</div> : null;
};

export const ExampleCardComponent: React.StatelessComponent<IExampleCardComponentProps> = createStatelessComponent({
  displayName: 'ExampleCardComponent',
  styles: undefined,
  view: ExampleCardComponentView
});
