import * as React from 'react';
import { render } from '@testing-library/react';
import { motionTokens } from '@fluentui/react-motion';
import { fadeIn, fadeOut } from '../atoms/fade-atom';
import { scaleIn } from '../atoms/scale-atom';
import { slideIn, slideOut } from '../atoms/slide-atom';
import { createChoreographyComponent, createChoreographyPresenceComponent } from './createChoreographyComponent';
import { createStaggerComponent, createStaggerPresenceComponent } from './createStaggerComponent';
import { layer, stagger } from './stagger';

type MockAnimation = {
  persist: jest.Mock;
  cancel: jest.Mock;
  finish: jest.Mock;
  play: jest.Mock;
  pause: jest.Mock;
  playbackRate: number;
  onfinish: null | (() => void);
  oncancel: null | (() => void);
};

function flushMicrotasks(): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(resolve, 0);
  });
}

function installMockAnimate(): {
  animateSpy: jest.Mock;
  animations: MockAnimation[];
  cleanup: () => void;
} {
  const animations: MockAnimation[] = [];
  const animateSpy = jest.fn();
  animateSpy.mockImplementation(() => {
    const animation: MockAnimation = {
      persist: jest.fn(),
      cancel: jest.fn(),
      finish: jest.fn(),
      play: jest.fn(),
      pause: jest.fn(),
      playbackRate: 1,
      onfinish: null,
      oncancel: null,
    };
    animations.push(animation);
    return animation;
  });

  const original = Element.prototype.animate;
  Object.defineProperty(Element.prototype, 'animate', {
    configurable: true,
    writable: true,
    value: animateSpy,
  });

  return {
    animateSpy,
    animations,
    cleanup: () => {
      if (original === undefined) {
        delete (Element.prototype as unknown as Record<string, unknown>).animate;
      } else {
        Object.defineProperty(Element.prototype, 'animate', {
          configurable: true,
          writable: true,
          value: original,
        });
      }
    },
  };
}

describe('choreography and stagger component factories', () => {
  let mockAnimate: ReturnType<typeof installMockAnimate>;

  beforeEach(() => {
    mockAnimate = installMockAnimate();
  });

  afterEach(() => {
    mockAnimate.cleanup();
  });

  describe('createChoreographyComponent', () => {
    it('animates heterogeneous non-sibling targets with additive delays and fires onMotionFinish once', async () => {
      const CardEntrance = createChoreographyComponent(
        stagger(
          [
            layer('[data-part="media"]', scaleIn({ from: 0.95, duration: 250 })),
            layer('[data-part="title"]', fadeIn({ duration: 200 })),
            layer('[data-part="actions"]', slideIn({ from: { y: '12px' }, duration: 200 }), { delay: 20 }),
          ],
          { startInterval: 60 },
        ),
      );

      const onMotionFinish = jest.fn();

      const { container } = render(
        <CardEntrance onMotionFinish={onMotionFinish}>
          <div>
            <div data-part="media" />
            <section>
              <h2 data-part="title">Title</h2>
              <div data-part="actions">Actions</div>
            </section>
          </div>
        </CardEntrance>,
      );

      const media = container.querySelector('[data-part="media"]');
      const title = container.querySelector('[data-part="title"]');
      const actions = container.querySelector('[data-part="actions"]');

      expect(mockAnimate.animateSpy).toHaveBeenCalledTimes(3);
      expect(mockAnimate.animateSpy.mock.instances).toEqual([media, title, actions]);
      expect(mockAnimate.animateSpy.mock.calls.map(call => call[1].delay)).toEqual([0, 60, 140]);

      mockAnimate.animations[0].onfinish?.();
      mockAnimate.animations[1].onfinish?.();
      await flushMicrotasks();
      expect(onMotionFinish).not.toHaveBeenCalled();

      mockAnimate.animations[2].onfinish?.();
      await flushMicrotasks();
      expect(onMotionFinish).toHaveBeenCalledTimes(1);
    });

    it('replays all targeted animations when replayKey changes without remounting', () => {
      const Wave = createChoreographyComponent(
        stagger([layer(':scope > *', fadeIn({ duration: 150 }))], { startInterval: 40 }),
      );

      const { rerender, getByTestId } = render(
        <Wave replayKey={0}>
          <div data-testid="root">
            <div>1</div>
            <div>2</div>
          </div>
        </Wave>,
      );

      const rootBefore = getByTestId('root');
      expect(mockAnimate.animations).toHaveLength(2);

      rerender(
        <Wave replayKey={1}>
          <div data-testid="root">
            <div>1</div>
            <div>2</div>
          </div>
        </Wave>,
      );

      expect(getByTestId('root')).toBe(rootBefore);
      expect(mockAnimate.animations[0].cancel).toHaveBeenCalledTimes(1);
      expect(mockAnimate.animations[0].play).toHaveBeenCalledTimes(1);
      expect(mockAnimate.animations[1].cancel).toHaveBeenCalledTimes(1);
      expect(mockAnimate.animations[1].play).toHaveBeenCalledTimes(1);
    });
  });

  describe('createChoreographyPresenceComponent', () => {
    it('coordinates root container and staggered descendants across enter and exit', () => {
      const ExpandableCard = createChoreographyPresenceComponent({
        enter: [
          { keyframes: [{ maxHeight: '0px' }, { maxHeight: '200px' }], duration: 300 },
          stagger([layer('[data-stagger-item]', slideIn({ from: { y: '16px' }, duration: 200 }), { delay: 100 })], {
            startInterval: 50,
          }),
        ],
        exit: [
          stagger([layer('[data-stagger-item]', slideOut({ to: { y: '16px' }, duration: 200 }))], {
            startInterval: 50,
            order: 'reverse',
          }),
          { keyframes: [{ maxHeight: '200px' }, { maxHeight: '0px' }], duration: 300, delay: 100 },
        ],
      });

      const { container, rerender } = render(
        <ExpandableCard visible appear>
          <div data-testid="panel">
            <div data-stagger-item>A</div>
            <div data-stagger-item>B</div>
          </div>
        </ExpandableCard>,
      );

      const panel = container.querySelector('[data-testid="panel"]');
      const items = Array.from(container.querySelectorAll('[data-stagger-item]'));

      // Enter: root panel (delay undefined), item A (100ms), item B (150ms)
      expect(mockAnimate.animateSpy).toHaveBeenCalledTimes(3);
      expect(mockAnimate.animateSpy.mock.instances).toEqual([panel, items[0], items[1]]);
      expect(mockAnimate.animateSpy.mock.calls.map(call => call[1].delay)).toEqual([undefined, 100, 150]);

      mockAnimate.animateSpy.mockClear();

      rerender(
        <ExpandableCard visible={false} appear>
          <div data-testid="panel">
            <div data-stagger-item>A</div>
            <div data-stagger-item>B</div>
          </div>
        </ExpandableCard>,
      );

      // Exit: item A (50ms, reversed), item B (0ms, reversed), root panel (100ms)
      expect(mockAnimate.animateSpy).toHaveBeenCalledTimes(3);
      expect(mockAnimate.animateSpy.mock.instances).toEqual([items[0], items[1], panel]);
      expect(mockAnimate.animateSpy.mock.calls.map(call => call[1].delay)).toEqual([50, 0, 100]);
    });
  });

  describe('createStaggerComponent and createStaggerPresenceComponent', () => {
    it('staggers direct children with configurable startInterval, order, and per-item callbacks', () => {
      const PerItemStagger = createStaggerComponent<{ duration?: number }>(
        ({ index, duration = motionTokens.durationNormal }) =>
          slideIn({ from: { y: `${(index + 1) * 10}px` }, duration }),
      );

      const { container } = render(
        <PerItemStagger startInterval={75} duration={250}>
          <div>
            <div>One</div>
            <div>Two</div>
            <div>Three</div>
          </div>
        </PerItemStagger>,
      );

      const children = Array.from(container.firstElementChild!.children);
      expect(mockAnimate.animateSpy).toHaveBeenCalledTimes(3);
      expect(mockAnimate.animateSpy.mock.instances).toEqual(children);
      expect(
        mockAnimate.animateSpy.mock.calls.map(call => [call[0][0].translate, call[1].delay, call[1].duration]),
      ).toEqual([
        ['0px 10px', 0, 250],
        ['0px 20px', 75, 250],
        ['0px 30px', 150, 250],
      ]);
    });

    it('supports enter/exit startInterval and order symmetry, plus .In and .Out directional variants', () => {
      const StaggeredFade = createStaggerPresenceComponent(
        {
          enter: fadeIn({ duration: 200 }),
          exit: fadeOut({ duration: 150 }),
        },
        { defaultStartInterval: 50, defaultExitOrder: 'reverse' },
      );

      const { rerender } = render(
        <StaggeredFade visible appear>
          <div>
            <div>A</div>
            <div>B</div>
            <div>C</div>
          </div>
        </StaggeredFade>,
      );

      // Enter uses default forward order: 0, 50, 100
      expect(mockAnimate.animateSpy.mock.calls.map(call => call[1].delay)).toEqual([0, 50, 100]);

      mockAnimate.animateSpy.mockClear();

      rerender(
        <StaggeredFade visible={false} appear>
          <div>
            <div>A</div>
            <div>B</div>
            <div>C</div>
          </div>
        </StaggeredFade>,
      );

      // Exit uses defaultExitOrder 'reverse': 100, 50, 0
      expect(mockAnimate.animateSpy.mock.calls.map(call => call[1].delay)).toEqual([100, 50, 0]);

      mockAnimate.animateSpy.mockClear();

      // .Out respects an explicit startInterval and order passed on .Out
      render(
        <StaggeredFade.Out startInterval={80} order="forward">
          <div>
            <div>A</div>
            <div>B</div>
          </div>
        </StaggeredFade.Out>,
      );

      expect(mockAnimate.animateSpy.mock.calls.map(call => [call[1].duration, call[1].delay])).toEqual([
        [150, 0],
        [150, 80],
      ]);
    });
  });
});
