import { Accessibility } from '../../types';
import { FocusZoneDirection } from '../../focusZone/types';

export const pillsBehavior: Accessibility<PillsBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'listbox',
      tabIndex: -1,
    },
  },
  focusZone: {
    props: {
      shouldFocusInnerElementWhenReceivedFocus: true,
      direction: FocusZoneDirection.bidirectionalDomOrder,
    },
  },
});

export type PillsBehaviorProps = never;
