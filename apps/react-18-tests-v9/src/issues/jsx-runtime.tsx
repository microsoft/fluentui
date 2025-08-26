/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
import {
  Button,
  useButton_unstable as useButton,
  useButtonStyles_unstable as useButtonStyles,
} from '@fluentui/react-components';
import type { ButtonProps, ButtonSlots, ButtonState, ForwardRefComponent } from '@fluentui/react-components';
import { assertSlots } from '@fluentui/react-utilities';

// Minimal recomposition example: reuse the official state hook, provide a custom render
// that always places the icon AFTER the button's children.
const renderIconAfterButton = (state: ButtonState) => {
  assertSlots<ButtonSlots>(state);
  return (
    <state.root>
      {/* children first */}
      {state.root.children}
      {/* then the icon (if provided) */}
      {state.icon && <state.icon />}
    </state.root>
  );
};

export const RecomposedButton: ForwardRefComponent<ButtonProps> = React.forwardRef((props, ref) => {
  const state = useButton(props, ref);
  // Keep default Fluent styles
  useButtonStyles(state);
  return renderIconAfterButton(state);
});

const StarIcon = () => <span>★</span>;

// Public demo: compare default render vs recomposed render ordering
export const RecompositionDemo = () => (
  <div style={{ display: 'flex', gap: 12 }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div>
        <strong>Default Button (icon before)</strong>
      </div>
      <Button appearance="primary" icon={<StarIcon />}>
        Click me
      </Button>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div>
        <strong>Recomposed (icon after)</strong>
      </div>
      <RecomposedButton appearance="primary" icon={<StarIcon />}>
        Click me
      </RecomposedButton>
    </div>
  </div>
);
