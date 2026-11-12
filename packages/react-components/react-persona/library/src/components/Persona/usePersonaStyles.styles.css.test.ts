import { renderHook } from '@testing-library/react-hooks';
import { usePersona_unstable } from './usePersona';
import { usePersonaStyles_unstable as applyStyles } from './usePersonaStyles.styles.css';

jest.mock('./Persona.module.css', () => ({
  after: 'css-after',
  'alignment-center': 'css-alignment-center',
  'alignment-start': 'css-alignment-start',
  avatar: 'css-avatar',
  before: 'css-before',
  below: 'css-below',
  'extra-large': 'css-extra-large',
  'extra-small': 'css-extra-small',
  huge: 'css-huge',
  large: 'css-large',
  medium: 'css-medium',
  presence: 'css-presence',
  presenceOnly: 'css-presenceOnly',
  primaryText: 'css-primaryText',
  quaternaryText: 'css-quaternaryText',
  root: 'css-root',
  secondaryText: 'css-secondaryText',
  singleLine: 'css-singleLine',
  small: 'css-small',
  tertiaryText: 'css-tertiaryText',
}));

describe('usePersonaStyles_unstable (CSS Modules)', () => {
  it('uses the default state without changing the state identity', () => {
    const { result } = renderHook(() => usePersona_unstable({}, null));
    const state = result.current;

    expect(applyStyles(state)).toBe(state);
    expect(state.root.className).toBe('fui-Persona css-root css-medium css-after css-alignment-start css-singleLine');
  });

  it('preserves caller classes last on every present slot', () => {
    const { result } = renderHook(() =>
      usePersona_unstable(
        {
          className: 'caller-root',
          avatar: { className: 'caller-avatar' },
          primaryText: { className: 'caller-primaryText' },
          secondaryText: { className: 'caller-secondaryText' },
          tertiaryText: { className: 'caller-tertiaryText' },
          quaternaryText: { className: 'caller-quaternaryText' },
        },
        null,
      ),
    );
    const state = applyStyles(result.current);

    expect(state.root.className?.endsWith(' caller-root')).toBe(true);
    expect(state.avatar?.className?.endsWith(' caller-avatar')).toBe(true);
    expect(state.primaryText?.className?.endsWith(' caller-primaryText')).toBe(true);
    expect(state.secondaryText?.className?.endsWith(' caller-secondaryText')).toBe(true);
    expect(state.tertiaryText?.className?.endsWith(' caller-tertiaryText')).toBe(true);
    expect(state.quaternaryText?.className?.endsWith(' caller-quaternaryText')).toBe(true);
  });

  it('does not create absent optional slots', () => {
    const { result } = renderHook(() =>
      usePersona_unstable(
        {
          avatar: null,
          presence: null,
          primaryText: null,
          secondaryText: null,
          tertiaryText: null,
          quaternaryText: null,
        },
        null,
      ),
    );
    const state = applyStyles(result.current);
    expect(state.avatar).toBeUndefined();
    expect(state.presence).toBeUndefined();
    expect(state.primaryText).toBeUndefined();
    expect(state.secondaryText).toBeUndefined();
    expect(state.tertiaryText).toBeUndefined();
    expect(state.quaternaryText).toBeUndefined();
  });

  it.each(['extra-small', 'small', 'medium', 'large', 'extra-large', 'huge'] as const)(
    'owns %s media and typography state on the root',
    size => {
      for (const presenceOnly of [false, true]) {
        for (const textPosition of ['before', 'after', 'below'] as const) {
          for (const textAlignment of ['start', 'center'] as const) {
            const { result } = renderHook(() =>
              usePersona_unstable(
                {
                  name: 'Name',
                  size,
                  presenceOnly,
                  presence: {},
                  textPosition,
                  textAlignment,
                  secondaryText: 'Secondary',
                  tertiaryText: 'Tertiary',
                  quaternaryText: 'Quaternary',
                },
                null,
              ),
            );
            const state = applyStyles(result.current);
            expect(state.root.className).toContain(`css-${size} css-${textPosition} css-alignment-${textAlignment}`);
            expect(state.root.className?.includes('css-presenceOnly')).toBe(presenceOnly);
            expect(state.root.className).not.toContain('css-singleLine');
            expect(state.primaryText?.className).toBe('fui-Persona__primaryText css-primaryText');
            expect(state.secondaryText?.className).toBe('fui-Persona__secondaryText css-secondaryText');
            if (presenceOnly) {
              expect(state.avatar).toBeUndefined();
              expect(state.presence?.className).toBe('fui-Persona__presence css-presence');
            } else {
              expect(state.avatar?.className).toBe('fui-Persona__avatar css-avatar');
            }
          }
        }
      }
    },
  );
});
