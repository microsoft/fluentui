import * as React from 'react';
import { mount } from 'enzyme';
import { resetIds } from '@fluentui/utilities';
import { safeMount, safeCreate } from '@fluentui/test-utilities';
import { Pivot, PivotItem, IPivot } from './index';
import { isConformant } from '../../common/isConformant';

describe('Pivot', () => {
  beforeEach(() => {
    // Resetting ids to create predictability in generated ids.
    resetIds();
  });

  afterEach(() => {
    delete (HTMLElement.prototype as any).isVisible;
  });

  it('renders link Pivot correctly', () => {
    safeCreate(
      <Pivot>
        <PivotItem headerText="Test Link 1" />
        <PivotItem headerText="" />
      </Pivot>,
      component => {
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      },
    );
  });

  isConformant({
    Component: Pivot,
    displayName: 'Pivot',
  });

  it('can be focused', () => {
    const pivotRef = React.createRef<IPivot>();

    // Instruct FocusZone to treat all elements as visible.
    (HTMLElement.prototype as any).isVisible = true;

    safeMount(
      <Pivot componentRef={pivotRef}>
        <PivotItem headerText="Link 1" />
        <PivotItem headerText="Link 2" />
      </Pivot>,
      () => {
        try {
          expect(pivotRef.current).toBeTruthy();

          pivotRef.current!.focus();
          expect(document.activeElement).toBeTruthy();
          expect(document.activeElement!.textContent?.trim()).toEqual('Link 1');
        } finally {
          delete (HTMLElement.prototype as any).isVisible;
        }
      },
      true /* attach, for focus tests */,
    );
  });

  it('supports JSX expressions', () => {
    safeCreate(
      <Pivot defaultSelectedKey="1">
        <PivotItem headerText="Test Link 1">
          <div>This is item 1</div>
        </PivotItem>
        {false && <PivotItem headerText="Test Link 2" />}
        <PivotItem headerText="Test Link 3">
          <div>This is Item 3</div>
        </PivotItem>
      </Pivot>,
      component => {
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      },
    );
  });

  it('renders large link Pivot correctly', () => {
    safeCreate(
      <Pivot linkSize="large">
        <PivotItem headerText="Test Link 1" />
        <PivotItem headerText="" />
      </Pivot>,
      component => {
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      },
    );
  });

  it('renders tabbed Pivot correctly', () => {
    safeCreate(
      <Pivot linkFormat="tabs">
        <PivotItem headerText="Test Link 1" />
        <PivotItem headerText="" />
      </Pivot>,
      component => {
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      },
    );
  });

  it('renders large tabbed Pivot correctly', () => {
    safeCreate(
      <Pivot linkFormat="tabs" linkSize="large">
        <PivotItem headerText="Test Link 1" />
        <PivotItem headerText="" />
      </Pivot>,
      component => {
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      },
    );
  });

  it('renders Pivot correctly with custom className', () => {
    safeCreate(
      <Pivot className="specialClassName">
        <PivotItem headerText="Test Link 1" className="specialClassName" />
        <PivotItem headerText="Test Link 2" />
      </Pivot>,
      component => {
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      },
    );
  });

  it('renders Pivot correctly with icon, text and count', () => {
    safeCreate(
      <Pivot>
        <PivotItem itemCount={12} />
        <PivotItem headerText="Test Link" itemCount={12} />
        <PivotItem headerText="Text with icon" itemIcon="Recent" />
      </Pivot>,
      component => {
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      },
    );
  });

  it('renders Pivot correctly when itemCount is a string', () => {
    safeCreate(
      <Pivot>
        <PivotItem headerText="test" />
        <PivotItem headerText="Test Link" itemCount="20+" />
      </Pivot>,
      component => {
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      },
    );
  });

  it('renders Pivot with overflow', () => {
    safeCreate(
      <Pivot overflowBehavior="menu">
        <PivotItem headerText="Test 1" />
        <PivotItem headerText="Test 2" />
      </Pivot>,
      component => {
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      },
    );
  });

  it('passes aria-label and aria-labelledby to tablist', () => {
    const wrapper = mount(
      <Pivot aria-label="test label" aria-labelledby="testID" data-foo="not passed to tablist">
        <PivotItem headerText="Test Link 1" />
        <PivotItem headerText="" />
      </Pivot>,
    );
    const tablistElement = wrapper.find('div[role="tablist"]');
    expect(tablistElement.prop('aria-label')).toBe('test label');
    expect(tablistElement.prop('aria-labelledby')).toBe('testID');
    expect(tablistElement.prop('data-foo')).toBeUndefined();
  });
});
