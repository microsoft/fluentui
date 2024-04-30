export {
  // eslint-disable-next-line deprecation/deprecation
  useARIAButtonShorthand,
  useARIAButtonProps,
} from './button/index';
export {
  useActiveDescendant,
  ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE,
  ActiveDescendantContextProvider,
  useActiveDescendantContext,
  useHasParentActiveDescendantContext,
  ActiveDescendantChangeEvent,
} from './activedescendant';
export type {
  ActiveDescendantImperativeRef,
  ActiveDescendantOptions,
  ActiveDescendantContextValue,
} from './activedescendant';
export type {
  ARIAButtonSlotProps,
  ARIAButtonProps,
  ARIAButtonResultProps,
  ARIAButtonType,
  ARIAButtonElement,
  ARIAButtonElementIntersection,
  ARIAButtonAlteredProps,
} from './button/index';

export {
  AriaLiveAnnouncer,
  renderAriaLiveAnnouncer_unstable,
  useAriaLiveAnnouncer_unstable,
  useAriaLiveAnnouncerContextValues_unstable,
} from './AriaLiveAnnouncer/index';
export type { AriaLiveAnnouncerProps, AriaLiveAnnouncerState } from './AriaLiveAnnouncer/index';
