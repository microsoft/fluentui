import { render } from '@testing-library/react';
import * as React from 'react';

describe('', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(noop);
  });

  // describe('FluentProvider in React 18', () => {
  //   it('applies matching className in strict mode', () => {
  //     const { getByText } = render(
  //       <React.StrictMode>
  //         <FluentProvider>Test</FluentProvider>
  //       </React.StrictMode>,
  //     );
  //     const element = getByText('Test');
  //     const elementProviderClassName = element.className.split(' ')[1];
  //     const matchingStyleTag = document.getElementById(elementProviderClassName);

  //     expect(matchingStyleTag).toBeDefined;
  //   });
  // });
});
