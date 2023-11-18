import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { axe, toHaveNoViolations } from 'jest-axe';
import { EmptyThemeProvider } from 'test/utils';

type AxeMatcher<R> = jest.Matchers<R, any> & {
  toHaveNoViolations: () => R;
};

interface AxeExpect extends jest.Expect {
  (object: any): AxeMatcher<void>;
}

const expectAxe = expect as AxeExpect;
expect.extend(toHaveNoViolations);

export const htmlIsAccessibilityCompliant = async (jsx: React.ReactElement<any>) => {
  const html = ReactDOMServer.renderToString(React.createElement(EmptyThemeProvider, null, jsx));
  const results = await axe(html, {
    rules: { region: { enabled: false } },
  });
  expectAxe(results).toHaveNoViolations();
};
