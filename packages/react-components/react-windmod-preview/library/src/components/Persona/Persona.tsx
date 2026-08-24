'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderPersona, usePersona } from '@fluentui/react-headless-components-preview/persona';

import { Avatar } from '../Avatar';
import type { AvatarSize } from '../Avatar';
import type { PersonaProps, PersonaSize } from './Persona.types';
import { usePersonaStyles } from './usePersonaStyles';

// Griffel's own map (react-persona useAvatar sizes), and every value is a member of AvatarSize.
const avatarSizes: Record<PersonaSize, AvatarSize> = {
  'extra-small': 20,
  small: 28,
  medium: 32,
  large: 36,
  'extra-large': 40,
  huge: 56,
};

/**
 * A Persona shows a person or entity as an avatar beside up to four lines of text. Windmod
 * Persona: the headless persona decorated with the Fluent visual contract (Tailwind v4 + CSS
 * Modules).
 */
export const Persona: ForwardRefComponent<PersonaProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-persona's styled usePersona. `avatar` is destructured out
  // because the headless hook forwards its own rest props to the root, which puts an unresolved
  // `avatar` shorthand on the DOM as an attribute.
  const { avatar, size = 'medium', textAlignment = 'start', ...rest } = props;

  const base = usePersona(rest, ref);

  // The headless avatar slot is the headless Avatar, which ships no glyph, no colour and no size
  // ladder; the Fluent coin lives in the styled layer windmod replaces, so the slot renders
  // windmod's own Avatar and receives the size Griffel's Persona maps from its own. Rebuilding the
  // slot rather than spreading the headless one keeps every prop windmod-typed: windmod's Avatar
  // narrows `color`, so the headless slot's wider type is not assignable here.
  return renderPersona(
    usePersonaStyles({
      ...base,
      // eslint-disable-next-line @typescript-eslint/no-deprecated -- reading base.components to keep every other slot's element type
      components: { ...base.components, avatar: Avatar },
      avatar: slot.optional(avatar, {
        renderByDefault: true,
        defaultProps: { name: props.name, size: avatarSizes[size] },
        elementType: Avatar,
      }),
      size,
      textAlignment,
    }),
  );
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<PersonaProps>;

Persona.displayName = 'Persona';
