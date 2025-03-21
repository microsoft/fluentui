import { resetIdsForTests } from '@fluentui/react-utilities';
import { render } from '@testing-library/react';
import * as React from 'react';

import { CustomPopover as Popover } from './Popover';

describe('Popover component with React 18', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(noop);
  });

  afterEach(() => {
    resetIdsForTests();
  });

  describe('FluentProvider', () => {
    it('should apply matching className in strict mode', () => {
      const { getByText } = render(
        <React.StrictMode>
          <Popover />
        </React.StrictMode>,
      );
      const element = getByText('Click Me');
      const elementProviderClassName = element.className.split(' ')[1];
      const matchingStyleTag = document.getElementById(elementProviderClassName);

      expect(matchingStyleTag).toBeDefined();
    });
  });
});
