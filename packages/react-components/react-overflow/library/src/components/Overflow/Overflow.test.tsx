import * as React from 'react';
import { render } from '@testing-library/react';
import { Overflow } from './Overflow';
import { overflowClassNames } from './useOverflowStyles.styles';
import { OverflowItem } from '../OverflowItem';

describe('Overflow', () => {
  beforeAll(() => {
    // https://github.com/jsdom/jsdom/issues/3368
    global.ResizeObserver = class ResizeObserver {
      public observe() {
        // do nothing
      }
      public unobserve() {
        // do nothing
      }
      public disconnect() {
        // do nothing
      }
    };
  });

  it('should not throw on console.error', async () => {
    // Updates to overflow state are batched with a microtask debouncer (see createOverflowManager)
    // This means that unit tests will often warn on updates happening outside of act
    // There's no real way to fix this nicely because there's nothing obvious to wait for since the
    // update happens in a microtask.
    //
    // The current debounce implementation is synchronous when NODE_ENV === 'test'
    // This test is a canary to make sure unit tests don't emit warnings
    console.error = message => {
      throw new Error(message);
    };

    render(
      <Overflow minimumVisible={1}>
        <div>
          <OverflowItem id="1">
            <button>foo</button>
          </OverflowItem>
          <OverflowItem id="2">
            <button>foo</button>
          </OverflowItem>
          <OverflowItem id="3">
            <button>foo</button>
          </OverflowItem>
        </div>
      </Overflow>,
    );
  });

  // Griffel → Tailwind + CSS Modules migration. react-overflow has no `isConformant`
  // harness (it renders no element of its own — it clones the consumer's child — so the
  // default suite does not apply), which means the two conformance tests the cookbook
  // prescribes for a converted package, `component-has-group-marker` and
  // `classname-overrides-win`, have nowhere to run. These assertions are their hand-written
  // equivalents; they must keep passing for the same reasons those tests exist.
  describe('class composition', () => {
    // Written as a literal, exactly as it is in the styles hook — greppable and identical to
    // what `component-has-group-marker` derives from a component's name (DECISIONS.md D15.1).
    const marker = 'group/fui-overflow';

    it('stamps the named group marker on the cloned child', () => {
      const { getByTestId } = render(
        <Overflow>
          <div data-testid="child" />
        </Overflow>,
      );

      expect(getByTestId('child').classList.contains(marker)).toBe(true);
      // The published identity constant must keep pointing at the marker (DECISIONS.md D16.5).
      // eslint-disable-next-line @typescript-eslint/no-deprecated -- deprecated for STYLING; it is still the identity contract.
      expect(overflowClassNames.root).toBe(marker);
    });

    it('never emits the marker as classList[0]', () => {
      // DECISIONS.md D15.1 / D16.2: nwsapi's jsdom `:scope` polyfill anchors on
      // `escape(element.classList[0])` and the `/` survives that escaping, so a marker in
      // that position makes every `:scope` query throw at render time.
      const { getByTestId } = render(
        <Overflow>
          <div data-testid="child" />
        </Overflow>,
      );

      expect(getByTestId('child').classList[0]).not.toMatch(/^(group|peer)\//);
    });

    it("keeps the consumer's own className on the cloned child", () => {
      const { getByTestId } = render(
        <Overflow>
          <div data-testid="child" className="user-class" />
        </Overflow>,
      );

      const child = getByTestId('child');

      expect(child.classList.contains('user-class')).toBe(true);
      expect(child.classList.contains(marker)).toBe(true);
      // Consumer last — an unlayered consumer rule beats every layered library rule, and
      // ordering it last is what the cookbook's class-composition rule requires.
      expect(child.className.trim().split(/\s+/).pop()).toBe('user-class');
    });
  });

  describe('ref', () => {
    it('handles ref propagation', () => {
      const itemRef = jest.fn();
      const childRef = jest.fn();

      render(
        <Overflow ref={itemRef}>
          <div id="child" ref={childRef} />
        </Overflow>,
      );

      expect(itemRef).toHaveBeenCalledTimes(1);
      expect(itemRef).toHaveBeenCalledWith(expect.objectContaining({ id: 'child', tagName: 'DIV' }));

      expect(childRef).toHaveBeenCalledTimes(1);
      expect(childRef).toHaveBeenCalledWith(expect.objectContaining({ id: 'child', tagName: 'DIV' }));
    });
  });
});
