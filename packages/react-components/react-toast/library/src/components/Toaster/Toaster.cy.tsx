import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { Toaster, ToastTitle, Toast, useToastController, toastClassNames, toasterClassNames } from '../..';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ToastOffset, ToastPosition } from '../../state';

const mount = (element: JSXElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>, {
    strict: false, // TODO: Disable strict mode for toast tests until it gets fixed
  });
};

// Narrower than the 292px Toaster
const VIEWPORT_WIDTH = 280;
// The default horizontal offset, which is also the space the Toaster keeps free at the far edge
const GUTTER = 20;

const Example = ({ offset, position }: { offset?: ToastOffset; position: ToastPosition }) => {
  const { dispatchToast } = useToastController();

  return (
    <>
      <button
        onClick={() =>
          dispatchToast(
            <Toast>
              <ToastTitle>A toast title that is longer than the narrow viewport</ToastTitle>
            </Toast>,
            { timeout: -1, position },
          )
        }
      >
        Make toast
      </button>
      <Toaster offset={offset} />
    </>
  );
};

const mountInNarrowViewport = (position: ToastPosition, offset?: ToastOffset) => {
  cy.viewport(VIEWPORT_WIDTH, 400);
  mount(<Example offset={offset} position={position} />);
  cy.contains('button', 'Make toast').click();
};

/**
 * Space between the element and the left and right edges of the viewport. `clientWidth` of the root element is
 * the width that a fixed element is laid out in, so it leaves out a scrollbar.
 */
const getGutters = (element: HTMLElement) => {
  const { left, right } = element.getBoundingClientRect();

  return { left, right: element.ownerDocument.documentElement.clientWidth - right };
};

describe('Toaster', () => {
  (
    [
      ['bottom-end', undefined],
      ['bottom-end', 60],
      ['bottom-start', undefined],
      ['bottom-start', 0],
      ['top-end', 32],
      ['top-start', 60],
      ['bottom', undefined],
      ['bottom', 32],
      ['top', -32],
    ] as const
  ).forEach(([position, horizontal]) => {
    const offset = horizontal === undefined ? undefined : { horizontal };
    const withOffset = horizontal === undefined ? 'the default offset' : `a horizontal offset of ${horizontal}`;

    it(`should keep a ${position} toast inside a narrow viewport with ${withOffset}`, () => {
      mountInNarrowViewport(position, offset);

      [toasterClassNames.root, toastClassNames.root].forEach(className => {
        cy.get(`.${className}`).should($element => {
          const gutters = getGutters($element[0]);
          // The Toaster keeps its offset at its own edge and the default gutter at the far edge.
          // A centered Toaster keeps the default gutter at both edges.
          const expected = {
            left: position.endsWith('start') ? horizontal ?? GUTTER : GUTTER,
            right: position.endsWith('end') ? horizontal ?? GUTTER : GUTTER,
          };

          expect(gutters.left, `${className} left gutter`).to.be.at.least(expected.left);
          expect(gutters.right, `${className} right gutter`).to.be.at.least(expected.right);
        });
      });
    });
  });

  it('should leave the gutter of a narrow viewport free for pointer events', () => {
    mountInNarrowViewport('bottom-end');

    cy.get(`.${toastClassNames.root}`).should($toast => {
      const toast = $toast[0];
      const { top, bottom } = toast.getBoundingClientRect();
      const y = (top + bottom) / 2;
      const elementInToast = toast.ownerDocument.elementFromPoint(GUTTER * 2, y);
      const elementInGutter = toast.ownerDocument.elementFromPoint(GUTTER / 2, y);

      // The first check proves that the toast can be hit at this height, so the second one cannot pass too early
      expect(toast.contains(elementInToast), 'the toast is hit inside its bounds').to.equal(true);
      expect(toast.contains(elementInGutter), 'the toast covers the gutter').to.equal(false);
    });
  });
});
