import * as React from 'react';
import { Switch } from './Switch';
import { fireEvent, render, screen } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { resetIdsForTests } from '@fluentui/react-utilities';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('Switch', () => {
  beforeEach(() => {
    resetIdsForTests();
  });

  isConformant({
    Component: Switch,
    displayName: 'Switch',
  });

  it('renders a basic Switch', () => {
    const renderedComponent = render(
      <>
        <Switch defaultChecked={false} />
        <Switch defaultChecked={true} />
      </>,
    );
    expect(renderedComponent.container).toMatchSnapshot();
    renderedComponent.unmount();
  });

  it('renders a disabled Switch', () => {
    const renderedComponent = render(
      <>
        <Switch disabled defaultChecked={false} />
        <Switch disabled defaultChecked={true} />
      </>,
    );
    expect(renderedComponent.container).toMatchSnapshot();
    renderedComponent.unmount();
  });

  it('renders a labeled Switch', () => {
    const renderedComponent = render(<Switch>Hello</Switch>);
    expect(renderedComponent.container).toMatchSnapshot();
    renderedComponent.unmount();
  });

  it('handles (id) prop', () => {
    render(<Switch id="test_id" data-testid="test" />);
    const switchRoot = screen.getByTestId('test');
    expect(switchRoot.getAttribute('id')).toEqual('test_id');
  });

  // it('applies the (defaultChecked) prop', () => {
  //   render(<Switch defaultChecked={true} />);
  //   expect(screen.getByRole('checkbox').getAttribute('checked')).toEqual(true);
  // });

  // it('applies the (checked) prop', () => {
  //   render(<Switch checked={true} />);
  //   expect(screen.getByRole('checkbox').getAttribute('checked')).toEqual(true);
  // });

  it('does not update when the controlled (checked) prop is provided', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const eventHandler = jest.fn();

    render(<Switch checked={false} onChange={eventHandler} input={{ ref: inputRef }} />);
    const inputElement = screen.getByRole('checkbox');

    fireEvent.click(inputElement);

    expect(eventHandler).toBeCalledTimes(1);
    expect(eventHandler.mock.calls[0][1]).toEqual({ checked: true });
    expect(inputRef.current?.checked).toEqual(false);
  });

  it('calls (onChange) with the correct value', () => {
    const eventHandler = jest.fn();

    render(<Switch onChange={eventHandler} />);

    const input = screen.getByRole('checkbox');

    expect(eventHandler).toBeCalledTimes(0);

    fireEvent.click(input);
    fireEvent.click(input);
    fireEvent.click(input);

    expect(eventHandler).toBeCalledTimes(3);
    expect(eventHandler.mock.calls[2][1]).toEqual({ checked: true });
  });

  it('does not allow (change) on a disabled Switch', () => {
    const eventHandler = jest.fn();
    let switchRef: any;

    const SwitchTestComponent = () => {
      switchRef = React.useRef(null);

      return <Switch defaultChecked onChange={eventHandler} ref={switchRef} data-testid="test" disabled />;
    };

    render(<SwitchTestComponent />);

    const switchRoot = screen.getByTestId('test');

    expect(eventHandler).toBeCalledTimes(0);
    fireEvent.click(switchRoot);
    expect(eventHandler).toBeCalledTimes(0);
    // expect(switchRef.current.value).toEqual(true);
  });

  it('handles (onKeyDown) callback', () => {
    const eventHandler = jest.fn();

    render(<Switch onKeyDown={eventHandler} data-testid="test" />);
    const sliderRoot = screen.getByTestId('test');

    expect(eventHandler).toBeCalledTimes(0);
    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
    expect(eventHandler).toBeCalledTimes(1);
  });

  it('handles (onClick) callback', () => {
    const eventHandler = jest.fn();

    render(<Switch onClick={eventHandler} data-testid="test" />);
    const sliderRoot = screen.getByTestId('test');

    expect(eventHandler).toBeCalledTimes(0);
    fireEvent.click(sliderRoot);
    expect(eventHandler).toBeCalledTimes(1);
  });

  it('does not allow (focus) on disabled Switch', () => {
    let switchRef: any;

    const SwitchTestComponent = () => {
      switchRef = React.useRef(null);

      return <Switch ref={switchRef} data-testid="test" disabled />;
    };

    render(<SwitchTestComponent />);

    expect(document.activeElement).toEqual(document.body);
    switchRef.current.focus();
    expect(document.activeElement).toEqual(document.body);
  });
});
