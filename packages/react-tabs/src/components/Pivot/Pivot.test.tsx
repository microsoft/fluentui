import * as React from 'react';
import { create } from '@uifabric/utilities/lib/test';
import { mount } from 'enzyme';
import { resetIds } from '@uifabric/utilities';
import { Pivot, PivotItem, IPivot } from './index';

describe('Pivot', () => {
  beforeEach(() => {
    // Resetting ids to create predictability in generated ids.
    resetIds();
  });
  it('renders link Pivot correctly', () => {
    const component = create(
      <Pivot>
        <PivotItem headerText="Test Link 1" />
        <PivotItem headerText="" />
      </Pivot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can be focused', () => {
    const pivotRef = React.createRef<IPivot>();

    mount(
      <Pivot componentRef={pivotRef}>
        <PivotItem headerText="Link 1" />
        <PivotItem headerText="Link 2" />
      </Pivot>,
    );

    // Instruct FocusZone to treat all elements as visible.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (HTMLElement.prototype as any).isVisible = true;

    try {
      expect(pivotRef.current).toBeTruthy();

      pivotRef.current!.focus();
      expect(document.activeElement).toBeTruthy();
      expect(document.activeElement!.textContent?.trim()).toEqual('Link 1');
    } finally {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (HTMLElement.prototype as any).isVisible;
    }
  });

  it('supports JSX expressions', () => {
    const component = create(
      <Pivot defaultSelectedKey="1">
        <PivotItem headerText="Test Link 1">
          <div>This is item 1</div>
        </PivotItem>
        {false && <PivotItem headerText="Test Link 2" />}
        <PivotItem headerText="Test Link 3">
          <div>This is Item 3</div>
        </PivotItem>
      </Pivot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders large link Pivot correctly', () => {
    const component = create(
      <Pivot linkSize="large">
        <PivotItem headerText="Test Link 1" />
        <PivotItem headerText="" />
      </Pivot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders tabbed Pivot correctly', () => {
    const component = create(
      <Pivot linkFormat="tabs">
        <PivotItem headerText="Test Link 1" />
        <PivotItem headerText="" />
      </Pivot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders large tabbed Pivot correctly', () => {
    const component = create(
      <Pivot linkFormat="tabs" linkSize="large">
        <PivotItem headerText="Test Link 1" />
        <PivotItem headerText="" />
      </Pivot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders Pivot correctly with custom className', () => {
    const component = create(
      <Pivot className="specialClassName">
        <PivotItem headerText="Test Link 1" className="specialClassName" />
        <PivotItem headerText="Test Link 2" />
      </Pivot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders Pivot correctly with icon, text and count', () => {
    const component = create(
      <Pivot>
        <PivotItem itemCount={12} />
        <PivotItem headerText="Test Link" itemCount={12} />
        <PivotItem headerText="Text with icon" itemIcon="Recent" />
      </Pivot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders Pivot correctly when itemCount is a string', () => {
    const component = create(
      <Pivot>
        <PivotItem headerText="test" />
        <PivotItem headerText="Test Link" itemCount="20+" />
      </Pivot>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
