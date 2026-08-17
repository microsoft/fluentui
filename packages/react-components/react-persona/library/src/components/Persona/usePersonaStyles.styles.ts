import { clsx } from 'clsx';
import type { PersonaState } from './Persona.types';

import styles from './Persona.module.css';

/**
 * Public identity classes for Persona.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (`migration/griffel-to-tailwind/reports/DECISIONS.md`,
 * D15.1 / D16.5) — usable as a selector and as a `group-*` variant target. The per-slot keys
 * (`avatar`, `presence`, `primaryText`, `secondaryText`, `tertiaryText`, `quaternaryText`)
 * were removed: there is no public class-name handle on component internals any more.
 *
 * The `/` in the marker is legal in a class TOKEN but not in a class SELECTOR, so
 * `'.' + personaClassNames.root` is invalid. Use `fuiSelector()` from
 * `@fluentui/react-utilities` (or `@fluentui/react-components`) at every selector site.
 */
export const personaClassNames: { root: string } = {
  root: 'group/fui-persona',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * Both attributes live on Persona's OWN root and nowhere else. The `avatar` and `presence`
 * slots are another component's root — an `<Avatar>` and a `<PresenceBadge>` — and those
 * components' styles hooks stamp their own attributes there; react-badge's
 * `usePresenceBadgeStyles_unstable` already writes `root['data-size'] = size`, which would
 * silently overwrite anything Persona put on the same name. Everything Persona applies to
 * the coin therefore rides module classes, and its one scale-driven slice (the spacing
 * custom property) is declared on the root instead, where the coin inherits it — see the
 * hoist note in Persona.module.css.
 */
type PersonaRootDataAttributes = {
  'data-size': PersonaState['size'];
  'data-text-position': PersonaState['textPosition'];
};

/**
 * `useAvatarSpacingStyles` / `usePresenceSpacingStyles` reproduced as class maps.
 *
 * The six size keys selected the `--fui-Persona__avatar--spacing` value, which is now
 * declared on the root via `data-size`, so they are absent here — except the one size at
 * which a presence coin differs from an avatar (`small` → `spacingHorizontalSNudge`),
 * which is what `usePresenceSpacingStyles` existed to express and still has to be declared
 * on the coin itself. The three `textPosition` keys are the margin itself and stay on the
 * coin unchanged. The spread mirrors the Griffel hook's
 * `{ ...avatarSpacingStyles, ...usePresenceSpacingStyles() }`.
 */
const avatarSpacingStyles: Record<string, string | undefined> = {
  after: styles['spacing-after'],
  below: styles['spacing-below'],
  before: styles['spacing-before'],
};

const presenceSpacingStyles: Record<string, string | undefined> = {
  ...avatarSpacingStyles,
  small: styles['presence-spacing-s-nudge'],
};

/**
 * Apply styling to the Persona slots based on the state
 */
export const usePersonaStyles_unstable = (state: PersonaState): PersonaState => {
  const { presenceOnly, size, textAlignment, textPosition } = state;

  const alignToPrimary = presenceOnly && textAlignment === 'start' && size !== 'extra-large' && size !== 'huge';
  const alignBeforeAfterCenter = textPosition !== 'below' && textAlignment === 'center';
  const { primaryTextClassName, optionalTextClassName } = getTextClassNames(state, alignToPrimary);

  const root = state.root as PersonaState['root'] & PersonaRootDataAttributes;

  root['data-size'] = size;
  root['data-text-position'] = textPosition;

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    personaClassNames.root,
    alignBeforeAfterCenter && styles['before-after-center'],
    state.root.className,
  );

  if (state.avatar) {
    state.avatar.className = clsx(
      textPosition !== 'below' && styles.media,
      alignBeforeAfterCenter && styles['media-before-after-center'],
      styles[textAlignment],
      avatarSpacingStyles[textPosition],
      state.avatar.className,
    );
  }

  if (state.presence) {
    state.presence.className = clsx(
      textPosition !== 'below' && styles.media,
      alignBeforeAfterCenter && styles['media-before-after-center'],
      styles[textAlignment],
      presenceSpacingStyles[size],
      presenceSpacingStyles[textPosition],
      textPosition === 'after' && alignToPrimary && styles['presence-after-align-to-primary'],
      textPosition === 'before' && alignToPrimary && styles['presence-before-align-to-primary'],
      state.presence.className,
    );
  }

  if (state.primaryText) {
    state.primaryText.className = clsx(
      alignBeforeAfterCenter && styles.primary,
      primaryTextClassName,
      state.primaryText.className,
    );
  }

  if (state.secondaryText) {
    state.secondaryText.className = clsx(
      alignBeforeAfterCenter && styles.secondary,
      optionalTextClassName,
      styles['second-line-spacing'],
      state.secondaryText.className,
    );
  }

  if (state.tertiaryText) {
    state.tertiaryText.className = clsx(
      alignBeforeAfterCenter && styles.tertiary,
      optionalTextClassName,
      state.tertiaryText.className,
    );
  }

  if (state.quaternaryText) {
    state.quaternaryText.className = clsx(
      alignBeforeAfterCenter && styles.quaternary,
      optionalTextClassName,
      state.quaternaryText.className,
    );
  }

  return state;
};

/**
 * The former `useTextClassNames`, renamed because it no longer calls a React hook —
 * `usePrimaryTextBaseClassName` / `useOptionalTextBaseClassName` / `useTextStyles` were
 * Griffel hooks and are now plain class lookups. Keeping the `use` prefix would make
 * `usePersonaStyles_unstable` look like a hook to `eslint-plugin-react-hooks` even though
 * nothing in this file calls React any more. Private to this module; no export changed.
 *
 * The branching itself is byte-for-byte the Griffel original.
 */
const getTextClassNames = (
  state: PersonaState,
  alignToPrimary: boolean,
): {
  primaryTextClassName: string;
  optionalTextClassName: string;
} => {
  const { presenceOnly, size, textPosition } = state;

  let primaryTextSize;
  let alignToPrimaryClassName;

  if (presenceOnly) {
    if (size === 'extra-small') {
      primaryTextSize = state.numTextLines <= 1 && styles.caption1;
    } else if (size === 'extra-large' || size === 'huge') {
      primaryTextSize = styles.subtitle2;
    }

    if (alignToPrimary) {
      if (textPosition === 'before') {
        alignToPrimaryClassName = styles['text-before-align-to-primary'];
      } else if (textPosition === 'after') {
        alignToPrimaryClassName = styles['text-after-align-to-primary'];
      }
    }
  } else {
    if (size === 'huge') {
      primaryTextSize = styles.subtitle2;
    } else if (size === 'extra-large') {
      primaryTextSize = styles.subtitle2;
    }
  }

  return {
    primaryTextClassName: clsx(styles['primary-text-base'], primaryTextSize, alignToPrimaryClassName),
    optionalTextClassName: clsx(
      styles['optional-text-base'],
      !presenceOnly && size === 'huge' && styles.body1,
      alignToPrimaryClassName,
    ),
  };
};
