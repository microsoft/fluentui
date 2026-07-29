import '@testing-library/jest-dom';
import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AttachmentAction } from './AttachmentAction';
import { Attachment } from './Attachment';
import styles from './AttachmentAction.module.css';

describe('AttachmentAction', () => {
  /*
   * Delegation seam with react-button, asserted directly: AttachmentAction hands its class
   * string to <Button> as the CONSUMER className, so the rendered element leads with
   * react-button's own hashed class and carries BOTH markers. Neither may be classList[0].
   */
  it('carries both its own and react-button own marker, with neither at classList[0]', () => {
    const { getByRole } = render(<AttachmentAction>Action</AttachmentAction>);
    const root = getByRole('button');

    expect(root.classList.contains('group/fui-attachment-action')).toBe(true);
    expect(root.classList.contains('group/fui-button')).toBe(true);
    expect(root.classList[0]).not.toMatch(/^(group|peer)\//);
    expect(root).toHaveClass(styles.root);
  });

  it('applies the disabled slice for both disabled and disabledFocusable', () => {
    const { getByRole, rerender } = render(<AttachmentAction>Action</AttachmentAction>);
    expect(getByRole('button')).not.toHaveClass(styles.disabled);

    rerender(<AttachmentAction disabled>Action</AttachmentAction>);
    expect(getByRole('button')).toHaveClass(styles.disabled);

    rerender(<AttachmentAction disabledFocusable>Action</AttachmentAction>);
    expect(getByRole('button')).toHaveClass(styles.disabled);
  });

  it('puts the consumer className last', () => {
    const { getByRole } = render(<AttachmentAction className="consumer-wins">Action</AttachmentAction>);
    const classNames = Array.from(getByRole('button').classList);

    expect(classNames[classNames.length - 1]).toBe('consumer-wins');
  });

  it('renders a default state', () => {
    const { getByText } = render(<AttachmentAction>Action</AttachmentAction>);
    const textElement = getByText('Action');
    expect(textElement.nodeName).toBe('BUTTON');
  });

  it('handles onClick', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<AttachmentAction onClick={handleClick}>Click me</AttachmentAction>);
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('handles Enter', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<AttachmentAction onClick={handleClick}>Click me</AttachmentAction>);
    userEvent.type(getByText('Click me'), '{enter}');
    expect(handleClick).toHaveBeenCalled();
  });

  it('handles Enter when in Attachment', () => {
    const handleClick = jest.fn();
    const handleAttachmentClick = jest.fn();
    const { getByText } = render(
      <Attachment actionable onClick={handleAttachmentClick}>
        <AttachmentAction onClick={handleClick}>Click me</AttachmentAction>
      </Attachment>,
    );
    userEvent.type(getByText('Click me'), '{enter}');
    expect(handleClick).toHaveBeenCalled();
    expect(handleAttachmentClick).not.toHaveBeenCalled();
  });

  it('handles onKeyDown', () => {
    const handleKeyDown = jest.fn();
    const { getByText } = render(<AttachmentAction onKeyDown={handleKeyDown}>Press key</AttachmentAction>);
    fireEvent.keyDown(getByText('Press key'), { key: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalled();
  });

  it('handles onKeyUp', () => {
    const handleKeyUp = jest.fn();
    const { getByText } = render(<AttachmentAction onKeyUp={handleKeyUp}>Release key</AttachmentAction>);
    fireEvent.keyUp(getByText('Release key'), { key: 'Enter' });
    expect(handleKeyUp).toHaveBeenCalled();
  });

  it('renders disabled', () => {
    const { getByText } = render(<AttachmentAction disabled={true}>Disabled</AttachmentAction>);
    const disabledElement = getByText('Disabled');
    expect(disabledElement).toBeDisabled();
  });
});
