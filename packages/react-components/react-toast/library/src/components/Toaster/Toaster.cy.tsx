import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { makeStyles } from '@griffel/react';
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

// eslint-disable-next-line @griffel/styles-file
const useStyles = makeStyles({
  narrow: { maxWidth: '200px' },
});

type ExampleProps = {
  offset?: ToastOffset;
  position: ToastPosition;
  /** Limits the Toaster to 200px through `className` */
  narrow?: boolean;
  style?: React.CSSProperties;
};

const Example = ({ offset, position, narrow, style }: ExampleProps) => {
  const { dispatchToast } = useToastController();
  const styles = useStyles();

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
      <Toaster offset={offset} className={narrow ? styles.narrow : undefined} style={style} />
    </>
  );
};

type TwoPositionsProps = {
  offset: ToastOffset;
  style: React.CSSProperties;
};

const TwoPositions = ({ offset, style }: TwoPositionsProps) => {
  const { dispatchToast } = useToastController();
  const makeToast = (position: ToastPosition) =>
    dispatchToast(
      <Toast>
        <ToastTitle>A toast title that is longer than the narrow viewport</ToastTitle>
      </Toast>,
      { timeout: -1, position },
    );

  return (
    <>
      <button
        onClick={() => {
          makeToast('bottom-start');
          makeToast('bottom-end');
        }}
      >
        Make toasts
      </button>
      <Toaster offset={offset} style={style} />
    </>
  );
};

const mountInViewport = (width: number, props: ExampleProps) => {
  cy.viewport(width, 400);
  mount(<Example {...props} />);
  cy.contains('button', 'Make toast').click();
};

const mountInNarrowViewport = (position: ToastPosition, offset?: ToastOffset) => {
  mountInViewport(VIEWPORT_WIDTH, { offset, position });
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

  it('should keep a maxWidth from the style prop in a wide viewport', () => {
    mountInViewport(600, { position: 'bottom-end', style: { maxWidth: 200 } });

    cy.get(`.${toasterClassNames.root}`).should($toaster => {
      expect($toaster[0].getBoundingClientRect().width).to.equal(200);
    });
  });

  it('should keep a maxWidth from className in a wide viewport', () => {
    mountInViewport(600, { position: 'bottom-end', narrow: true });

    cy.get(`.${toasterClassNames.root}`).should($toaster => {
      expect($toaster[0].getBoundingClientRect().width).to.equal(200);
    });
  });

  it('should apply the cap when it is stricter than a maxWidth from the style prop', () => {
    mountInViewport(VIEWPORT_WIDTH, { position: 'bottom-end', style: { maxWidth: 270 } });

    cy.get(`.${toasterClassNames.root}`).should($toaster => {
      const gutters = getGutters($toaster[0]);

      expect(gutters.left, 'left gutter').to.equal(GUTTER);
      expect(gutters.right, 'right gutter').to.equal(GUTTER);
    });
  });

  it('should apply the stricter maxWidth from className in a narrow viewport', () => {
    mountInViewport(VIEWPORT_WIDTH, { position: 'bottom-end', narrow: true });

    cy.get(`.${toasterClassNames.root}`).should($toaster => {
      expect($toaster[0].getBoundingClientRect().width).to.equal(200);
      expect(getGutters($toaster[0]).right, 'right gutter').to.equal(GUTTER);
    });
  });

  it('should position and cap each position on its own when the Toaster has a style prop', () => {
    cy.viewport(VIEWPORT_WIDTH, 400);
    mount(
      <TwoPositions
        offset={{ 'bottom-start': { horizontal: 60 }, 'bottom-end': { horizontal: 20 } }}
        style={{ maxWidth: 270 }}
      />,
    );
    cy.contains('button', 'Make toasts').click();

    cy.get('[data-toaster-position="bottom-start"]').should($toaster => {
      const gutters = getGutters($toaster[0]);

      expect(gutters.left, 'left gutter of bottom-start').to.equal(60);
      expect(gutters.right, 'right gutter of bottom-start').to.equal(GUTTER);
    });
    cy.get('[data-toaster-position="bottom-end"]').should($toaster => {
      const gutters = getGutters($toaster[0]);

      expect(gutters.left, 'left gutter of bottom-end').to.equal(GUTTER);
      expect(gutters.right, 'right gutter of bottom-end').to.equal(GUTTER);
    });
  });
});
