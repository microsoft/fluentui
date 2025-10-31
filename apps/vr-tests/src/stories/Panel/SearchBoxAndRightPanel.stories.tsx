import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';
import { Panel, PanelType, SearchBox } from '@fluentui/react';

const defaultProps = {
  isOpen: true,
  children: 'Content goes here',
};

export default {
  title: 'Panel',

  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default').click('.ms-SearchBox-field').snapshot('click').end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof SearchBoxAndRightPanel>;

export const SearchBoxAndRightPanel = () => (
  <div>
    <SearchBox placeholder="Search" />
    <Panel
      {...defaultProps}
      isOpen={false}
      type={PanelType.medium}
      headerClassName=""
      headerText={'Header'}
      isHiddenOnDismiss
    >
      {null}
    </Panel>
  </div>
);
SearchBoxAndRightPanel.storyName = 'SearchBox and Right Panel';

export const SearchBoxAndRightPanelRTL = getStoryVariant(SearchBoxAndRightPanel, RTL);
