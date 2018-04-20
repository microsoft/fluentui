import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import { customizable } from './customizable';
import { Customizer } from './Customizer';
import { Customizations } from './Customizations';

@customizable('Foo', ['field'])
class Foo extends React.Component<{ field?: string; }, {}> {
  public render(): JSX.Element {
    return (
      <div>{ this.props.field }</div>
    );
  }
}

@customizable('Bar', ['field', 'field2', 'field3'])
class Bar extends React.Component<{ field?: string; field2?: string, field3?: string }, {}> {
  public render(): JSX.Element {
    return (
      <div>{ this.props.field }{ this.props.field2 }{ this.props.field3 }</div>
    );
  }
}

describe('Customizer', () => {
  beforeEach(() => {
    Customizations.reset();
  });

  it('can provide new defaults', () => {
    expect(ReactDOM.renderToStaticMarkup(
      <Customizer settings={ { field: 'customName' } }>
        <Foo />
      </Customizer>
    )).toEqual('<div>customName</div>');
  });

  it('can pass through global settings', () => {
    Customizations.applySettings({ 'field': 'globalName' });
    expect(ReactDOM.renderToStaticMarkup(
      <Customizer settings={ { nonMatch: 'customName' } }>
        <Foo />
      </Customizer>
    )).toEqual('<div>globalName</div>');
  });

  it('can override global settings', () => {
    Customizations.applySettings({ 'field': 'globalName' });
    expect(ReactDOM.renderToStaticMarkup(
      <Customizer settings={ { field: 'customName' } }>
        <Foo />
      </Customizer>
    )).toEqual('<div>customName</div>');
  });

  it('can scope settings to specific components', () => {
    let scopedSettings = {
      Foo: { field: 'scopedToFoo' },
      Bar: { field: 'scopedToBar' }
    };

    expect(ReactDOM.renderToStaticMarkup(
      <Customizer scopedSettings={ scopedSettings }>
        <div>
          <Foo />
          <Bar />
        </div>
      </Customizer>
    )).toEqual('<div><div>scopedToFoo</div><div>scopedToBar</div></div>');
  });

  it('can layer global settings', () => {
    expect(ReactDOM.renderToStaticMarkup(
      <Customizer settings={ { field: 'field' } }>
        <Customizer settings={ { field2: 'field2' } }>
          <Bar />
        </Customizer >
      </Customizer >
    )).toEqual('<div>fieldfield2</div>');
  });

  it('can layer scoped settings', () => {
    Customizations.applySettings({ 'field3': 'field3' });

    expect(ReactDOM.renderToStaticMarkup(
      <Customizer scopedSettings={ { Bar: { field: 'field' } } }>
        <Customizer scopedSettings={ { Bar: { field2: 'field2' } } }>
          <Bar />
        </Customizer >
      </Customizer >
    )).toEqual('<div>fieldfield2field3</div>');
  });

});
