import * as React from 'react';
import { Switch } from './Switch';
import { fireEvent, render, screen } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { resetIdsForTests } from '@fluentui/react-utilities';

describe('Switch', () => {
  beforeEach(() => {
    resetIdsForTests();
  });

  isConformant({
    Component: Switch,
    displayName: 'Switch',
  });

  describe('Snapshot Tests', () => {
    it('renders a basic Switch unchecked', () => {
      const { container } = render(<Switch defaultChecked={false} />);
      expect(container).toMatchSnapshot();
    });

    it('renders a basic Switch checked', () => {
      const { container } = render(<Switch defaultChecked />);
      expect(container).toMatchSnapshot();
    });

    it('renders a disabled Switch unchecked', () => {
      const { container } = render(<Switch defaultChecked={false} />);
      expect(container).toMatchSnapshot();
    });

    it('renders a disabled Switch checked', () => {
      const { container } = render(<Switch defaultChecked={true} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('Unit Tests', () => {
    it('handles id prop', () => {
      render(<Switch id="test_id" data-testid="test" />);
      const switchRoot = screen.getByTestId('test');
      expect(switchRoot.getAttribute('id')).toEqual('test_id');
    });

    it('applies the defaultChecked prop', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      render(<Switch defaultChecked={true} input={{ ref: inputRef }} />);
      expect(inputRef.current?.checked).toEqual(true);
    });

    it('applies the checked prop', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      render(<Switch checked={true} input={{ ref: inputRef }} />);
      expect(inputRef.current?.checked).toEqual(true);
    });

    it('does not update when the controlled checked prop is provided', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      const eventHandler = jest.fn();

      render(<Switch checked={false} onChange={eventHandler} input={{ ref: inputRef }} />);
      const inputElement = screen.getByRole('switch');

      fireEvent.click(inputElement);

      expect(eventHandler).toBeCalledTimes(1);
      expect(eventHandler.mock.calls[0][1]).toEqual({ checked: true });
      expect(inputRef.current?.checked).toEqual(false);
    });

    it('calls onChange with the correct value', () => {
      const eventHandler = jest.fn();

      render(<Switch onChange={eventHandler} />);

      const input = screen.getByRole('switch');
      expect(eventHandler).toBeCalledTimes(0);

      fireEvent.click(input);
      fireEvent.click(input);
      fireEvent.click(input);

      expect(eventHandler).toBeCalledTimes(3);
      expect(eventHandler.mock.calls[2][1]).toEqual({ checked: true });
    });

    it('does not allow change on a disabled Switch', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      const eventHandler = jest.fn();

      render(<Switch defaultChecked onChange={eventHandler} input={{ ref: inputRef }} data-testid="test" disabled />);
      const switchRoot = screen.getByTestId('test');

      expect(eventHandler).toBeCalledTimes(0);
      fireEvent.click(switchRoot);
      expect(eventHandler).toBeCalledTimes(0);
      expect(inputRef?.current?.checked).toEqual(true);
    });

    it('handles onKeyDown callback', () => {
      const eventHandler = jest.fn();

      render(<Switch onKeyDown={eventHandler} data-testid="test" />);
      const switchRoot = screen.getByTestId('test');

      expect(eventHandler).toBeCalledTimes(0);
      fireEvent.keyDown(switchRoot, { key: 'ArrowUp' });
      expect(eventHandler).toBeCalledTimes(1);
    });

    it('handles onClick callback', () => {
      const eventHandler = jest.fn();

      render(<Switch onClick={eventHandler} data-testid="test" />);
      const switchRoot = screen.getByTestId('test');

      expect(eventHandler).toBeCalledTimes(0);
      fireEvent.click(switchRoot);
      expect(eventHandler).toBeCalledTimes(1);
    });

    it('does not allow focus on disabled Switch', () => {
      const switchRef = React.createRef<HTMLInputElement>();

      render(<Switch ref={switchRef} data-testid="test" disabled />);

      expect(document.activeElement).toEqual(document.body);
      switchRef?.current?.focus();
      expect(document.activeElement).toEqual(document.body);
    });
  });

  describe('Accessibility Tests', () => {
    it('renders the input slot as input', () => {
      const { container } = render(<Switch input={{ className: 'test' }} />);
      const inputElement = container.querySelector('.test');
      expect(inputElement?.tagName).toEqual('INPUT');
    });

    it('provides the input slot with a type of checkbox', () => {
      const { container } = render(<Switch input={{ className: 'test' }} />);
      const inputElement = container.querySelector('.test');
      expect(inputElement?.getAttribute('type')).toEqual('checkbox');
    });
  });
});
