import * as React from 'react';
import { render } from '@testing-library/react';
import { motionTokens } from '@fluentui/react-motion';
import { fadeIn, fadeOut } from '../atoms/fade-atom';
import { scale, scaleIn, scaleOut } from '../atoms/scale-atom';
import { slideIn, slideOut } from '../atoms/slide-atom';
import { hold, layer, sequence, stagger } from './choreography';
import { createChoreographyComponent, createChoreographyPresenceComponent } from './createChoreographyComponent';
import { createSequenceComponent } from './createSequenceComponent';
import { createStaggerComponent, createStaggerPresenceComponent } from './createStaggerComponent';

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

    it('forwards poseProps for Prism-strict .In and .Out directional endpoints', () => {
      type CardScaleParams = {
        fromScale?: number;
        inScale?: number;
        toScale?: number;
        duration?: number;
        exitDuration?: number;
      };

      const CardScale = createChoreographyPresenceComponent(
        ({
          fromScale = 0.9,
          inScale = 1,
          toScale = fromScale,
          duration = 200,
          exitDuration = duration,
        }: { element: HTMLElement } & CardScaleParams) => ({
          enter: layer('[data-part="card"]', scale({ from: fromScale, to: inScale, duration })),
          exit: layer('[data-part="card"]', scale({ from: inScale, to: toScale, duration: exitDuration })),
        }),
        { poseProps: [{ from: 'fromScale', in: 'inScale', to: 'toScale' }] },
      );

      render(
        <CardScale.In fromScale={0.8} duration={250}>
          <div>
            <div data-part="card" />
          </div>
        </CardScale.In>,
      );

      expect(mockAnimate.animateSpy).toHaveBeenCalledTimes(1);
      expect(mockAnimate.animateSpy.mock.calls[0][0]).toEqual([{ scale: 0.8 }, { scale: 1 }]);
      expect(mockAnimate.animateSpy.mock.calls[0][1].duration).toBe(250);

      mockAnimate.animateSpy.mockClear();

      render(
        <CardScale.Out toScale={0.75} duration={180}>
          <div>
            <div data-part="card" />
          </div>
        </CardScale.Out>,
      );

      expect(mockAnimate.animateSpy).toHaveBeenCalledTimes(1);
      expect(mockAnimate.animateSpy.mock.calls[0][0]).toEqual([{ scale: 1 }, { scale: 0.75 }]);
      expect(mockAnimate.animateSpy.mock.calls[0][1].duration).toBe(180);

      const typeChecks = [
        // @ts-expect-error -- Prism-strict .In rejects toScale
        <CardScale.In key="in-to" toScale={0.7}>
          <div />
        </CardScale.In>,
        // @ts-expect-error -- Prism-strict .In rejects inScale
        <CardScale.In key="in-in" inScale={1}>
          <div />
        </CardScale.In>,
        // @ts-expect-error -- Prism-strict .In rejects exitDuration
        <CardScale.In key="in-exit" exitDuration={100}>
          <div />
        </CardScale.In>,
        // @ts-expect-error -- Prism-strict .Out rejects fromScale
        <CardScale.Out key="out-from" fromScale={0.8}>
          <div />
        </CardScale.Out>,
        // @ts-expect-error -- Prism-strict .Out rejects inScale
        <CardScale.Out key="out-in" inScale={1}>
          <div />
        </CardScale.Out>,
      ];
      expect(typeChecks).toHaveLength(5);
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

  describe('createSequenceComponent', () => {
    it('sequences enter -> hold -> exit on a single persistent DOM node with normalized fills', async () => {
      const TitleSequence = createSequenceComponent([
        [fadeIn({ duration: 400 }), slideIn({ from: { y: '-100px' }, duration: 400 })],
        hold(1200),
        [fadeOut({ duration: 400 }), slideOut({ to: { y: '100px' }, duration: 400 })],
      ]);

      const onMotionFinish = jest.fn();
      const { getByTestId, rerender } = render(
        <TitleSequence onMotionFinish={onMotionFinish} replayKey={0}>
          <div data-testid="title">Album A</div>
        </TitleSequence>,
      );

      const titleNode = getByTestId('title');
      expect(mockAnimate.animateSpy).toHaveBeenCalledTimes(4);
      expect(mockAnimate.animateSpy.mock.instances).toEqual([titleNode, titleNode, titleNode, titleNode]);
      expect(mockAnimate.animateSpy.mock.calls.map(call => [call[1].delay, call[1].duration, call[1].fill])).toEqual([
        [0, 400, 'both'],
        [0, 400, 'both'],
        [1600, 400, 'forwards'],
        [1600, 400, 'forwards'],
      ]);

      mockAnimate.animations.forEach(anim => anim.onfinish?.());
      await flushMicrotasks();
      expect(onMotionFinish).toHaveBeenCalledTimes(1);

      // Replaying preserves exact DOM node identity
      rerender(
        <TitleSequence onMotionFinish={onMotionFinish} replayKey={1}>
          <div data-testid="title">Album A</div>
        </TitleSequence>,
      );
      expect(getByTestId('title')).toBe(titleNode);
    });

    it('supports gap prop and composing nested layers and staggers in one scene', () => {
      const AlbumScene = createChoreographyComponent([
        layer('[data-part="title"]', sequence([fadeIn({ duration: 400 }), hold(1200), fadeOut({ duration: 400 })])),
        stagger(
          [
            layer(
              '[data-part="photo"]',
              sequence([scaleIn({ from: 0.5, duration: 200 }), hold(1600), scaleOut({ to: 0.5, duration: 200 })]),
            ),
          ],
          { startInterval: 100 },
        ),
      ]);

      const { container } = render(
        <AlbumScene>
          <div>
            <h2 data-part="title">Album</h2>
            <div>
              <div data-part="photo">1</div>
              <div data-part="photo">2</div>
            </div>
          </div>
        </AlbumScene>,
      );

      const title = container.querySelector('[data-part="title"]');
      const photos = Array.from(container.querySelectorAll('[data-part="photo"]'));

      expect(mockAnimate.animateSpy).toHaveBeenCalledTimes(6);
      expect(mockAnimate.animateSpy.mock.instances).toEqual([title, title, photos[0], photos[0], photos[1], photos[1]]);
      expect(mockAnimate.animateSpy.mock.calls.map(call => [call[1].delay, call[1].fill])).toEqual([
        [0, 'both'],
        [1600, 'forwards'],
        [0, 'both'],
        [1800, 'forwards'],
        [100, 'both'],
        [1900, 'forwards'],
      ]);
    });
  });
});
