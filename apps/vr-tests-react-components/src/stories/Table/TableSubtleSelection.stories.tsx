import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Table, tableHeaderClassNames } from '@fluentui/react-table';
import { fuiSelector } from '@fluentui/react-utilities';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { SubtleSelection, SubtleSelectionEmpty } from './utils';

/*
 * Statics removal (migration/griffel-to-tailwind/reports/DECISIONS.md D16.1/D16.5).
 * `tableHeaderClassNames.root` is now the Tailwind named-group marker `group/fui-table-header`.
 * The `/` is legal in a class TOKEN but terminates the class name in SELECTOR position, so the
 * former `` `.${tableHeaderClassNames.root}` `` builds an invalid selector that StoryWright's
 * hover step cannot match. `fuiSelector()` escapes it.
 */
const tableHeaderSelector = fuiSelector(tableHeaderClassNames.root);

export default {
  title: 'Table table - subtle selection',
  parameters: {
    storyWright: {
      steps: new Steps()
        .hover('.not-selected')
        .snapshot('hover unselected row')
        .hover(tableHeaderSelector)
        .snapshot('hover header row')
        .end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof Table>;

export const Rest = () => <SubtleSelection noNativeElements={false} />;
Rest.storyName = 'rest';

export const NoSelection = () => <SubtleSelectionEmpty noNativeElements={false} />;
