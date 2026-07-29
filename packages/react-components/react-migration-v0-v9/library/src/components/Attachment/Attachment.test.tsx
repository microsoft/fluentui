import '@testing-library/jest-dom';
// import { isConformant } from '@fluentui/react-conformance';
import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Attachment } from './Attachment';
import styles from './Attachment.module.css';

describe('Attachment', () => {
  // to prevent out of memory
  // isConformant({
  //   Component: Attachment,
  //   componentPath: module!.filename.replace('.test', ''),
  //   displayName: 'Attachment',
  //   disabledTests: ['has-docblock', 'has-top-level-file', 'component-has-static-classnames-object'],
  // });

  /*
   * Group-marker invariant, asserted by hand because this file's isConformant call is
   * commented out for a pre-existing, non-styling reason ("to prevent out of memory"), which
   * means `component-has-group-marker` never runs for Attachment.
   */
  it('stamps its group marker and never emits it as classList[0]', () => {
    const { container } = render(<Attachment>Actionable</Attachment>);
    const root = container.firstChild as HTMLElement;

    expect(root.classList.contains('group/fui-attachment')).toBe(true);
    expect(root.classList[0]).not.toMatch(/^(group|peer)\//);
    expect(root.classList[0]).toBe(styles.root);
  });

  it('puts the consumer className last', () => {
    const { container } = render(<Attachment className="consumer-wins">Actionable</Attachment>);
    const classNames = Array.from((container.firstChild as HTMLElement).classList);

    expect(classNames[classNames.length - 1]).toBe('consumer-wins');
  });

  it('applies the actionable slice only when actionable', () => {
    const { container, rerender } = render(<Attachment>Actionable</Attachment>);
    expect(container.firstChild).not.toHaveClass(styles.actionable);

    rerender(<Attachment actionable>Actionable</Attachment>);
    expect(container.firstChild).toHaveClass(styles.actionable);
  });

  /* VR blind-spot probe: the progress sub-tree only renders for a numeric `progress`. */
  it('renders the progress sub-tree with its module classes and the runtime inline width', () => {
    const { container } = render(<Attachment progress={40}>Actionable</Attachment>);
    const progressContainer = container.querySelector<HTMLElement>('.' + styles['progress-container']);

    expect(progressContainer).not.toBeNull();
    const progressBar = progressContainer!.firstChild as HTMLElement;
    expect(progressBar).toHaveClass(styles['progress-bar']);
    // Plain React inline style, untouched by the conversion (specials-triage §3 A6).
    expect(progressBar.style.width).toBe('40%');
  });

  it('renders no progress sub-tree without a numeric progress', () => {
    const { container } = render(<Attachment>Actionable</Attachment>);

    expect(container.querySelector('.' + styles['progress-container'])).toBeNull();
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
