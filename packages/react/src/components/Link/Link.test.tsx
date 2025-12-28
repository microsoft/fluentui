import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { isConformant } from '../../common/isConformant';
import { Link } from './Link';

describe('Link', () => {
  it('renders Link correctly', () => {
    const { container } = render(<Link href="#">I'm a link</Link>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders disabled Link correctly', () => {
    const { container } = render(
      <Link href="#" disabled={true}>
        I'm a disabled link
      </Link>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders Link with no href as a button', () => {
    const { container } = render(<Link>I'm a link as a button</Link>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Set type=button property when link is a button', () => {
    render(<Link>I'm link as a button</Link>);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveAttribute('type', 'button');
  });

  it('renders disabled Link with no href as a button correctly', () => {
    const { container } = render(<Link disabled={true}>I'm a link as a button</Link>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders Link with a custom class name', () => {
    const { container } = render(
      <Link href="#" className="customClassName">
        I'm a link
      </Link>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders Link with "as=div" a div element', () => {
    const { container } = render(
      <Link as="div" className="customClassName">
        I'm a div
      </Link>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('supports non button/anchor html attributes when "as=" is used', () => {
    const { container } = render(
      <Link as="input" type="text" defaultValue={'This is an input.'} className="customClassName" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  isConformant({
    Component: Link,
    displayName: 'Link',
  });

  it('renders Link with "as=Route" a Route element', () => {
    class Route extends React.Component<{ children?: React.ReactNode }> {
      public render() {
        return <span data-testid="route">{this.props.children}</span>;
      }
    }

    const { getByTestId } = render(
      <Link as={Route} className="customClassName">
        I'm a Route
      </Link>,
    );
    expect(getByTestId('route')).toBeInTheDocument();
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
