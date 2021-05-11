import * as React from 'react';

import { createComponent } from 'src/utils';

describe('createComponent', () => {
  describe('className', () => {
    it('defines static className prop for result component type', () => {
      const TestComponent = createComponent({
        displayName: 'TestComponent',
        className: 'ui-test-component',
        render: () => <div>Hello</div>,
      });

      expect(TestComponent.deprecated_className).toBe('ui-test-component');
    });

    it('sets default className value if not provided by client', () => {
      const TestComponent = createComponent({
        displayName: 'TestComponent',
        render: () => <div>Hello</div>,
      });

      expect(TestComponent.deprecated_className).toBe('fluent-ui-component');
    });
  });
});
