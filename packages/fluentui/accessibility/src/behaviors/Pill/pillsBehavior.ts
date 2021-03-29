import { Accessibility } from '../../types';
import { FocusZoneDirection } from '../../focusZone/types';
import { pillOptionBehavior } from './pillOptionBehavior';

export const pillsBehavior: Accessibility<PillsBehaviorProps> = () => ({
  attributes: {
    root: {
      role: 'listbox',
      tabIndex: -1,
    },
  },
  childBehaviors: {
    pill: pillOptionBehavior,
  },
  focusZone: {
    props: {
      shouldFocusInnerElementWhenReceivedFocus: true,
      direction: FocusZoneDirection.bidirectionalDomOrder,
    },
  },
});

export type PillsBehaviorProps = never;
