import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import { customizable } from './customizable';
import { Customizer } from './Customizer';
import { Customizations } from './Customizations';

@customizable('Foo', ['field'])
class Foo extends React.Component<{ field?: string }, {}> {
  public render(): JSX.Element {
    return <div>{this.props.field}</div>;
  }
}

@customizable('Bar', ['field', 'field2', 'field3'])
class Bar extends React.Component<{ field?: string; field2?: string; field3?: string }, {}> {
  public render(): JSX.Element {
    return (
      <div>
        {this.props.field}
        {this.props.field2}
        {this.props.field3}
      </div>
    );
  }
}

describe('Customizer', () => {
  beforeEach(() => {
    Customizations.reset();
  });

  it('can provide new defaults', () => {
    expect(
      ReactDOM.renderToStaticMarkup(
        <Customizer settings={{ field: 'customName' }}>
          <Foo />
        </Customizer>
      )
    ).toEqual('<div>customName</div>');
  });

  it('can pass through global settings', () => {
    Customizations.applySettings({ field: 'globalName' });
    expect(
      ReactDOM.renderToStaticMarkup(
        <Customizer settings={{ nonMatch: 'customName' }}>
          <Foo />
        </Customizer>
      )
    ).toEqual('<div>globalName</div>');
  });

  it('can override global settings', () => {
    Customizations.applySettings({ field: 'globalName' });
    expect(
      ReactDOM.renderToStaticMarkup(
        <Customizer settings={{ field: 'customName' }}>
          <Foo />
        </Customizer>
      )
    ).toEqual('<div>customName</div>');
  });

  it('can scope settings to specific components', () => {
    const scopedSettings = {
      Foo: { field: 'scopedToFoo' },
      Bar: { field: 'scopedToBar' }
    };

    expect(
      ReactDOM.renderToStaticMarkup(
        <Customizer scopedSettings={scopedSettings}>
          <div>
            <Foo />
            <Bar />
          </div>
        </Customizer>
      )
    ).toEqual('<div><div>scopedToFoo</div><div>scopedToBar</div></div>');
  });

  it('can layer global settings', () => {
    expect(
      ReactDOM.renderToStaticMarkup(
        <Customizer settings={{ field: 'field' }}>
          <Customizer settings={{ field2: 'field2' }}>
            <Bar />
          </Customizer>
        </Customizer>
      )
    ).toEqual('<div>fieldfield2</div>');
  });

  it('can layer scoped settings', () => {
    Customizations.applySettings({ field3: 'field3' });

    expect(
      ReactDOM.renderToStaticMarkup(
        <Customizer scopedSettings={{ Bar: { field: 'field', field2: 'oldfield2' } }}>
          <Customizer scopedSettings={{ Bar: { field2: 'field2' } }}>
            <Bar />
          </Customizer>
        </Customizer>
      )
    ).toEqual('<div>fieldfield2field3</div>');
  });

  it('can layer scoped settings with scopedSettingsFunction', () => {
    Customizations.applySettings({ field3: 'field3' });

    expect(
      ReactDOM.renderToStaticMarkup(
        <Customizer scopedSettings={{ Bar: { field: 'field' } }}>
          <Customizer
            scopedSettings={
              // tslint:disable-next-line:jsx-no-lambda
              (scopedSettings: { Bar: { field2: string } }) => ({ Bar: { ...scopedSettings.Bar, field2: 'field2' } })
            }
          >
            <Bar />
          </Customizer>
        </Customizer>
      )
    ).toEqual('<div>fieldfield2field3</div>');
  });

  it('it allows scopedSettings to be merged when a function is passed', () => {
    expect(
      ReactDOM.renderToStaticMarkup(
        <Customizer scopedSettings={{ Foo: { field: 'scopedToFoo' } }}>
          <Customizer
            scopedSettings={
              // tslint:disable-next-line:jsx-no-lambda
              (settings: { Foo: { field: string } }) => ({ ...settings, Bar: { field: 'scopedToBar' } })
            }
          >
            <div>
              <Foo />
              <Bar />
            </div>
          </Customizer>
        </Customizer>
      )
    ).toEqual('<div><div>scopedToFoo</div><div>scopedToBar</div></div>');
  });

  it('overrides previously set settings', () => {
    expect(
      ReactDOM.renderToStaticMarkup(
        <Customizer settings={{ field: 'field1' }}>
          <Customizer settings={{ field: 'field2' }}>
            <Bar />
          </Customizer>
        </Customizer>
      )
    ).toEqual('<div>field2</div>');
  });

  it('overrides the old settings when the parameter is ignored', () => {
    expect(
      ReactDOM.renderToStaticMarkup(
        <Customizer settings={{ field: 'field1' }}>
          <Customizer
            settings={
              // tslint:disable-next-line:jsx-no-lambda
              (settings: { field: string }) => ({ field: 'field2' })
            }
          >
            <Bar />
          </Customizer>
        </Customizer>
      )
    ).toEqual('<div>field2</div>');
  });

  it('can use a function to merge settings', () => {
    expect(
      ReactDOM.renderToStaticMarkup(
        <Customizer settings={{ field: 'field1' }}>
          <Customizer
            settings={
              // tslint:disable-next-line:jsx-no-lambda
              (settings: { field: string }) => ({ field: settings.field + 'field2' })
            }
          >
            <Bar />
          </Customizer>
        </Customizer>
      )
    ).toEqual('<div>field1field2</div>');
  });
});
