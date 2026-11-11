import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { Toaster, ToastTitle, Toast, useToastController, toasterClassNames } from '../..';
import type { JSXElement } from '@fluentui/react-utilities';
import type { ToastOffset, ToastPosition } from '../../state';

const mount = (element: JSXElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>, {
    strict: false, // TODO: Disable strict mode for toast tests until it gets fixed
  });
};

const Example = ({ offset, position }: { offset?: ToastOffset; position?: ToastPosition }) => {
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

const expectInsideViewport = () => {
  cy.get(`.${toasterClassNames.root}`).should($root => {
    const root = $root[0];
    const { left, right } = root.getBoundingClientRect();
    // The application viewport, not the Cypress runner window. `cy.viewport` resizes the AUT
    // iframe, so `window.innerWidth` here would be the runner's width and could hide an overflow.
    const viewportWidth = root.ownerDocument.defaultView!.innerWidth;

    expect(left, 'the toaster does not start before the left edge').to.be.at.least(0);
    expect(right, 'the toaster does not end after the right edge').to.be.at.most(viewportWidth);
  });
};

describe('Toaster', () => {
  it('fits inside a viewport narrower than the toast', () => {
    mount(<Example />);

    // A viewport narrower than the 292px toast width.
    cy.viewport(280, 400);
    cy.get('button').click();

    expectInsideViewport();
  });

  it('fits inside a narrow viewport with a horizontal offset wider than the default gutter', () => {
    // The default offset is 20px, so a cap derived from it is 40px. At 60px the old hardcoded
    // 40px cap put the left edge 20px outside the viewport.
    mount(<Example offset={{ horizontal: 60 }} />);

    cy.viewport(280, 400);
    cy.get('button').click();

    expectInsideViewport();
  });

  it('fits inside a narrow viewport for a centered toast with a horizontal offset', () => {
    // A centered toast is shifted by the offset and keeps its own width, so it overflows on one
    // side. At 32px the old hardcoded 40px cap put the right edge 12px outside the viewport.
    mount(<Example offset={{ horizontal: 32 }} position="bottom" />);

    cy.viewport(280, 400);
    cy.get('button').click();

    expectInsideViewport();
  });
});
