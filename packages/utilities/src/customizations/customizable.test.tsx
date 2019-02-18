import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import { mount } from 'enzyme';
import { customizable } from './customizable';
import { Customizations } from './Customizations';
import { Customizer } from './Customizer';
import { IStyle } from '@uifabric/merge-styles';

@customizable('Foo', ['field'])
class Foo extends React.Component<{ field?: string }, {}> {
  public render(): JSX.Element {
    return <div>{this.props.field}</div>;
  }
}

interface IComponentStyles {
  root: IStyle;
}

interface IComponentProps {
  styles: IComponentStyles;
}

@customizable('ConcatStyles', ['styles'], true)
class ConcatStyles extends React.Component<IComponentProps, {}> {
  public render(): JSX.Element {
    return <div />;
  }
}

@customizable('OverrideStyles', ['styles'])
class OverrideStyles extends React.Component<IComponentProps, {}> {
  public render(): JSX.Element {
    return <div />;
  }
}

describe('customizable', () => {
  beforeEach(() => {
    Customizations.reset();
  });

  it('can receive global customizations', () => {
    Customizations.applySettings({ field: 'globalName' });
    expect(ReactDOM.renderToStaticMarkup(<Foo />)).toEqual('<div>globalName</div>');
  });

  it('can receive scoped customizations', () => {
    Customizations.applySettings({ field: 'globalName' });
    Customizations.applyScopedSettings('Foo', { field: 'scopedName' });
    expect(ReactDOM.renderToStaticMarkup(<Foo />)).toEqual('<div>scopedName</div>');
  });

  it('can ignore scoped customizations that do not apply', () => {
    Customizations.applySettings({ field: 'globalName' });
    Customizations.applyScopedSettings('Bar', { field: 'scopedName' });
    expect(ReactDOM.renderToStaticMarkup(<Foo />)).toEqual('<div>globalName</div>');
  });

  it('can accept props over global/scoped values', () => {
    Customizations.applySettings({ field: 'globalName' });
    Customizations.applyScopedSettings('Foo', { field: 'scopedName' });
    expect(ReactDOM.renderToStaticMarkup(<Foo field="name" />)).toEqual('<div>name</div>');
  });

  it('can concatenate global styles and component styles', () => {
    const globalStyles = { color: 'red', background: 'red' };
    const componentStyles = { color: 'blue' };

    Customizations.applySettings({ styles: { root: globalStyles } });
    const wrapper = mount(
      <Customizer>
        <ConcatStyles styles={{ root: componentStyles }} />
      </Customizer>
    );
    const component = wrapper.find('ConcatStyles');

    expect((component.props() as IComponentProps).styles).toEqual({ root: [globalStyles, componentStyles] });
  });

  it('can concatenate scoped styles and component styles', () => {
    const scopedStyles = { color: 'green', background: 'green' };
    const componentStyles = { color: 'blue' };

    Customizations.applyScopedSettings('ConcatStyles', { styles: { root: scopedStyles } });
    const wrapper = mount(
      <Customizer>
        <ConcatStyles styles={{ root: componentStyles }} />
      </Customizer>
    );
    const component = wrapper.find('ConcatStyles');

    expect((component.props() as IComponentProps).styles).toEqual({ root: [scopedStyles, componentStyles] });
  });

  it('can override global styles with component styles', () => {
    const globalStyles = { color: 'red', background: 'red' };
    const componentStyles = { color: 'blue' };

    Customizations.applySettings({ styles: { root: globalStyles } });
    const wrapper = mount(
      <Customizer>
        <OverrideStyles styles={{ root: componentStyles }} />
      </Customizer>
    );
    const component = wrapper.find('OverrideStyles');

    expect((component.props() as IComponentProps).styles).toEqual({ root: componentStyles });
  });

  it('can override scoped styles with component styles', () => {
    const scopedStyles = { color: 'green', background: 'green' };
    const componentStyles = { color: 'blue' };

    Customizations.applyScopedSettings('OverrideStyles', { styles: { root: scopedStyles } });
    const wrapper = mount(
      <Customizer>
        <OverrideStyles styles={{ root: componentStyles }} />
      </Customizer>
    );
    const component = wrapper.find('OverrideStyles');

    expect((component.props() as IComponentProps).styles).toEqual({ root: componentStyles });
  });
});
