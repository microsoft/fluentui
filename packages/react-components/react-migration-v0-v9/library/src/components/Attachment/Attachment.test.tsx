import '@testing-library/jest-dom';
import { isConformant } from '@fluentui/react-conformance';
import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Attachment } from './Attachment';

describe('Attachment', () => {
  isConformant({
    Component: Attachment,
    componentPath: module!.filename.replace('.test', ''),
    displayName: 'Attachment',
    disabledTests: ['has-docblock', 'has-top-level-file', 'component-has-static-classnames-object'],
  });

  it('renders a default state', () => {
    const { getByText } = render(<Attachment>Actionable</Attachment>);
    const textElement = getByText('Actionable');
    expect(textElement.nodeName).toBe('DIV');
  });

  it('handles onClick', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Attachment actionable onClick={handleClick}>
        Click me
      </Attachment>,
    );
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('handles Enter', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Attachment actionable onClick={handleClick}>
        Click me
      </Attachment>,
    );
    userEvent.type(getByText('Click me'), '{enter}');
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders actionable', () => {
    const { getByText } = render(<Attachment actionable={true}>Actionable</Attachment>);
    const actionableElement = getByText('Actionable');
    expect(actionableElement).toHaveAttribute('tabIndex', '0');
  });
});
