import { useArrowNavigationGroup } from '@fluentui/react-components';

import type { Types as TabsterTypes } from 'tabster';

export const useChatMoverAttribute_unstable = (): TabsterTypes.TabsterDOMAttribute =>
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useArrowNavigationGroup({ axis: 'vertical', unstable_hasDefault: true });
