/*  eslint-disable @typescript-eslint/no-deprecated */
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { render } from '@testing-library/react';
import * as renderer from 'react-test-renderer';
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
    return (
      <div
        data-testid="concat-styles"
        // @ts-expect-error - for testing purposes
        style={this.props.styles}
        data-style={JSON.stringify(this.props.styles.root)}
      />
    );
  }
}

@customizable('OverrideStyles', ['styles'])
class OverrideStyles extends React.Component<IComponentProps, {}> {
  public render(): JSX.Element {
    return (
      <div
        data-testid="override-styles"
        // @ts-expect-error - for testing purposes
        style={this.props.styles}
        data-style={JSON.stringify(this.props.styles.root)}
      />
    );
  }
}

@customizable('StyleFunction', ['styles'])
class StyleFunction extends React.Component<IComponentStyleFunctionProps> {
  public render(): JSX.Element {
    return <div data-testid="style-function" />;
  }
}

describe('customizable', () => {
  beforeEach(() => {
    Customizations.reset();
  });

  it('can receive global customizations', () => {
    Customizations.applySettings({ field: 'globalName' });
    expect(renderToStaticMarkup(<Foo />)).toEqual('<div>globalName</div>');
  });

  it('can receive scoped customizations', () => {
    Customizations.applySettings({ field: 'globalName' });
    Customizations.applyScopedSettings('Foo', { field: 'scopedName' });
    expect(renderToStaticMarkup(<Foo />)).toEqual('<div>scopedName</div>');
  });

  it('can ignore scoped customizations that do not apply', () => {
    Customizations.applySettings({ field: 'globalName' });
    Customizations.applyScopedSettings('Bar', { field: 'scopedName' });
    expect(renderToStaticMarkup(<Foo />)).toEqual('<div>globalName</div>');
  });

  it('can accept props over global/scoped values', () => {
    Customizations.applySettings({ field: 'globalName' });
    Customizations.applyScopedSettings('Foo', { field: 'scopedName' });
    expect(renderToStaticMarkup(<Foo field="name" />)).toEqual('<div>name</div>');
  });

  it('can concatenate global styles and component styles', () => {
    const globalStyles = { color: 'red', background: 'red' };
    const componentStyles = { color: 'blue' };

    Customizations.applySettings({ styles: { root: globalStyles } });

    const rtl = render(
      <Customizer>
        <ConcatStyles styles={{ root: componentStyles }} />
      </Customizer>,
    );

    const concatStyleRoot = rtl.getByTestId('concat-styles');
    const rootStyles = JSON.parse(concatStyleRoot.getAttribute('data-style')!);

    expect(Object.keys(concatStyleRoot.style)).toEqual(expect.arrayContaining(['root', '__shadowConfig__']));
    expect(rootStyles).toEqual([globalStyles, componentStyles]);
  });

  it('can concatenate global styles and component styles', () => {
    const globalStyles: IStyleFunction<IComponentProps, IComponentStyles> = _props => {
      return { root: { color: 'red', background: 'green' } };
    };
    const componentStyles = { root: { color: 'blue' } };

    Customizations.applySettings({ styles: globalStyles });
    const rtl = render(
      <Customizer>
        <ConcatStyles styles={componentStyles} />
      </Customizer>,
    );

    const concatStyleRoot = rtl.getByTestId('concat-styles');
    const rootStyles = JSON.parse(concatStyleRoot.getAttribute('data-style')!);

    expect(Object.keys(concatStyleRoot.style)).toEqual(expect.arrayContaining(['root', '__shadowConfig__']));
    expect(rootStyles).toEqual([globalStyles({} as IComponentProps).root, componentStyles.root]);
  });

  it('will apply component style function when no global styles are present', () => {
    const componentStyles: IStyleFunction<IComponentProps, IComponentStyles> = _props => {
      return { root: { color: 'red', background: 'green' } };
    };

    const wrapper = renderer.create(
      <Customizer>
        <StyleFunction styles={componentStyles} />
      </Customizer>,
    );
    const component = wrapper.root.findByType(StyleFunction);
    const props = component.props as IComponentProps;
    expect(typeof props.styles).toBe('function');
    expect(props.styles.__shadowConfig__).toBeTruthy();
  });

  it('can concatenate scoped styles and component styles', () => {
    const scopedStyles = { color: 'green', background: 'green' };
    const componentStyles = { color: 'blue' };

    Customizations.applyScopedSettings('ConcatStyles', { styles: { root: scopedStyles } });

    const rtl = render(
      <Customizer>
        <ConcatStyles styles={{ root: componentStyles }} />
      </Customizer>,
    );

    const concatStyleRoot = rtl.getByTestId('concat-styles');
    const rootStyles = JSON.parse(concatStyleRoot.getAttribute('data-style')!);

    expect(Object.keys(concatStyleRoot.style)).toEqual(expect.arrayContaining(['root', '__shadowConfig__']));
    expect(rootStyles).toEqual([scopedStyles, componentStyles]);
  });

  it('can override global styles with component styles', () => {
    const globalStyles = { color: 'red', background: 'red' };
    const componentStyles = { color: 'blue' };

    Customizations.applySettings({ styles: { root: globalStyles } });
    const rtl = render(
      <Customizer>
        <OverrideStyles styles={{ root: componentStyles }} />
      </Customizer>,
    );
    const overrideStyleRoot = rtl.getByTestId('override-styles');
    const rootStyles = JSON.parse(overrideStyleRoot.getAttribute('data-style')!);

    expect(Object.keys(overrideStyleRoot.style)).toEqual(expect.arrayContaining(['root', '__shadowConfig__']));
    expect(rootStyles).toEqual(componentStyles);
  });

  it('can override scoped styles with component styles', () => {
    const scopedStyles = { color: 'green', background: 'green' };
    const componentStyles = { color: 'blue' };

    Customizations.applyScopedSettings('OverrideStyles', { styles: { root: scopedStyles } });
    const rtl = render(
      <Customizer>
        <OverrideStyles styles={{ root: componentStyles }} />
      </Customizer>,
    );
    const overrideStyleRoot = rtl.getByTestId('override-styles');
    const rootStyles = JSON.parse(overrideStyleRoot.getAttribute('data-style')!);

    expect(Object.keys(overrideStyleRoot.style)).toEqual(expect.arrayContaining(['root', '__shadowConfig__']));
    expect(rootStyles).toEqual(componentStyles);
  });

  it('should not mutate styles if no change to component and global styles', () => {
    const globalRootStyles = { color: 'red', background: 'red' };
    const componentRootStyles = { color: 'blue' };
    const componentStyles = { root: componentRootStyles };

    Customizations.applySettings({ styles: { root: globalRootStyles } });

    const rtl = render(
      <Customizer>
        <ConcatStyles styles={componentStyles} />
      </Customizer>,
    );

    let overrideStyleRoot = rtl.getByTestId('concat-styles');
    let rootStyles = JSON.parse(overrideStyleRoot.getAttribute('data-style')!);

    expect(Object.keys(overrideStyleRoot.style)).toEqual(expect.arrayContaining(['root', '__shadowConfig__']));
    expect(rootStyles).toEqual([globalRootStyles, componentRootStyles]);

    rtl.rerender(
      <Customizer>
        <ConcatStyles styles={componentStyles} />
      </Customizer>,
    );

    const updatedOverrideStyleRoot = rtl.getByTestId('concat-styles');
    const updatedRootStyles = JSON.parse(updatedOverrideStyleRoot.getAttribute('data-style')!);

    expect(updatedRootStyles).toStrictEqual(rootStyles);
    expect(updatedRootStyles).toEqual(rootStyles);
  });

  it('should not mutate styles if no change to component styles without global styles', () => {
    const componentStyles = { root: { color: 'blue' } };

    const rtl = render(
      <Customizer>
        <ConcatStyles styles={componentStyles} />
      </Customizer>,
    );

    let concatStyleRoot = rtl.getByTestId('concat-styles');
    let rootStyles = JSON.parse(concatStyleRoot.getAttribute('data-style')!);

    expect(Object.keys(concatStyleRoot.style)).toEqual(expect.arrayContaining(['root', '__shadowConfig__']));
    expect(rootStyles).toEqual(componentStyles.root);

    rtl.rerender(
      <Customizer>
        <ConcatStyles styles={componentStyles} />
      </Customizer>,
    );

    const updatedConcatStyleRoot = rtl.getByTestId('concat-styles');
    let updatedRootStyles = JSON.parse(updatedConcatStyleRoot.getAttribute('data-style')!);

    expect(updatedRootStyles).toStrictEqual(rootStyles);
    expect(updatedRootStyles).toEqual(rootStyles);
  });

  it('should update styles if component styles changed', () => {
    const globalRootStyles = { color: 'red', background: 'red' };
    const componentRootStyles = { color: 'blue' };
    const componentStyles = { root: componentRootStyles };

    Customizations.applySettings({ styles: { root: globalRootStyles } });

    const rtl = render(
      <Customizer>
        <ConcatStyles styles={componentStyles} />
      </Customizer>,
    );
    let concatStyleRoot = rtl.getByTestId('concat-styles');
    let rootStyles = JSON.parse(concatStyleRoot.getAttribute('data-style')!);

    expect(Object.keys(concatStyleRoot.style)).toEqual(expect.arrayContaining(['root', '__shadowConfig__']));
    expect(rootStyles).toEqual([globalRootStyles, componentRootStyles]);

    const newComponentRootStyles = { color: 'red' };
    const newComponentStyles = { root: newComponentRootStyles };

    rtl.rerender(
      <Customizer>
        <ConcatStyles styles={newComponentStyles} />
      </Customizer>,
    );

    const updatedConcatStyleRoot = rtl.getByTestId('concat-styles');
    let updatedRootStyles = JSON.parse(updatedConcatStyleRoot.getAttribute('data-style')!);

    expect(Object.keys(updatedConcatStyleRoot.style)).toEqual(expect.arrayContaining(['root', '__shadowConfig__']));
    expect(updatedRootStyles).toEqual([globalRootStyles, newComponentRootStyles]);
  });
});
