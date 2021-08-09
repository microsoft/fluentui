import { fluentTabs } from './index';

export default {
  title: 'Components/Tabs',
  components: fluentTabs,
  argTypes: {
    activeIndicator: {
      control: { type: 'boolean' },
    },
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
  },
};

const TabsTemplate = ({ activeId, activeIndicator, orientation }) => `
<fluent-tabs
  orientation="${orientation}"
  activeIndicator="${activeIndicator}"
  activeId="${activeId}"
>
  <fluent-tab id="TabOne">Tab one</fluent-tab>
  <fluent-tab id="TabTwo">Tab two</fluent-tab>
  <fluent-tab id="TabThree">Tab three</fluent-tab>
  <fluent-tab-panel> Tab one content. This is for testing. </fluent-tab-panel>
  <fluent-tab-panel> Tab two content. This is for testing. </fluent-tab-panel>
  <fluent-tab-panel> Tab three content. This is for testing. </fluent-tab-panel>
</fluent-tabs>`;

export const Tabs = TabsTemplate.bind({});

Tabs.args = {
  activeId: 'TabTwo',
  activeIndicator: true,
  orientation: 'vertical',
};
