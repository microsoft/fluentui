import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { CompoundButton } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

import styles from './CompoundButtonSize.module.css';

export const Size = (): JSXElement => {
  return (
    <div className={styles.wrapper}>
      <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content" size="small">
        Size: small
      </CompoundButton>
      <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content" size="medium">
        Size: medium
      </CompoundButton>
      <CompoundButton icon={<CalendarMonthRegular />} secondaryContent="Secondary content" size="large">
        Size: large
      </CompoundButton>
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'A compound button supports `small`, `medium` and `large` size. Default size is `medium`.',
    },
  },
};
