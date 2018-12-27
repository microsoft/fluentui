import * as React from 'react';
import { createStatelessComponent, getSlots, IStatelessComponent, IStyleableComponentProps } from '@uifabric/foundation';
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
export type IExampleCardComponent = IStatelessComponent<IExampleCardComponentProps, IExampleCardTokens, IExampleCardComponentStyles>;

export interface IExampleCardComponentProps extends
  IStyleableComponentProps<IExampleCardComponentProps, IExampleCardTokens, IExampleCardComponentStyles> { }

export interface IExampleCardTokens { }

export interface IExampleCardComponentStyles {
  root: IStyle;
}

// tslint:disable-next-line:typedef
const ExampleCardComponentView: IExampleCardComponent['view'] = props => {
  // TODO: finalize approach. classNames usage here will have to be adjusted on final approach in createComponent.
  // TODO: make sure this doesn't break website that doesn't use dropdowns
  // const Slots = getSlots<typeof props, IButtonSlots>(props, {
  //   root: 'div'
  // });
  // return props.children ? <Slots.root>{props.children}</Slots.root> : null;
  // tslint:disable:no-any
  return props.children ? <div className={(props as any).classNames.root}>{props.children}</div> : null;
};

export const ExampleCardComponent: React.StatelessComponent<IExampleCardComponentProps> = createStatelessComponent({
  displayName: 'ExampleCardComponent',
  styles: undefined,
  view: ExampleCardComponentView
});
