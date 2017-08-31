import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import { customizable } from './customizable';
import { Customizer } from './Customizer';
import { GlobalSettings } from './GlobalSettings';

let { expect } = chai;

@customizable(['name', 'name2'])
class Foo extends React.Component<{ field: string; }, {}> {
  public name: string;

  public render(): JSX.Element {
    // tslint:disable-next-line:no-any
    return <div>{ (this.props as any)[this.props.field] }</div>;
  }
}

describe('customizable', () => {

  it('can inject customizations', () => {
    GlobalSettings.setValue('name', 'defaultName');

    expect(ReactDOM.renderToStaticMarkup(<Foo field='name' />)).equals('<div>defaultName</div>');
    expect(ReactDOM.renderToStaticMarkup(<Foo field='name2' />)).equals('<div></div>');

    expect(ReactDOM.renderToStaticMarkup(
      <Customizer settings={ { name: 'customName' } }>
        <Foo field='name' />
      </Customizer>
    )).equals('<div>customName</div>');

    expect(ReactDOM.renderToStaticMarkup(
      <Customizer settings={ { name2: 'customName' } }>
        <Foo field='name2' />
      </Customizer>
    )).equals('<div>customName</div>');
  });

});
