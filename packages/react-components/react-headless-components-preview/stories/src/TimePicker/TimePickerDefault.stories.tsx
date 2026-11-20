import * as React from 'react';
import { TimePicker } from '@fluentui/react-headless-components-preview/time-picker';
import { Tooltip } from '@fluentui/react-headless-components-preview/tooltip';
import { ClockRegular, DismissRegular } from '@fluentui/react-icons';
import styles from './timepicker.module.css';
import tooltipStyles from '../Tooltip/tooltip.module.css';

export const Default = (): React.ReactNode => {
  return (
    <div className={styles.demo}>
      <label className={styles.label} htmlFor="timepicker-default">
        Meeting time
      </label>
      <TimePicker
        id="timepicker-default"
        root={{ className: styles.root }}
        input={{ className: styles.input }}
        listbox={{ className: styles.listbox }}
        placeholder="Select a time"
        clearable
        startHour={8}
        endHour={18}
        increment={15}
        expandIcon={{ className: styles.expandIcon, children: <ClockRegular /> }}
        clearIcon={{
          className: styles.clearIcon,
          'aria-label': 'Clear time',
          // The icon-only Clear button shows its accessible name in a Tooltip.
          children: (ClearIcon: React.ElementType, clearIconProps: React.HTMLAttributes<HTMLSpanElement>) => (
            <Tooltip
              content={{ className: tooltipStyles.content, children: 'Clear time' }}
              relationship="label"
              positioning={{ offset: 8 }}
            >
              <ClearIcon {...clearIconProps}>
                <DismissRegular />
              </ClearIcon>
            </Tooltip>
          ),
        }}
      />
    </div>
  );
};

Default.parameters = {
  docs: {
    description: {
      story:
        'Type a time, or open the list with the arrow keys or the clock icon. Typing filters the suggested times. ' +
        'Once a time is set, the Clear button replaces the clock icon; it is a tab stop with a Tooltip that shows its name.',
    },
  },
};
