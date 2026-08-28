import * as React from 'react';
import {
  FluentProvider,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarRadioButton,
  ToolbarRadioGroup,
  ToolbarToggleButton,
} from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import styles from '../compare.module.css';

// Bundled pair: a checked toolbar toggle swaps regular → filled via data-fui-icon-variant.
const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const sizes = ['small', 'medium', 'large'] as const;
const appearances = ['primary', 'subtle', 'transparent'] as const;

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      <div className={styles.row}>
        {sizes.map(size => (
          <Toolbar key={size} size={size} aria-label={`${size} toolbar`}>
            <ToolbarButton icon={<CalendarMonth />}>{size}</ToolbarButton>
            <ToolbarDivider />
            <ToolbarButton icon={<CalendarMonth />} aria-label="Calendar" />
          </Toolbar>
        ))}
      </div>

      <div className={styles.row}>
        {appearances.map(appearance => (
          <Toolbar key={appearance} aria-label={`${appearance} toolbar`}>
            <ToolbarButton appearance={appearance} icon={<CalendarMonth />}>
              {appearance}
            </ToolbarButton>
            <ToolbarButton appearance={appearance} icon={<CalendarMonth />} disabled>
              Disabled
            </ToolbarButton>
          </Toolbar>
        ))}
      </div>

      <div className={styles.row}>
        <Toolbar vertical aria-label="Vertical toolbar">
          <ToolbarButton icon={<CalendarMonth />}>First</ToolbarButton>
          <ToolbarDivider />
          <ToolbarButton icon={<CalendarMonth />}>Second</ToolbarButton>
        </Toolbar>

        <Toolbar aria-label="Vertical buttons">
          <ToolbarButton vertical icon={<CalendarMonth />}>
            Stacked
          </ToolbarButton>
          <ToolbarButton vertical icon={<CalendarMonth />} aria-label="Calendar" />
        </Toolbar>
      </div>

      <div className={styles.row}>
        <Toolbar defaultCheckedValues={{ style: ['bold'] }} aria-label="Toggle toolbar">
          <ToolbarToggleButton name="style" value="bold" icon={<CalendarMonth />}>
            Bold
          </ToolbarToggleButton>
          <ToolbarToggleButton name="style" value="italic" icon={<CalendarMonth />}>
            Italic
          </ToolbarToggleButton>
        </Toolbar>

        <Toolbar defaultCheckedValues={{ align: ['start'] }} aria-label="Radio toolbar">
          <ToolbarRadioGroup>
            <ToolbarRadioButton name="align" value="start" icon={<CalendarMonth />}>
              Start
            </ToolbarRadioButton>
            <ToolbarRadioButton name="align" value="end" icon={<CalendarMonth />}>
              End
            </ToolbarRadioButton>
          </ToolbarRadioGroup>
        </Toolbar>
      </div>

      <Toolbar style={{ width: 420, justifyContent: 'space-between' }} aria-label="Far group toolbar">
        <ToolbarGroup>
          <ToolbarButton icon={<CalendarMonth />}>Near</ToolbarButton>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarButton icon={<CalendarMonth />}>Far</ToolbarButton>
        </ToolbarGroup>
      </Toolbar>
    </div>
  </FluentProvider>
);
