import '@testing-library/jest-dom';
import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AttachmentAction } from './AttachmentAction';
import { Attachment } from './Attachment';

describe('AttachmentAction', () => {
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
