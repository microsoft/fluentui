import * as React from 'react';
import { create } from '@fluentui/utilities/lib/test';
import { mount } from 'enzyme';
import { resetIds } from '@fluentui/utilities';
import { Tabs, TabItem, TabsImperativeHandle } from './index';
import { isConformant } from '../../common/isConformant';

describe('Tabs', () => {
  beforeEach(() => {
    // Resetting ids to create predictability in generated ids.
    resetIds();
  });
  it('renders tabs as links correctly', () => {
    const component = create(
      <Tabs>
        <TabItem headerText="Test Link 1" />
        <TabItem headerText="" />
      </Tabs>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  isConformant({
    Component: Tabs,
    displayName: 'Tabs',
    skipAsPropTests: true,
  });

  it('can be focused', () => {
    const tabsRef = React.createRef<TabsImperativeHandle>();

    mount(
      <Tabs componentRef={tabsRef}>
        <TabItem headerText="Link 1" />
        <TabItem headerText="Link 2" />
      </Tabs>,
    );

    // Instruct FocusZone to treat all elements as visible.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (HTMLElement.prototype as any).isVisible = true;

    try {
      expect(tabsRef.current).toBeTruthy();

      tabsRef.current!.focus();
      expect(document.activeElement).toBeTruthy();
      expect(document.activeElement!.textContent?.trim()).toEqual('Link 1');
    } finally {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (HTMLElement.prototype as any).isVisible;
    }
  });

  it('supports JSX expressions', () => {
    const component = create(
      <Tabs defaultSelectedKey="1">
        <TabItem headerText="Test Link 1">
          <div>This is item 1</div>
        </TabItem>
        {false && <TabItem headerText="Test Link 2" />}
        <TabItem headerText="Test Link 3">
          <div>This is Item 3</div>
        </TabItem>
      </Tabs>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders large tabs correctly', () => {
    const component = create(
      <Tabs tabSize="large">
        <TabItem headerText="Test Link 1" />
        <TabItem headerText="" />
      </Tabs>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders tab format correctly', () => {
    const component = create(
      <Tabs tabFormat="tabs">
        <TabItem headerText="Test Link 1" />
        <TabItem headerText="" />
      </Tabs>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders large tab format correctly', () => {
    const component = create(
      <Tabs tabFormat="tabs" tabSize="large">
        <TabItem headerText="Test Link 1" />
        <TabItem headerText="" />
      </Tabs>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders Tabs correctly with custom className', () => {
    const component = create(
      <Tabs className="specialClassName">
        <TabItem headerText="Test Link 1" className="specialClassName" />
        <TabItem headerText="Test Link 2" />
      </Tabs>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders Tabs correctly with icon, text and count', () => {
    const component = create(
      <Tabs>
        <TabItem itemCount={12} />
        <TabItem headerText="Test Link" itemCount={12} />
        <TabItem headerText="Text with icon" itemIcon="Recent" />
      </Tabs>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders Tabs correctly when itemCount is a string', () => {
    const component = create(
      <Tabs>
        <TabItem headerText="test" />
        <TabItem headerText="Test Link" itemCount="20+" />
      </Tabs>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders Tabs with overflow', () => {
    const component = create(
      <Tabs overflowBehavior="menu">
        <TabItem headerText="Test 1" />
        <TabItem headerText="Test 2" />
      </Tabs>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
