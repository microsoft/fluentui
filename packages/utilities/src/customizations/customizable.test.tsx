import * as React from 'react';
import { render } from '@testing-library/react';
import { customizable } from './customizable';
import { Customizations } from './Customizations';
import { Customizer } from './Customizer';
import type { IStyle, IStyleFunction, ShadowConfig } from '@fluentui/merge-styles';

import type { JSXElement } from '../jsx';

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
  public render(): JSXElement {
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
  public render(): JSXElement {
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
  public render(): JSXElement {
    const styles = this.props.styles({ styles: { root: {} } });

    return (
      <div
        data-testid="style-function"
        style={styles.root as React.CSSProperties}
        data-style={JSON.stringify(styles.root)}
      />
    );
  }
}

describe('customizable', () => {
  beforeEach(() => {
    Customizations.reset();
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
    const componentStyles = { root: { color: 'rgb(255, 0, 0)', background: 'rgb(0, 128, 0)' } };
    const componentStylesFn: IStyleFunction<IComponentProps, IComponentStyles> = _props => {
      return componentStyles;
    };

    const wrapper = render(
      <Customizer>
        <StyleFunction styles={componentStylesFn} />
      </Customizer>,
    );

    const component = wrapper.getByTestId('style-function');
    const rootStyles = JSON.parse(component.getAttribute('data-style')!);

    expect(component).toHaveStyle(componentStyles.root);
    expect(rootStyles).toEqual(componentStyles.root);
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
