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
  ${orientation ? `orientation="${orientation}"` : ''}
  ${activeIndicator ? `activeIndicator="${activeIndicator}"` : ''}
  ${activeId ? `activeId="${activeId}"` : ''}
>
  <fluent-tab id="TabOne">Tab one</fluent-tab>
  <fluent-tab id="TabTwo">Tab two</fluent-tab>
  <fluent-tab id="TabThree">Tab three</fluent-tab>
  <fluent-tab-panel>
    Tab one content. This is for testing. Tab three content. This is for testing.
    <br />
    Tab one content. This is for testing.
    <br />
    Tab one content. This is for testing.
    <br />
    Tab one content. This is for testing.
    <br />
    Tab one content. This is for testing.
    <br />
    Tab one content. This is for testing.
    <br />
    Tab one content. This is for testing.
    <br />
    Tab one content. This is for testing.
    <br />
    Tab one content. This is for testing.
    <br />
    Tab one content. This is for testing.
    <br />
    Tab one content. This is for testing.
    <br />
    Tab one content. This is for testing.
    <br />
    Tab one content. This is for testing.
    <br />
  </fluent-tab-panel>
  <fluent-tab-panel> Tab two content. This is for testing. </fluent-tab-panel>
  <fluent-tab-panel>
    Tab three content. This is for testing. Tab three content. This is for testing.
    <br />
    Tab three content. This is for testing.
    <br />
    Tab three content. This is for testing.
    <br />
    Tab three content. This is for testing.
    <br />
    Tab three content. This is for testing.
    <br />
    Tab three content. This is for testing.
    <br />
    Tab three content. This is for testing.
    <br />
    Tab three content. This is for testing.
    <br />
    Tab three content. This is for testing.
    <br />
    Tab three content. This is for testing.
    <br />
    Tab three content. This is for testing.
    <br />
    Tab three content. This is for testing.
    <br />
    Tab three content. This is for testing.
    <br />
  </fluent-tab-panel>
</fluent-tabs>`;

export const Tabs = TabsTemplate.bind({});

Tabs.args = {
  activeId: 'TabTwo',
  activeIndicator: true,
  orientation: 'horizontal',
};

const example = `
<fluent-tabs id="myTab" activeId="TabTwo" orientation="horizontal">
  <fluent-tab id="TabOne">Tab one</fluent-tab>
  <fluent-tab id="TabTwo">Tab two</fluent-tab>
  <fluent-tab id="TabThree">Tab three</fluent-tab>
  <fluent-tab-panel id="TabPanelOne"> Tab one content. This is for testing. </fluent-tab-panel>
  <fluent-tab-panel id="TabPanelTwo"> Tab two content. This is for testing. </fluent-tab-panel>
  <fluent-tab-panel id="TabPanelThree"> Tab three content. This is for testing. </fluent-tab-panel>
  <div>Testing</div>
</fluent-tabs>
`;

Tabs.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
