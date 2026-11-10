import '@testing-library/jest-dom';

import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import { resetIds } from '@fluentui/utilities';
import { Pivot, PivotItem, IPivot } from './index';
import { isConformant } from '../../common/isConformant';

describe('Pivot', () => {
  beforeEach(() => {
    // Resetting ids to create predictability in generated ids.
    resetIds();
  });

  afterEach(() => {
    cleanup();
    delete (HTMLElement.prototype as any).isVisible;
  });

  it('renders link Pivot correctly', () => {
    const { container } = render(
      <Pivot>
        <PivotItem headerText="Test Link 1" />
        <PivotItem headerText="" />
      </Pivot>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  isConformant({
    Component: Pivot,
    displayName: 'Pivot',
  });

  it('can be focused', () => {
    const pivotRef = React.createRef<IPivot>();
    (HTMLElement.prototype as any).isVisible = true;

    const { unmount } = render(
      <Pivot componentRef={pivotRef}>
        <PivotItem headerText="Link 1" />
        <PivotItem headerText="Link 2" />
      </Pivot>,
    );

    expect(pivotRef.current).toBeTruthy();

    pivotRef.current!.focus();
    const active = document.activeElement;
    expect(active?.textContent?.trim()).toEqual('Link 1');

    delete (HTMLElement.prototype as any).isVisible;
    unmount();
  });

  it('supports JSX expressions', () => {
    const { container } = render(
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
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders large link Pivot correctly', () => {
    const { container } = render(
      <Pivot linkSize="large">
        <PivotItem headerText="Test Link 1" />
        <PivotItem headerText="" />
      </Pivot>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders tabbed Pivot correctly', () => {
    const { container } = render(
      <Pivot linkFormat="tabs">
        <PivotItem headerText="Test Link 1" />
        <PivotItem headerText="" />
      </Pivot>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders large tabbed Pivot correctly', () => {
    const { container } = render(
      <Pivot linkFormat="tabs" linkSize="large">
        <PivotItem headerText="Test Link 1" />
        <PivotItem headerText="" />
      </Pivot>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders Pivot correctly with custom className', () => {
    const { container } = render(
      <Pivot className="specialClassName">
        <PivotItem headerText="Test Link 1" className="specialClassName" />
        <PivotItem headerText="Test Link 2" />
      </Pivot>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders Pivot correctly with icon, text and count', () => {
    const { container } = render(
      <Pivot>
        <PivotItem itemCount={12} />
        <PivotItem headerText="Test Link" itemCount={12} />
        <PivotItem headerText="Text with icon" itemIcon="Recent" />
      </Pivot>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders Pivot correctly when itemCount is a string', () => {
    const { container } = render(
      <Pivot>
        <PivotItem headerText="test" />
        <PivotItem headerText="Test Link" itemCount="20+" />
      </Pivot>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders Pivot with overflow', () => {
    const { container } = render(
      <Pivot overflowBehavior="menu">
        <PivotItem headerText="Test 1" />
        <PivotItem headerText="Test 2" />
      </Pivot>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('passes aria-label and aria-labelledby to tablist', () => {
    const { getByRole } = render(
      <Pivot aria-label="test label" aria-labelledby="testID" data-foo="not passed to tablist">
        <PivotItem headerText="Test Link 1" />
        <PivotItem headerText="" />
      </Pivot>,
    );
    const tablist = getByRole('tablist');
    expect(tablist).toHaveAttribute('aria-label', 'test label');
    expect(tablist).toHaveAttribute('aria-labelledby', 'testID');
    expect(tablist).not.toHaveAttribute('data-foo');
  });
});
