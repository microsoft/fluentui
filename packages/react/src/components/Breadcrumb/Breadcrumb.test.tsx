import * as React from 'react';
import { render } from '@testing-library/react';
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
    const items2: IBreadcrumbItem[] = [
      { text: 'Test1', key: 'Test1', href: 'http://bing.com', onClick: () => undefined },
      { text: 'Test2', key: 'Test2', onClick: () => undefined },
      { text: 'Test3', key: 'Test3', as: 'h1' },
    ];

    const { container } = render(<Breadcrumb items={items2} />);

    // get the first child of each list item (the actual item content)
    const renderedItems = container.querySelectorAll('.ms-Breadcrumb-listItem > *:first-child');
    expect(renderedItems).toHaveLength(3);
    // should be a link since it has a href (even though it also has onclick)
    expect(renderedItems[0].tagName).toBe('A');
    // should be a button since it doesn't have a href
    // (can't use a link without a href because it won't respond to key events)
    expect(renderedItems[1].tagName).toBe('BUTTON');
    // specified type of h1 overrides default
    expect(renderedItems[2].tagName).toBe('H1');
  });

  it('calls the callback when an item is clicked', () => {
    let callbackValue;
    const clickCallback = (ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem) => {
      ev.preventDefault(); // in case it's a navigation event
      callbackValue = item.key;
    };

    const items2: IBreadcrumbItem[] = [
      { text: 'Test1', key: 'Test1', href: 'http://bing.com', onClick: clickCallback },
      { text: 'Test2', key: 'Test2', onClick: clickCallback },
    ];

    const { container } = render(<Breadcrumb items={items2} />);

    const renderedItems = container.querySelectorAll('.ms-Breadcrumb-itemLink');

    userEvent.click(renderedItems[0]);
    expect(callbackValue).toEqual('Test1');

    userEvent.click(renderedItems[1]);
    expect(callbackValue).toEqual('Test2');
  });

  it('moves items to overflow in the correct order', () => {
    const { container } = render(<Breadcrumb items={items} maxDisplayedItems={2} />);

    expect(container.querySelectorAll('.ms-Breadcrumb-item')[0].textContent).toEqual('TestText3');
  });

  it('supports native props on the root element', () => {
    const { getByRole } = render(<Breadcrumb items={items} maxDisplayedItems={2} role="region" />);

    expect(getByRole('region', { hidden: true })).toBeTruthy();
  });

  it('opens the overflow menu on click', () => {
    const { container } = render(<Breadcrumb items={items} maxDisplayedItems={2} />);

    const overflowButton = container.querySelector('.ms-Breadcrumb-overflowButton');
    userEvent.click(overflowButton!);

    const overfowItems = document.querySelectorAll('.ms-ContextualMenu-item');
    expect(overfowItems).toHaveLength(2);
    expect(overfowItems[0].textContent).toEqual('TestText1');
    expect(overfowItems[1].textContent).toEqual('TestText2');
  });

  describe('ARIA prop propagation to breadcrumb items', () => {
    it('for Link', () => {
      const itemsWithAdditionalProps: IBreadcrumbItem[] = [
        {
          key: 'ItemKey1',
          text: 'Item 1',
          href: '#',
          'aria-label': "I'm an aria prop",
        },
      ];

      const { getByRole } = render(<Breadcrumb items={itemsWithAdditionalProps} />);

      const item = getByRole('link', { hidden: true });
      expect(item.getAttribute('aria-label')).toEqual("I'm an aria prop");
    });

    it('for Tag', () => {
      const itemsWithAdditionalProps: IBreadcrumbItem[] = [
        {
          key: 'ItemKey1',
          text: 'Item 1',
          'aria-label': "I'm an aria prop",
        },
      ];

      const { container } = render(<Breadcrumb items={itemsWithAdditionalProps} />);

      const item = container.querySelector('.ms-Breadcrumb-item');
      expect(item!.getAttribute('aria-label')).toEqual("I'm an aria prop");
    });
  });
});
