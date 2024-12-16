/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { MenuPopoverSlots, MenuPopoverState } from './MenuPopover.types';
import { Portal } from '@fluentui/react-portal';
import { Fade } from '@fluentui/react-motion-components-preview';

/**
 * Render the final JSX of MenuPopover
 */
export const renderMenuPopover_unstable = (state: MenuPopoverState) => {
  assertSlots<MenuPopoverSlots>(state);

  const surface = (
    <Fade visible={state.open}>
      <state.root />
    </Fade>
  );

  if (state.inline) {
    return surface;
  }

  return <Portal mountNode={state.mountNode}>{surface}</Portal>;
};
