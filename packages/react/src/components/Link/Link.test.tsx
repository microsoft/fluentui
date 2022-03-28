import { mount } from 'enzyme';
import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import { create } from '@fluentui/utilities/lib/test';
import { Customizer } from '@fluentui/utilities';
import { createTheme } from '@fluentui/style-utilities';
import { isConformant } from '../../common/isConformant';
import { Link } from './Link';

describe('Link', () => {
  it('renders Link correctly', () => {
    const component = create(<Link href="#">I'm a link</Link>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders disabled Link correctly', () => {
    const component = create(
      <Link href="#" disabled={true}>
        I'm a disabled link
      </Link>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Link with no href as a button', () => {
    const component = create(<Link>I'm a link as a button</Link>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Set type=button property when link is a button', () => {
    const component = mount(<Link>I'm link as a button</Link>);

    expect(Object.keys(component.find('button').props())).toContain('type');
    expect(component.find('button').props().type).toBe('button');
  });

  it('renders disabled Link with no href as a button correctly', () => {
    const component = create(<Link disabled={true}>I'm a link as a button</Link>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Link with a custom class name', () => {
    const component = create(
      <Link href="#" className="customClassName">
        I'm a link
      </Link>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Link with "as=div" a div element', () => {
    const component = create(
      <Link as="div" className="customClassName">
        I'm a div
      </Link>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('supports non button/anchor html attributes when "as=" is used', () => {
    const component = create(<Link as="input" type="text" value={'This is an input.'} className="customClassName" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  isConformant({
    Component: Link,
    displayName: 'Link',
  });

  it('renders Link with "as=Route" a Route element', () => {
    class Route extends React.Component {
      public render() {
        return null;
      }
    }

    const component = create(
      <Link as={Route} className="customClassName">
        I'm a Route
      </Link>,
    );
    const testInstance = component.root;
    expect(() => testInstance.findByType(Route)).not.toThrow();
  });

  it('can have the global styles for Link component be disabled', () => {
    const NoClassNamesTheme = createTheme({ disableGlobalClassNames: true });

    expect(
      /ms-Link($| )/.test(
        ReactDOM.renderToStaticMarkup(
          // eslint-disable-next-line deprecation/deprecation
          <Customizer settings={{ theme: NoClassNamesTheme }}>
            <Link href="helloworld.html">My Link</Link>
          </Customizer>,
        ),
      ),
    ).toBe(false);
  });

  it('does not throw a React warning when the componentRef prop is provided', () => {
    const myRef = React.createRef<HTMLDivElement>();

    const renderLinkWithComponentRef = () =>
      mount(
        <Link as="div" className="customClassName" componentRef={myRef}>
          I'm a div
        </Link>,
      );

    expect(renderLinkWithComponentRef).not.toThrow();
  });

  it('does not pass the componentRef property through to the button element', () => {
    const myRef = React.createRef<HTMLDivElement>();

    const component = mount(
      <Link className="customClassName" componentRef={myRef}>
        I'm a div
      </Link>,
    );

    expect(Object.keys(component.find('button').props())).not.toContain('componentRef');
  });
});
