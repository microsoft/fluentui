import * as React from 'react';
import { usePositioning, resolvePositioningShorthand } from '@fluentui/react-headless-components-preview/positioning';
import type { PositioningShorthand } from '@fluentui/react-headless-components-preview/positioning';

type InlineAnchoredProps = {
  positioning?: PositioningShorthand;
  trigger: React.ReactElement<{ ref?: React.Ref<HTMLElement> }>;
  surfaceClassName?: string;
  children: React.ReactNode;
};

// Anchored surface that uses `usePositioning` without the native
// `popover="auto"` top-layer. The surface stays in DOM order, so
// `position-try-fallbacks` flips against the demo box's containing block
// (e.g. `contain: layout`) instead of the viewport — which is what the
// flip demos illustrate.
export const InlineAnchored = ({
  positioning,
  trigger,
  surfaceClassName,
  children,
}: InlineAnchoredProps): React.ReactElement => {
  const { targetRef, containerRef } = usePositioning(resolvePositioningShorthand(positioning));
  return (
    <>
      {React.cloneElement(trigger, { ref: targetRef })}
      <div ref={containerRef} className={surfaceClassName}>
        {children}
      </div>
    </>
  );
};
