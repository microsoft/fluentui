import type * as Canonical from '@fluentui/react-positioning';
import type * as Headless from './types';

/**
 * The public types are the ones of `@fluentui/react-positioning`, this fails to compile when they diverge.
 */
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
const assertEqual = <A, B>(_equal: Equal<A, B>) => undefined;

describe('positioning types', () => {
  it('are the types of @fluentui/react-positioning', () => {
    assertEqual<Headless.PositioningProps, Canonical.PositioningProps>(true);
    assertEqual<Headless.PositioningShorthand, Canonical.PositioningShorthand>(true);
    assertEqual<Headless.PositioningShorthandValue, Canonical.PositioningShorthandValue>(true);
    assertEqual<Headless.Position, Canonical.Position>(true);
    assertEqual<Headless.Alignment, Canonical.Alignment>(true);
    assertEqual<Headless.Offset, Canonical.Offset>(true);
    assertEqual<Headless.AutoSize, Canonical.AutoSize>(true);
    assertEqual<Headless.PositioningBoundary, Canonical.PositioningBoundary>(true);
    assertEqual<Headless.PositioningImperativeRef, Canonical.PositioningImperativeRef>(true);
    assertEqual<Headless.PositioningVirtualElement, Canonical.PositioningVirtualElement>(true);
    assertEqual<Headless.SetVirtualMouseTarget, Canonical.SetVirtualMouseTarget>(true);
  });
});
