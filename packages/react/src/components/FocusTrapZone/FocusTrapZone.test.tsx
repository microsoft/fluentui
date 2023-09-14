import * as React from 'react';
import { render } from '@testing-library/react';
import { FocusTrapZone } from './FocusTrapZone';
import { isConformant } from '../../common/isConformant';
import { expectNoHiddenParents } from '../../common/testUtilities';

describe('FocusTrapZone', () => {
  isConformant({
    Component: FocusTrapZone,
    displayName: 'FocusTrapZone',
  });

  it('defaults to enableAriaHiddenSiblings=false', () => {
    const { getByText } = render(
      <div>
        <div>sibling</div>
        <FocusTrapZone>
          <button>content</button>
        </FocusTrapZone>
      </div>,
    );

    expectNoHiddenParents(getByText('sibling'));

    expectNoHiddenParents(getByText('content'));
  });

  it('respects enableAriaHiddenSiblings=true', () => {
    const { getByText } = render(
      <div>
        <div>sibling</div>
        <FocusTrapZone enableAriaHiddenSiblings>
          <button>content</button>
        </FocusTrapZone>
      </div>,
    );

    expect(getByText('sibling').getAttribute('aria-hidden')).toBe('true');

    expectNoHiddenParents(getByText('content'));
  });

  it('un-hides siblings when unmounting', () => {
    const { getByText, rerender } = render(
      <div>
        <div>sibling</div>
        <FocusTrapZone enableAriaHiddenSiblings>
          <button>content</button>
        </FocusTrapZone>
      </div>,
    );

    const sibling = getByText('sibling');
    expect(sibling.getAttribute('aria-hidden')).toBe('true');

    rerender(
      <div>
        <div>sibling</div>
      </div>,
    );
    expect(getByText('sibling')).toBe(sibling); // make sure it's the same DOM node
    expect(sibling.getAttribute('aria-hidden')).toBeNull();
  });
});
