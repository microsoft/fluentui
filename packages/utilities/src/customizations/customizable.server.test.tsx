/**
 * @jest-environment node
 */
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { customizable } from './customizable';
import { Customizations } from './Customizations';
import type { JSXElement } from '../jsx';

@customizable('Foo', ['field'])
class Foo extends React.Component<{ field?: string }, {}> {
  public render(): JSXElement {
    return <div>{this.props.field}</div>;
  }
}

describe('customizable (server-side rendering)', () => {
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
});
