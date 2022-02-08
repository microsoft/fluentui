import * as React from 'react';
import { Popup } from './Popup';
import { isConformant } from '../../common/isConformant';
import { render } from '@testing-library/react';
import { resetIds } from '../../Utilities';

describe('Popup', () => {
  afterAll(() => {
    resetIds();
  });

  isConformant({
    Component: Popup,
    displayName: 'Popup',
  });

  it('defaults to enableAriaHiddenSiblings=true', () => {
    const { getByText } = render(
      <div>
        <div>sibling</div>
        <Popup>content</Popup>
      </div>,
    );

    const bodyChildren = Array.from(document.body.childNodes) as HTMLElement[];

    const content = getByText('content');
    const contentParent = bodyChildren.find(el => el.contains(content));
    expect(contentParent).toBeTruthy();
    expect(contentParent!.getAttribute('aria-hidden')).toBeNull();

    for (const node of bodyChildren) {
      if (node !== contentParent) {
        expect(node.getAttribute('aria-hidden')).toBe('true');
      }
    }
  });

  it('respects enableAriaHiddenSiblings=false', () => {
    const { queryByText } = render(
      <div>
        <div>sibling</div>
        <Popup enableAriaHiddenSiblings={false}>content</Popup>
      </div>,
    );

    expect(queryByText('content')).toBeTruthy(); // verify it's open

    const bodyChildren = Array.from(document.body.childNodes) as HTMLElement[];
    for (const node of bodyChildren) {
      expect(node.getAttribute('aria-hidden')).toBeNull();
    }
  });
});
