import * as React from 'react';
import { Breadcrumb, BreadcrumbButton, BreadcrumbItem, BreadcrumbDivider } from '@fluentui/react-breadcrumb';
import { bundleIcon, CalendarMonth20Filled, CalendarMonth20Regular } from '@fluentui/react-icons';
import { SampleBreadcrumbButtons, steps } from './utils';
import type { Meta } from '@storybook/react-webpack5';
import { Steps } from 'storywright';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST, RTL } from '../../utilities';
import type { StoryParameters } from 'storywright';

const CalendarMonth = bundleIcon(CalendarMonth20Filled, CalendarMonth20Regular);

export default {
  title: 'Breadcrumb Converged',
  parameters: { storyWright: { steps } } satisfies StoryParameters,
} satisfies Meta<typeof Breadcrumb>;

export const Appearance = () => (
  <>
    <h1>BreadcrumbButton</h1>
    <SampleBreadcrumbButtons />
  </>
);

Appearance.storyName = 'appearance';

export const AppearanceDarkMode = getStoryVariant(Appearance, DARK_MODE);
export const AppearanceHighContrast = getStoryVariant(Appearance, HIGH_CONTRAST);
export const AppearanceRTL = getStoryVariant(Appearance, RTL);

export const Size = () => (
  <>
    <SampleBreadcrumbButtons size="small" />
    <SampleBreadcrumbButtons size="medium" />
    <SampleBreadcrumbButtons size="large" />
  </>
);

Size.storyName = 'size';

/*
 * S-J state-matrix stories (migration/griffel-to-tailwind/reports/griffel-zero-plan.md §2.2):
 * BreadcrumbButton's own bundled-icon rules are the `current` swap-BACKs — a current entry
 * must NEVER swap to the filled glyph, even though the underlying react-button `subtle`
 * hover/pressed rules on the very same element want to show it (the 0-3-0-over-0-2-0 winner
 * documented in BreadcrumbButton.module.css). The `appearance`/`size` stories above put the
 * icon on a NON-current entry, so the contention had no pixel evidence. Hover/pressed pin
 * the hover swap-back; the disabled story pins the `current` + `disabled` branch.
 */
const currentSteps = new Steps()
  .snapshot('default')
  .hover('.current-target')
  .snapshot('hover')
  .mouseDown('.current-target')
  .snapshot('pressed')
  .mouseUp('.current-target')
  .end();

export const CurrentWithIcon = () => (
  <Breadcrumb>
    <BreadcrumbItem>
      <BreadcrumbButton>Item 1</BreadcrumbButton>
    </BreadcrumbItem>
    <BreadcrumbDivider />
    <BreadcrumbItem>
      <BreadcrumbButton className="current-target" current icon={<CalendarMonth />}>
        Item 2
      </BreadcrumbButton>
    </BreadcrumbItem>
  </Breadcrumb>
);
CurrentWithIcon.storyName = 'current with icon';
CurrentWithIcon.parameters = { storyWright: { steps: currentSteps } } satisfies StoryParameters;

export const CurrentDisabledWithIcon = () => (
  <Breadcrumb>
    <BreadcrumbItem>
      <BreadcrumbButton>Item 1</BreadcrumbButton>
    </BreadcrumbItem>
    <BreadcrumbDivider />
    <BreadcrumbItem>
      <BreadcrumbButton className="current-target" current disabled icon={<CalendarMonth />}>
        Item 2
      </BreadcrumbButton>
    </BreadcrumbItem>
  </Breadcrumb>
);
CurrentDisabledWithIcon.storyName = 'current disabled with icon';
CurrentDisabledWithIcon.parameters = { storyWright: { steps: currentSteps } } satisfies StoryParameters;
