import { shouldCancelDashboardGridPointerStart } from './cancelSelectors';
import { dashboardGridDataAttributes } from './types';

const eventWithPath = (...path: EventTarget[]): Event =>
  ({
    target: path[0],
    composedPath: () => path,
  }) as unknown as Event;

describe('dashboard grid pointer cancellation', () => {
  it('blocks interactive descendants by default', () => {
    const item = document.createElement('div');
    const button = document.createElement('button');
    item.appendChild(button);

    expect(
      shouldCancelDashboardGridPointerStart(eventWithPath(button, item), {
        itemElement: item,
      }),
    ).toBe(true);
  });

  it('lets an explicitly configured button handle override default cancellation', () => {
    const item = document.createElement('div');
    const button = document.createElement('button');
    item.appendChild(button);

    expect(
      shouldCancelDashboardGridPointerStart(eventWithPath(button, item), {
        itemElement: item,
        handle: button,
      }),
    ).toBe(false);
  });

  it('uses composed paths across Shadow DOM', () => {
    const item = document.createElement('div');
    const host = document.createElement('div');
    item.appendChild(host);
    const shadowRoot = host.attachShadow({ mode: 'open' });
    const handle = document.createElement('button');
    shadowRoot.appendChild(handle);

    expect(
      shouldCancelDashboardGridPointerStart(eventWithPath(handle, shadowRoot, host, item), {
        itemElement: item,
        handle: '[data-handle]',
      }),
    ).toBe(true);

    handle.setAttribute('data-handle', '');
    expect(
      shouldCancelDashboardGridPointerStart(eventWithPath(handle, shadowRoot, host, item), {
        itemElement: item,
        handle: '[data-handle]',
      }),
    ).toBe(false);
  });

  it('does not resolve handles through nested items', () => {
    const parentItem = document.createElement('div');
    parentItem.setAttribute(dashboardGridDataAttributes.item, '');
    const childItem = document.createElement('div');
    childItem.setAttribute(dashboardGridDataAttributes.item, '');
    const handle = document.createElement('button');
    childItem.appendChild(handle);
    parentItem.appendChild(childItem);

    expect(
      shouldCancelDashboardGridPointerStart(eventWithPath(handle, childItem, parentItem), {
        itemElement: parentItem,
        handle,
      }),
    ).toBe(true);
  });

  it('honors caller cancellation rules before a configured handle', () => {
    const item = document.createElement('div');
    const handle = document.createElement('button');
    handle.className = 'cancel';
    item.appendChild(handle);

    expect(
      shouldCancelDashboardGridPointerStart(eventWithPath(handle, item), {
        itemElement: item,
        handle,
        cancel: '.cancel',
      }),
    ).toBe(true);
  });

  it('allows an interactive source root while preserving descendant controls', () => {
    const sourceButton = document.createElement('button');
    expect(
      shouldCancelDashboardGridPointerStart(eventWithPath(sourceButton), {
        itemElement: sourceButton,
        ignoreItemElement: true,
      }),
    ).toBe(false);

    const source = document.createElement('div');
    const childButton = document.createElement('button');
    source.appendChild(childButton);
    expect(
      shouldCancelDashboardGridPointerStart(eventWithPath(childButton, source), {
        itemElement: source,
        ignoreItemElement: true,
      }),
    ).toBe(true);
  });
});
