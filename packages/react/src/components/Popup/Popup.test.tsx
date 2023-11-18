import * as React from 'react';
import { Popup } from './Popup';
import { isConformant } from '../../common/isConformant';
import { render } from '@testing-library/react';
import { resetIds } from '../../Utilities';
import { expectNoHiddenParents } from '../../common/testUtilities';

describe('Popup', () => {
  afterAll(() => {
    resetIds();
  });

  isConformant({
    Component: Popup,
    displayName: 'Popup',
  });

  it('defaults to enableAriaHiddenSiblings=true if aria-modal=true', () => {
    // note: this test works properly because Popup does NOT render inside a Layer (portal)
    const { getByText } = render(
      <>
        <div id="sibling">sibling</div>
        <Popup aria-modal>content</Popup>
      </>,
    );

    expectNoHiddenParents(getByText('content'));

    expect(getByText('sibling').getAttribute('aria-hidden')).toBe('true');
  });

  it('respects enableAriaHiddenSiblings=false even if aria-modal=true', () => {
    const { getByText } = render(
      <>
        <div id="sibling">sibling</div>
        <Popup aria-modal enableAriaHiddenSiblings={false}>
          content
        </Popup>
      </>,
    );

    expectNoHiddenParents(getByText('content'));

    expect(getByText('sibling').getAttribute('aria-hidden')).toBeNull();
  });

  it('ignores enableAriaHiddenSiblings=true if aria-modal=false', () => {
    const { getByText } = render(
      <>
        <div id="sibling">sibling</div>
        <Popup enableAriaHiddenSiblings aria-modal={false}>
          content
        </Popup>
      </>,
    );

    expectNoHiddenParents(getByText('content'));

    expectNoHiddenParents(getByText('sibling'));
  });
});
