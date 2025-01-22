/*  eslint-disable @typescript-eslint/no-deprecated */
import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import { mount } from 'enzyme';
import { customizable } from './customizable';
import { Customizations } from './Customizations';
import { Customizer } from './Customizer';
import type { IStyle, IStyleFunction, ShadowConfig } from '@fluentui/merge-styles';

@customizable('Foo', ['field'])
class Foo extends React.Component<{ field?: string }, {}> {
  public render(): JSX.Element {
    return <div>{this.props.field}</div>;
  }
}

interface IComponentStyles {
  root: IStyle;
  __shadowConfig__?: ShadowConfig;
}

interface IComponentProps {
  styles: IComponentStyles;
}

interface IComponentStyleFunctionProps {
  styles: IStyleFunction<IComponentProps, IComponentStyles>;
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

@customizable('StyleFunction', ['styles'])
class StyleFunction extends React.Component<IComponentStyleFunctionProps> {
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
      </Customizer>,
    );
    const component = wrapper.find('ConcatStyles');
    const props = component.props() as IComponentProps;
    expect(Object.keys(props.styles)).toEqual(['root', '__shadowConfig__']);
    expect(props.styles.root).toEqual([globalStyles, componentStyles]);
  });

  it('can concatenate global styles and component styles', () => {
    const globalStyles: IStyleFunction<IComponentProps, IComponentStyles> = _props => {
      return { root: { color: 'red', background: 'green' } };
    };
    const componentStyles = { root: { color: 'blue' } };

    Customizations.applySettings({ styles: globalStyles });
    const wrapper = mount(
      <Customizer>
        <ConcatStyles styles={componentStyles} />
      </Customizer>,
    );

    const component = wrapper.find('ConcatStyles');
    const props = component.props() as IComponentProps;
    expect(Object.keys(props.styles)).toEqual(['root', '__shadowConfig__']);
    expect(props.styles.root).toEqual([globalStyles({} as IComponentProps).root, componentStyles.root]);
  });

  it('will apply component style function when no global styles are present', () => {
    const componentStyles: IStyleFunction<IComponentProps, IComponentStyles> = _props => {
      return { root: { color: 'red', background: 'green' } };
    };

    const wrapper = mount(
      <Customizer>
        <StyleFunction styles={componentStyles} />
      </Customizer>,
    );

    const component = wrapper.find('StyleFunction');
    const props = component.props() as IComponentProps;
    expect(typeof props.styles).toBe('function');
    expect(props.styles.__shadowConfig__).toBeTruthy();
  });

  it('can concatenate scoped styles and component styles', () => {
    const scopedStyles = { color: 'green', background: 'green' };
    const componentStyles = { color: 'blue' };

    Customizations.applyScopedSettings('ConcatStyles', { styles: { root: scopedStyles } });
    const wrapper = mount(
      <Customizer>
        <ConcatStyles styles={{ root: componentStyles }} />
      </Customizer>,
    );
    const component = wrapper.find('ConcatStyles');
    const props = component.props() as IComponentProps;
    expect(Object.keys(props.styles)).toEqual(['root', '__shadowConfig__']);
    expect(props.styles.root).toEqual([scopedStyles, componentStyles]);
  });

  it('can override global styles with component styles', () => {
    const globalStyles = { color: 'red', background: 'red' };
    const componentStyles = { color: 'blue' };

    Customizations.applySettings({ styles: { root: globalStyles } });
    const wrapper = mount(
      <Customizer>
        <OverrideStyles styles={{ root: componentStyles }} />
      </Customizer>,
    );
    const component = wrapper.find('OverrideStyles');
    const props = component.props() as IComponentProps;
    expect(Object.keys(props.styles)).toEqual(['root', '__shadowConfig__']);
    expect(props.styles.root).toEqual(componentStyles);
  });

  it('can override scoped styles with component styles', () => {
    const scopedStyles = { color: 'green', background: 'green' };
    const componentStyles = { color: 'blue' };

    Customizations.applyScopedSettings('OverrideStyles', { styles: { root: scopedStyles } });
    const wrapper = mount(
      <Customizer>
        <OverrideStyles styles={{ root: componentStyles }} />
      </Customizer>,
    );
    const component = wrapper.find('OverrideStyles');
    const props = component.props() as IComponentProps;
    expect(Object.keys(props.styles)).toEqual(['root', '__shadowConfig__']);
    expect(props.styles.root).toEqual(componentStyles);
  });

  it('should not mutate styles if no change to component and global styles', () => {
    const globalRootStyles = { color: 'red', background: 'red' };
    const componentRootStyles = { color: 'blue' };
    const componentStyles = { root: componentRootStyles };

    Customizations.applySettings({ styles: { root: globalRootStyles } });
    const wrapper = mount(
      <Customizer>
        <ConcatStyles styles={componentStyles} />
      </Customizer>,
    );
    const component = wrapper.find('ConcatStyles');
    const finalStyles = (component.props() as IComponentProps).styles;
    expect(Object.keys(finalStyles)).toEqual(['root', '__shadowConfig__']);
    expect(finalStyles.root).toEqual([globalRootStyles, componentRootStyles]);

    wrapper.setProps({});

    const updatedComponent = wrapper.find('ConcatStyles');
    const finalStylesAfterRerender = (updatedComponent.props() as IComponentProps).styles;
    expect(finalStylesAfterRerender).toBe(finalStyles);
    expect(finalStylesAfterRerender).toEqual(finalStyles);
  });

  it('should not mutate styles if no change to component styles without global styles', () => {
    const componentStyles = { root: { color: 'blue' } };

    const wrapper = mount(
      <Customizer>
        <ConcatStyles styles={componentStyles} />
      </Customizer>,
    );
    const component = wrapper.find('ConcatStyles');
    const finalStyles = (component.props() as IComponentProps).styles;
    expect(Object.keys(finalStyles)).toEqual(['root', '__shadowConfig__']);
    expect(finalStyles.root).toEqual(componentStyles.root);

    wrapper.setProps({});

    const updatedComponent = wrapper.find('ConcatStyles');
    const finalStylesAfterRerender = (updatedComponent.props() as IComponentProps).styles;
    expect(finalStylesAfterRerender).toStrictEqual(finalStyles);
    expect(finalStylesAfterRerender).toEqual(finalStyles);
  });

  it('should update styles if component styles changed', () => {
    const globalRootStyles = { color: 'red', background: 'red' };
    const componentRootStyles = { color: 'blue' };
    const componentStyles = { root: componentRootStyles };

    Customizations.applySettings({ styles: { root: globalRootStyles } });
    const wrapper = mount(
      <Customizer>
        <ConcatStyles styles={componentStyles} />
      </Customizer>,
    );
    const component = wrapper.find('ConcatStyles');
    const finalStyles = (component.props() as IComponentProps).styles;
    expect(Object.keys(finalStyles)).toEqual(['root', '__shadowConfig__']);
    expect(finalStyles.root).toEqual([globalRootStyles, componentRootStyles]);

    const newComponentRootStyles = { color: 'red' };
    const newComponentStyles = { root: newComponentRootStyles };

    // re-render ConcatStyles with new styles
    wrapper.setProps({
      children: React.cloneElement(wrapper.props().children, { styles: newComponentStyles }),
    });

    const updatedComponent = wrapper.find('ConcatStyles');
    const finalStylesAfterRerender = (updatedComponent.props() as IComponentProps).styles;
    expect(Object.keys(finalStylesAfterRerender)).toEqual(['root', '__shadowConfig__']);
    expect(finalStylesAfterRerender.root).toEqual([globalRootStyles, newComponentRootStyles]);
  });
});
