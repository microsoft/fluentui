import * as React from 'react';

import { FocusTrapZone } from '@fluentui/react';
import { BadgeProps, useTabsterUncontrolled } from '@fluentui/react-components';

export const Default = (props: BadgeProps) => {
  const attr = useTabsterUncontrolled();
  return (
    <>
      <FocusTrapZone {...attr} isClickableOutsideFocusTrap forceFocusInsideTrap={false}>
        <button>test</button>
        <button>test 2</button>
      </FocusTrapZone>
      <button>outside</button>
    </>
  );
};
