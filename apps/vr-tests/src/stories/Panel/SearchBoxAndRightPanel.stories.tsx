import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../../utilities';
import { Panel, PanelType, SearchBox } from '@fluentui/react';

const defaultProps = {
  isOpen: true,
  children: 'Content goes here',
};

export default {
  title: 'Panel',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps().snapshot('default').click('.ms-SearchBox-field').snapshot('click').end(),
    ),
  ],
};

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
