import * as React from 'react';

import type { ReactAccessibilityBehavior } from '../accessibility/types';
import { FocusZone } from '../FocusZone/FocusZone';

export function wrapWithFocusZone(
  definition: ReactAccessibilityBehavior,
  element: React.ReactElement & React.RefAttributes<any>,
): React.ReactElement {
  if (definition.focusZone) {
    let child: React.ReactElement & React.RefAttributes<any> = element;

    if (process.env.NODE_ENV !== 'production') {
      child = React.Children.only(element);
    }

    return (
      <FocusZone
        {...definition.focusZone.props}
        {...child.props}
        as={child.type}
        innerRef={child.ref}
        isRtl={definition.rtl}
      />
    );
  }

  return element;
}
