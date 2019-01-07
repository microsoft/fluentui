import * as React from 'react';
import {
  createStatelessComponent,
  getSlots,
  IComponentStyles,
  ISlotProp,
  IStatelessComponent,
  IStyleableComponentProps
} from '@uifabric/foundation';

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
// tslint:disable:no-any
export type IHTMLSlot = ISlotProp<React.HTMLAttributes<any>>;

export type IExampleCardComponent = IStatelessComponent<IExampleCardComponentProps, IExampleCardComponentStyles>;

export type IExampleCardComponentSlots = {
  root?: IHTMLSlot;
};

export interface IExampleCardComponentProps
  extends IExampleCardComponentSlots,
    IStyleableComponentProps<IExampleCardComponentProps, IExampleCardComponentStyles> {}

export type IExampleCardComponentStyles = IComponentStyles<IExampleCardComponentSlots>;

// tslint:disable-next-line:typedef
const ExampleCardComponentView: IExampleCardComponent['view'] = props => {
  // TODO: make sure this doesn't break website that doesn't use dropdowns
  if (!props.children) {
    return null;
  }

  const Slots = getSlots<typeof props, IExampleCardComponentSlots>(props, {
    root: 'div'
  });

  return <Slots.root>{props.children}</Slots.root>;
};

export const ExampleCardComponent: React.StatelessComponent<IExampleCardComponentProps> = createStatelessComponent({
  displayName: 'ExampleCardComponent',
  styles: undefined,
  view: ExampleCardComponentView
});
