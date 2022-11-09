import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { AvatarGroupItem } from './AvatarGroupItem';
import { AvatarGroupContext } from '../../contexts';
import { isConformant } from '../../testing/isConformant';

const testId = 'testId';

const ContextWrapper: React.FC = ({ children }) => (
  <AvatarGroupContext.Provider value={{ isOverflow: true }}>{children}</AvatarGroupContext.Provider>
);

describe('AvatarGroupItem', () => {
  isConformant({
    Component: AvatarGroupItem,
    displayName: 'AvatarGroupItem',
    disabledTests: ['make-styles-overrides-win'],
    primarySlot: 'avatar',
    renderOptions: {
      wrapper: ContextWrapper,
    },
  });

  it('renders only an avatar when context provides false for isOverflow', () => {
    render(
      <AvatarGroupContext.Provider value={{ isOverflow: false }}>
        <AvatarGroupItem data-testid={testId} name="Katri Athokas" />
      </AvatarGroupContext.Provider>,
    );

    expect(screen.getByTestId(testId).textContent).toBe('KA');
  });

  it('renders a label and an avatar when context provides true for isOverflow', () => {
    render(
      <AvatarGroupContext.Provider value={{ isOverflow: true }}>
        <AvatarGroupItem name="Katri Athokas" overflowLabel={<span data-testid={testId}>Test Label</span>} />
      </AvatarGroupContext.Provider>,
    );

    expect(screen.getByTestId(testId).textContent).toBe('Test Label');
  });
});
