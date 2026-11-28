import { applyVisibility, DATA_POSITIONING_ESCAPED, DATA_POSITIONING_HIDDEN } from './visibility';

const mockRect = (element: HTMLElement, left: number, top: number, width: number, height: number) => {
  element.getBoundingClientRect = () =>
    ({ left, top, width, height, x: left, y: top, right: left + width, bottom: top + height } as DOMRect);
};

describe('applyVisibility', () => {
  let target: HTMLElement;
  let container: HTMLElement;

  beforeEach(() => {
    Object.defineProperty(document.documentElement, 'clientWidth', { value: 1000, configurable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 700, configurable: true });
    target = document.createElement('button');
    container = document.createElement('div');
    document.body.append(target, container);
  });

  afterEach(() => {
    target.remove();
    container.remove();
  });

  it('marks a target and a container that are outside of the viewport', () => {
    mockRect(target, 450, -100, 100, 40);
    mockRect(container, 400, -60, 200, 100);

    applyVisibility(container, target, null, false);

    expect(container).toHaveAttribute(DATA_POSITIONING_HIDDEN);
    expect(container).not.toHaveAttribute(DATA_POSITIONING_ESCAPED);

    mockRect(target, 450, 300, 100, 40);
    mockRect(container, 400, 740, 200, 100);

    applyVisibility(container, target, null, false);

    expect(container).not.toHaveAttribute(DATA_POSITIONING_HIDDEN);
    expect(container).toHaveAttribute(DATA_POSITIONING_ESCAPED);
  });

  it('dispatches completion with physical sides and logical alignments', () => {
    const onPositioningEnd = jest.fn();
    container.addEventListener('fui-positioningend', onPositioningEnd);
    mockRect(target, 450, 300, 100, 40);
    mockRect(container, 250, 300, 200, 100);

    applyVisibility(container, target, { position: 'before', align: 'end', placement: 'before-bottom' }, false);
    // Floating UI alignments are logical
    applyVisibility(container, target, { position: 'below', align: 'start', placement: 'below-start' }, true);
    applyVisibility(container, target, { position: 'above', align: 'center', placement: 'above' }, true);

    expect(onPositioningEnd.mock.calls.map(([event]) => event.detail)).toEqual([
      { placement: 'left-end', escaped: false, referenceHidden: false },
      { placement: 'bottom-end', escaped: false, referenceHidden: false },
      { placement: 'top', escaped: false, referenceHidden: false },
    ]);
    expect(onPositioningEnd.mock.calls.every(([event]) => event.target === container)).toBe(true);
  });

  it('does not call onPositioningEnd without a placement', () => {
    const onPositioningEnd = jest.fn();
    container.addEventListener('fui-positioningend', onPositioningEnd);

    applyVisibility(container, target, null, false);

    expect(onPositioningEnd).not.toHaveBeenCalled();
  });
});
