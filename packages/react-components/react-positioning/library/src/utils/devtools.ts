import type { MiddlewareState } from '@floating-ui/dom';
import type { PositioningOptions, Position, Alignment } from '../types';
import { isHTMLElement } from '@fluentui/react-utilities';
import { listScrollParents } from './listScrollParents';
import { fromFloatingUIPlacement } from './fromFloatingUIPlacement';

export const devtoolsCallback =
  (options: Pick<PositioningOptions, 'flipBoundary' | 'overflowBoundary'>) =>
  (
    middlewareState: MiddlewareState,
  ): {
    type: 'FluentUIMiddleware';
    middlewareState: MiddlewareState;
    options: Pick<PositioningOptions, 'flipBoundary' | 'overflowBoundary'>;
    initialPlacement: { position: Position; alignment?: Alignment };
    placement: { position: Position; alignment?: Alignment };
    flipBoundaries: HTMLElement[];
    overflowBoundaries: HTMLElement[];
    scrollParents: HTMLElement[];
  } => {
    const {
      elements: { floating, reference },
    } = middlewareState;
    const scrollParentsSet = new Set<HTMLElement>();
    if (isHTMLElement(reference)) {
      listScrollParents(reference).forEach(scrollParent => scrollParentsSet.add(scrollParent));
    }
    listScrollParents(floating).forEach(scrollParent => scrollParentsSet.add(scrollParent));
    const flipBoundaries: HTMLElement[] = Array.isArray(options.flipBoundary)
      ? options.flipBoundary
      : isHTMLElement(options.flipBoundary)
      ? [options.flipBoundary]
      : [];
    const overflowBoundaries: HTMLElement[] = Array.isArray(options.overflowBoundary)
      ? options.overflowBoundary
      : isHTMLElement(options.overflowBoundary)
      ? [options.overflowBoundary]
      : [];
    return {
      type: 'FluentUIMiddleware',
      middlewareState,
      options,
      initialPlacement: fromFloatingUIPlacement(middlewareState.initialPlacement),
      placement: fromFloatingUIPlacement(middlewareState.placement),
      flipBoundaries,
      overflowBoundaries,
      scrollParents: Array.from(scrollParentsSet),
    } as const;
  };
