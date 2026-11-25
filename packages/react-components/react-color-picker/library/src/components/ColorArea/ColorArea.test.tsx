import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { ColorArea } from './ColorArea';

describe('ColorArea', () => {
  isConformant({
    Component: ColorArea,
    displayName: 'ColorArea',
  });

  it('renders a default state', () => {
    const result = render(<ColorArea color={{ h: 324, s: 1, v: 0.5, a: 1 }} />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-ColorArea"
          style="--fui-AreaX--progress: 100%; --fui-AreaY--progress: 50%; --fui-Area__thumb--color: hsla(324, 100%, 25%, 1); --fui-Area--main-color: hsl(324, 100%, 50%);"
        >
          <div
            class="fui-ColorArea__thumb"
          >
            <input
              class="fui-ColorArea__inputX"
              id="sliderX-_r_e_"
              type="range"
              value="100"
            />
            <input
              aria-orientation="vertical"
              class="fui-ColorArea__inputY"
              id="sliderY-_r_f_"
              tabindex="-1"
              type="range"
              value="50"
            />
          </div>
        </div>
      </div>
    `);
  });

  describe('drag lifecycle', () => {
    const onChange = jest.fn();

    beforeEach(() => {
      onChange.mockClear();
      jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        right: 100,
        bottom: 100,
        width: 100,
        height: 100,
        toJSON: () => ({}),
      } as DOMRect);
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });

    const movePointer = (buttons: number) => {
      act(() => {
        document.dispatchEvent(new MouseEvent('pointermove', { bubbles: true, buttons, clientX: 10, clientY: 10 }));
      });
    };

    const dispatchOnDocument = (type: string) => {
      act(() => {
        document.dispatchEvent(new MouseEvent(type, { bubbles: true }));
      });
    };

    const renderArea = () => {
      const result = render(<ColorArea color={{ h: 324, s: 1, v: 0.5, a: 1 }} onChange={onChange} />);
      return { ...result, root: result.container.querySelector('.fui-ColorArea')! };
    };

    it('drags while a button is held', () => {
      const { root } = renderArea();
      fireEvent.pointerDown(root);
      expect(onChange).toHaveBeenCalledTimes(1);
      movePointer(1);
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('stops after pointerup', () => {
      const { root } = renderArea();
      fireEvent.pointerDown(root);
      dispatchOnDocument('pointerup');
      onChange.mockClear();
      movePointer(1);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('stops after pointercancel', () => {
      const { root } = renderArea();
      fireEvent.pointerDown(root);
      dispatchOnDocument('pointercancel');
      onChange.mockClear();
      movePointer(1);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('stops when a move arrives with no buttons pressed', () => {
      const { root } = renderArea();
      fireEvent.pointerDown(root);
      onChange.mockClear();
      movePointer(0);
      expect(onChange).not.toHaveBeenCalled();
      movePointer(1);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('removes document listeners on unmount mid-drag', () => {
      const removeSpy = jest.spyOn(document, 'removeEventListener');
      const { root, unmount } = renderArea();
      fireEvent.pointerDown(root);
      unmount();
      expect(removeSpy).toHaveBeenCalledWith('pointermove', expect.any(Function));
      removeSpy.mockRestore();
    });
  });
});
