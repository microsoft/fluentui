import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import { customizable } from './customizable';
// import { Customizer } from './Customizer';
import { Customizations } from './Customizations';

@customizable('Foo', ['field'])
class Foo extends React.Component<{ field?: string; }, {}> {
  public render(): JSX.Element {
    return <div>{ this.props.field }</div>;
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
    expect(ReactDOM.renderToStaticMarkup(<Foo field='name' />)).toEqual('<div>name</div>');
  });

});
