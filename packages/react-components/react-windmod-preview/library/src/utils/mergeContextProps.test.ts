import { mergeContextProps } from './mergeContextProps';

describe('mergeContextProps', () => {
  describe('no-op cases', () => {
    it('returns the caller’s own props object when there is no provider', () => {
      const props = { size: 'medium' };

      // Identity, not just equality: the no-provider path is the common one and must not allocate.
      expect(mergeContextProps(undefined, props)).toBe(props);
    });

    it('returns the caller’s own props object when every context key is undefined', () => {
      const props = { size: 'medium' };

      expect(mergeContextProps({ size: undefined }, props)).toBe(props);
    });

    it('leaves a key the context does not mention alone', () => {
      const merged = mergeContextProps<{ size?: string; appearance?: string }>(
        { size: 'small' },
        { appearance: 'primary' },
      );

      expect(merged.appearance).toBe('primary');
    });
  });

  describe('scalars — local wins, context defaults', () => {
    it('takes the context value when the local prop is undefined', () => {
      expect(mergeContextProps<{ size?: string }>({ size: 'small' }, {}).size).toBe('small');
    });

    it('keeps the local prop when the consumer passed one', () => {
      expect(mergeContextProps({ size: 'small' }, { size: 'large' }).size).toBe('large');
    });

    it('keeps a falsy local prop — `false` is a value the consumer chose, not an absence', () => {
      expect(mergeContextProps({ inline: true }, { inline: false }).inline).toBe(false);
    });

    it('keeps a local `0`, which `||` would have discarded', () => {
      expect(mergeContextProps({ size: 32 }, { size: 0 }).size).toBe(0);
    });
  });

  describe('callbacks — both fire, context first', () => {
    it('calls the context handler and then the local one', () => {
      const calls: string[] = [];
      const merged = mergeContextProps<{ onClick?: (value: string) => void }>(
        {
          onClick: () => {
            calls.push('context');
          },
        },
        {
          onClick: () => {
            calls.push('local');
          },
        },
      );

      merged.onClick?.('ev');

      expect(calls).toEqual(['context', 'local']);
    });

    it('forwards every argument to both handlers', () => {
      const fromContext = jest.fn();
      const local = jest.fn();
      const merged = mergeContextProps<{ onChange?: (a: string, b: number) => void }>(
        { onChange: fromContext },
        { onChange: local },
      );

      merged.onChange?.('ev', 3);

      expect(fromContext).toHaveBeenCalledWith('ev', 3);
      expect(local).toHaveBeenCalledWith('ev', 3);
    });

    it('still calls the context handler when the consumer passed none', () => {
      const fromContext = jest.fn();
      const merged = mergeContextProps<{ onClick?: () => void }>({ onClick: fromContext }, {});

      merged.onClick?.();

      expect(fromContext).toHaveBeenCalledTimes(1);
    });

    it('does not merge a function under a non-`on*` key — `ref` stays local-wins', () => {
      const fromContext = jest.fn();
      const local = jest.fn();
      const merged = mergeContextProps<{ ref?: (node: unknown) => void }>({ ref: fromContext }, { ref: local });

      merged.ref?.(null);

      // Merging refs needs useMergedRefs, which is a hook and cannot live in a pure helper.
      expect(merged.ref).toBe(local);
      expect(fromContext).not.toHaveBeenCalled();
    });

    it('does not merge an `on*` key whose local value is not callable', () => {
      const merged = mergeContextProps<{ onClick?: unknown }>({ onClick: jest.fn() }, { onClick: 'not a function' });

      expect(merged.onClick).toBe('not a function');
    });
  });

  describe('className — clsx(context, local)', () => {
    it('concatenates context first and local last', () => {
      expect(mergeContextProps({ className: 'from-context' }, { className: 'from-local' }).className).toBe(
        'from-context from-local',
      );
    });

    it('keeps the context class when the consumer passed none', () => {
      expect(mergeContextProps<{ className?: string }>({ className: 'from-context' }, {}).className).toBe(
        'from-context',
      );
    });
  });

  describe('style — spreads in the same direction as className', () => {
    it('lets the local declaration win a shared property', () => {
      const merged = mergeContextProps<{ style?: Record<string, unknown> }>(
        { style: { color: 'red', margin: 0 } },
        { style: { color: 'blue' } },
      );

      expect(merged.style).toEqual({ color: 'blue', margin: 0 });
    });
  });

  describe('immutability', () => {
    it('mutates neither input', () => {
      const contextValue = Object.freeze({ size: 'small', className: 'from-context' });
      const props = Object.freeze({ className: 'from-local' });

      const merged = mergeContextProps<{ size?: string; className?: string }>(contextValue, props);

      expect(merged).not.toBe(props);
      expect(merged).toEqual({ size: 'small', className: 'from-context from-local' });
      expect(contextValue).toEqual({ size: 'small', className: 'from-context' });
      expect(props).toEqual({ className: 'from-local' });
    });
  });
});
