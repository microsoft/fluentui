import * as React from 'react';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Breadcrumb } from './index';
import { Icon } from '../../Icon';
import { isConformant } from '../../common/isConformant';
import { resetIds } from '@fluentui/utilities';
import type { IBreadcrumbItem } from './index';

describe('Breadcrumb', () => {
  const items: IBreadcrumbItem[] = [
    { text: 'TestText1', key: 'TestKey1' },
    { text: 'TestText2', key: 'TestKey2' },
    { text: 'TestText3', key: 'TestKey3' },
    { text: 'TestText4', key: 'TestKey4' },
  ];

  beforeEach(() => {
    resetIds();
  });

  afterEach(() => {
    if ((setTimeout as any).mock) {
      jest.useRealTimers();
    }
  });

  it('renders empty breadcrumb', () => {
    const { container } = render(<Breadcrumb items={[]} />);

    expect(container).toMatchSnapshot();
  });

  describe('rendering', () => {
    it('renders correctly', () => {
      const { container } = render(<Breadcrumb items={items} />);
      expect(container).toMatchSnapshot();
    });

    it('renders correctly with overflow', () => {
      const { container } = render(<Breadcrumb items={items} maxDisplayedItems={2} />);
      expect(container).toMatchSnapshot();
    });

    it('renders correctly with custom divider', () => {
      const divider = () => <span>*</span>;
      const { container } = render(<Breadcrumb items={items} dividerAs={divider} />);
      expect(container).toMatchSnapshot();
    });

    it('renders correctly with overflow and overflowIndex', () => {
      const { container } = render(<Breadcrumb items={items} maxDisplayedItems={2} overflowIndex={1} />);
      expect(container).toMatchSnapshot();
    });

    it('renders correctly with maxDisplayedItems and overflowIndex', () => {
      const { container } = render(<Breadcrumb items={items} maxDisplayedItems={1} overflowIndex={1} />);
      expect(container).toMatchSnapshot();
    });

    it('renders correctly with maxDisplayedItems and overflowIndex as 0', () => {
      const { container } = render(<Breadcrumb items={items} maxDisplayedItems={0} overflowIndex={0} />);
      expect(container).toMatchSnapshot();
    });

    it('renders  correctly with custom overflow icon', () => {
      const overflowIcon = () => <Icon iconName={'ChevronDown'} />;
      const { container } = render(
        <Breadcrumb items={items} maxDisplayedItems={2} onRenderOverflowIcon={overflowIcon} />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  isConformant({
    Component: Breadcrumb,
    displayName: 'Breadcrumb',
    // Problem: Doesn’t handle ref.
    // Solution: Add a ref to the root element.
    disabledTests: ['component-handles-ref', 'component-has-root-ref', 'component-handles-classname'],
  });

  it('renders items with expected element type', () => {
    jest.useFakeTimers();

    const items2: IBreadcrumbItem[] = [
      { text: 'Test1', key: 'Test1', href: 'http://bing.com', onClick: () => undefined },
      { text: 'Test2', key: 'Test2', onClick: () => undefined },
      { text: 'Test3', key: 'Test3', as: 'h1' },
    ];

    const { getAllByRole } = render(<Breadcrumb items={items2} />);
    //Initial rendering of component is "hidden" while measurements are made
    // therefore we need to wait a bit before getting roles.
    act(() => {
      jest.runAllTimers();
    });

    const renderedItems = getAllByRole('listitem');
    expect(renderedItems).toHaveLength(3);
    // should be a link since it has a href (even though it also has onclick)
    expect(renderedItems[0].firstElementChild!.tagName).toBe('A');
    // should be a button since it doesn't have a href
    // (can't use a link without a href because it won't respond to key events)
    expect(renderedItems[1].firstElementChild!.tagName).toBe('BUTTON');
    // specified type of h1 overrides default
    expect(renderedItems[2].firstElementChild!.tagName).toBe('H1');
  });

  it('calls the callback when an item is clicked', () => {
    jest.useFakeTimers();

    let callbackValue;
    const clickCallback = (ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem) => {
      ev.preventDefault(); // in case it's a navigation event
      callbackValue = item.key;
    };

    const items2: IBreadcrumbItem[] = [
      { text: 'Test1', key: 'Test1', href: 'http://bing.com', onClick: clickCallback },
      { text: 'Test2', key: 'Test2', onClick: clickCallback },
    ];

    const { getByRole } = render(<Breadcrumb items={items2} />);
    //Initial rendering of component is "hidden" while measurements are made
    // therefore we need to wait a bit before getting roles.
    act(() => {
      jest.runAllTimers();
    });

    userEvent.click(getByRole('link'));
    expect(callbackValue).toEqual('Test1');

    userEvent.click(getByRole('button'));
    expect(callbackValue).toEqual('Test2');
  });

  it('moves items to overflow in the correct order', () => {
    jest.useFakeTimers();

    const { getAllByRole } = render(<Breadcrumb items={items} maxDisplayedItems={2} />);
    //Initial rendering of component is "hidden" while measurements are made
    // therefore we need to wait a bit before getting roles.
    act(() => {
      jest.runAllTimers();
    });

    const firstListItem = getAllByRole('listitem')[1].firstElementChild;
    expect(firstListItem!.textContent).toContain('TestText3');
  });

  it('supports native props on the root element', () => {
    jest.useFakeTimers();

    const { getByRole } = render(<Breadcrumb items={items} maxDisplayedItems={2} role="region" />);
    //Initial rendering of component is "hidden" while measurements are made
    // therefore we need to wait a bit before getting roles.
    act(() => {
      jest.runAllTimers();
    });

    expect(getByRole('region')).toBeTruthy();
  });

  it('opens the overflow menu on click', () => {
    jest.useFakeTimers();

    const { getByRole, getAllByRole } = render(<Breadcrumb items={items} maxDisplayedItems={2} />);
    //Initial rendering of component is "hidden" while measurements are made
    // therefore we need to wait a bit before getting roles.
    act(() => {
      jest.runAllTimers();
    });

    const overflowButton = getByRole('button');
    userEvent.click(overflowButton!);

    const overfowItems = getAllByRole('menuitem');
    expect(overfowItems).toHaveLength(2);
    expect(overfowItems[0].textContent).toEqual('TestText1');
    expect(overfowItems[1].textContent).toEqual('TestText2');
  });

  describe('ARIA prop propagation to breadcrumb items', () => {
    it('for Link', () => {
      jest.useFakeTimers();

      const itemsWithAdditionalProps: IBreadcrumbItem[] = [
        {
          key: 'ItemKey1',
          text: 'Item 1',
          href: '#',
          'aria-label': "I'm an aria prop",
        },
      ];

      const { getByRole } = render(<Breadcrumb items={itemsWithAdditionalProps} />);
      //Initial rendering of component is "hidden" while measurements are made
      // therefore we need to wait a bit before getting roles.
      act(() => {
        jest.runAllTimers();
      });

      const item = getByRole('link');
      expect(item.getAttribute('aria-label')).toEqual("I'm an aria prop");
    });

    it('for Tag', () => {
      jest.useFakeTimers();

      const itemsWithAdditionalProps: IBreadcrumbItem[] = [
        {
          key: 'ItemKey1',
          text: 'Item 1',
          'aria-label': "I'm an aria prop",
        },
      ];

      const { getByRole } = render(<Breadcrumb items={itemsWithAdditionalProps} />);
      //Initial rendering of component is "hidden" while measurements are made
      // therefore we need to wait a bit before getting roles.
      act(() => {
        jest.runAllTimers();
      });

      const item = getByRole('listitem', { hidden: true }).firstElementChild;
      expect(item!.getAttribute('aria-label')).toEqual("I'm an aria prop");
    });
  });
});
