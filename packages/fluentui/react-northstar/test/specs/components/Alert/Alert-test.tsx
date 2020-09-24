import * as React from 'react';

import {
  isConformant,
  implementsShorthandProp,
  handlesAccessibility,
  htmlIsAccessibilityCompliant,
} from 'test/specs/commonTests';

import { Alert, alertSlotClassNames } from 'src/components/Alert/Alert';
import { Box } from 'src/components/Box/Box';
import { AlertDismissAction } from 'src/components/Alert/AlertDismissAction';

const alertImplementsShorthandProp = implementsShorthandProp(Alert);

describe('Alert', () => {
  isConformant(Alert, { testPath: __filename, constructorName: 'Alert', autoControlledProps: ['visible'] });
  handlesAccessibility(Alert, { defaultRootRole: undefined, requiredProps: { content: 'test' } });
  handlesAccessibility(Alert, {
    defaultRootRole: undefined,
    partSelector: `.${alertSlotClassNames.body}`,
    requiredProps: { content: 'test' },
  });
  handlesAccessibility(Alert, {
    defaultRootRole: 'alert',
    partSelector: `.${alertSlotClassNames.body}`,
    requiredProps: { content: 'test', warning: true },
  });

  alertImplementsShorthandProp('dismissAction', AlertDismissAction, {
    mapsValueToProp: 'content',
    requiredProps: { dismissible: true },
  });
  alertImplementsShorthandProp('content', Box, { mapsValueToProp: 'children' });

  describe('compliance', () => {
    test('default', async () => await htmlIsAccessibilityCompliant(<Alert content="Test" />));

    test('danger', async () => await htmlIsAccessibilityCompliant(<Alert danger content="Test" />));
  });
});
