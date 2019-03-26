/** @jsx withSlots */
import {
  createComponent,
  getSlots,
  IHTMLSlot,
  IComponent,
  IComponentStyles,
  IStyleableComponentProps,
  withSlots
} from '@uifabric/foundation';
import {
  Customizations,
  CustomizerContext,
  divProperties,
  getNativeProps,
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
export type IExampleCardComponent = IComponent<IExampleCardComponentProps, {}, IExampleCardComponentStyles>;

export interface IExampleCardComponentSlots {
  root?: IHTMLSlot;
}

export interface IExampleCardComponentProps
  extends IExampleCardComponentSlots,
    IStyleableComponentProps<IExampleCardComponentProps, {}, IExampleCardComponentStyles> {}

export type IExampleCardComponentStyles = IComponentStyles<IExampleCardComponentSlots>;

// tslint:disable-next-line:typedef
const ExampleCardComponentView: IExampleCardComponent['view'] = props => {
  if (!props.children) {
    return null;
  }

  const Slots = getSlots<IExampleCardComponentProps, IExampleCardComponentSlots>(props, {
    root: 'div'
  });

  return <Slots.root {...getNativeProps(props, divProperties)} />;
};

export const ExampleCardComponent: React.StatelessComponent<IExampleCardComponentProps> = createComponent({
  displayName: 'ExampleCardComponent',
  styles: undefined,
  view: ExampleCardComponentView
});
