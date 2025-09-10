import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import { create } from '@fluentui/test-utilities';
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
    render(<Link>I'm link as a button</Link>);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveAttribute('type', 'button');
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
          // eslint-disable-next-line @typescript-eslint/no-deprecated
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
      render(
        <Link as="div" className="customClassName" componentRef={myRef}>
          I'm a div
        </Link>,
      );

    expect(renderLinkWithComponentRef).not.toThrow();
  });

  it('does not pass the componentRef property through to the button element', () => {
    const myRef = React.createRef<HTMLDivElement>();

    render(
      <Link className="customClassName" componentRef={myRef}>
        I'm a div
      </Link>,
    );

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).not.toHaveAttribute('componentRef');
  });
});
