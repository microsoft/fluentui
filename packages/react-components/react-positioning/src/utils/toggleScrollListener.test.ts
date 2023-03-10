import { toggleScrollListener } from './toggleScrollListener';
describe('toggleScrollListener', () => {
  beforeEach(jest.clearAllMocks);

  it('should add event listener for scroll', () => {
    const handler = jest.fn();
    toggleScrollListener(document.createElement('div'), null, handler);
    document.body.dispatchEvent(new CustomEvent('scroll'));

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should remove previous event listener', () => {
    const handler = jest.fn();
    const next = document.createElement('div');
    const prev = document.createElement('div');
    const prevScrollParent = document.createElement('div');
    prevScrollParent.style.overflow = 'scroll';
    prevScrollParent.appendChild(prev);

    toggleScrollListener(prev, null, handler);
    toggleScrollListener(next, prev, handler);
    prevScrollParent.dispatchEvent(new CustomEvent('scroll'));

    expect(handler).toHaveBeenCalledTimes(0);
  });

  it('should do nothing if previous and next elements are the same', () => {
    const handler = jest.fn();
    const element = document.createElement('div');
    const addEventListener = jest.spyOn(document.body, 'addEventListener');
    const removeEventListener = jest.spyOn(document.body, 'removeEventListener');
    toggleScrollListener(element, null, handler);
    toggleScrollListener(element, element, handler);

    expect(removeEventListener).toHaveBeenCalledTimes(0);
    expect(addEventListener).toHaveBeenCalledTimes(1);
  });
});
