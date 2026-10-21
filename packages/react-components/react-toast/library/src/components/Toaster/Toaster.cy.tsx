import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';

import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { Toaster, ToastTitle, Toast, useToastController, toasterClassNames } from '../..';
import type { JSXElement } from '@fluentui/react-utilities';

const mount = (element: JSXElement) => {
  mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>, {
    strict: false, // TODO: Disable strict mode for toast tests until it gets fixed
  });
};

describe('Toaster', () => {
  it('fits inside a viewport narrower than the toast', () => {
    const Example = () => {
      const { dispatchToast } = useToastController();

      return (
        <>
          <button
            onClick={() =>
              dispatchToast(
                <Toast>
                  <ToastTitle>A toast title that is longer than the narrow viewport</ToastTitle>
                </Toast>,
                { timeout: -1 },
              )
            }
          >
            Make toast
          </button>
          <Toaster />
        </>
      );
    };

    mount(<Example />);

    // A viewport narrower than the 292px toast width.
    cy.viewport(280, 400);
    cy.get('button').click();

    cy.get(`.${toasterClassNames.root}`).should($root => {
      const { left, right } = $root[0].getBoundingClientRect();
      expect(left, 'the toaster does not start before the left edge').to.be.at.least(0);
      expect(right, 'the toaster does not end after the right edge').to.be.at.most(window.innerWidth);
    });
  });
});
