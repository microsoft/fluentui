/**
 * @jest-environment node
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import { Customizer } from '@fluentui/utilities';
import { createTheme } from '@fluentui/style-utilities';
import { Link } from './Link';

describe('Link (server-side rendering)', () => {
  it('can have the global styles for Link component be disabled', () => {
    const NoClassNamesTheme = createTheme({ disableGlobalClassNames: true });

    expect(
      /ms-Link($| )/.test(
        ReactDOM.renderToStaticMarkup(
          <Customizer settings={{ theme: NoClassNamesTheme }}>
            <Link href="helloworld.html">My Link</Link>
          </Customizer>,
        ),
      ),
    ).toBe(false);
  });
});
