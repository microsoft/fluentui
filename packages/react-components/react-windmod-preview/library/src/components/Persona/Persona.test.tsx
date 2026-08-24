import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Persona } from './Persona';
import type { PersonaState } from './Persona.types';
import { personaClassNames, usePersonaStyles } from './usePersonaStyles';

import styles from './Persona.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/persona', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/persona');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    usePersona: (...args: Parameters<typeof actual.usePersona>) => deepFreezeState(actual.usePersona(...args)),
  };
});

const sizes = ['extra-small', 'small', 'medium', 'large', 'extra-large', 'huge'] as const;
const textPositions = ['after', 'before', 'below'] as const;
const avatarSizes = { 'extra-small': '20', small: '28', medium: '32', large: '36', 'extra-large': '40', huge: '56' };

// The root is the primary slot, so a data-testid lands there too; firstElementChild is unambiguous.
// The coin is found by Avatar's own marker class rather than by a module ident, because this
// module's `root` and the Avatar module's `root` are the same string under the jest ident proxy
// (fuicm-root) while the built idents differ.
const parts = (root: HTMLElement) => ({
  root,
  coin: root.querySelector<HTMLElement>('.fui-avatar'),
  primaryText: root.querySelector<HTMLElement>(`.${styles.primaryText}`),
  secondaryText: root.querySelector<HTMLElement>(`.${styles.secondaryText}`),
  tertiaryText: root.querySelector<HTMLElement>(`.${styles.tertiaryText}`),
  quaternaryText: root.querySelector<HTMLElement>(`.${styles.quaternaryText}`),
});

const renderPersona = (props: React.ComponentProps<typeof Persona> = {}) => {
  const { container } = render(<Persona {...props} />);

  return parts(container.firstElementChild as HTMLElement);
};

const fourLines = {
  name: 'Kevin Sturgis',
  secondaryText: 'Available',
  tertiaryText: 'Software Engineer',
  quaternaryText: 'Microsoft',
} as const;

describe('Persona', () => {
  isConformant({
    Component: Persona,
    displayName: 'Persona',
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderPersona(fourLines);

    expect(root).toHaveClass('fui-persona');
    expect(root).toHaveClass('group/fui-persona');
    expect(root.classList[0]).toBe('fui-persona');
    expect(personaClassNames.root).toBe('fui-persona group/fui-persona');
  });

  it('carries its own module class on the root', () => {
    // Structural read: `styles.root` collides with the Avatar module's `root` under the jest ident
    // proxy, so this is only ever asserted as a presence on the persona root itself.
    const { root } = renderPersona(fourLines);

    expect(root).toHaveClass(styles.root);
  });

  it('applies one module class per slot, and never a class belonging to another slot', () => {
    const { primaryText, secondaryText, tertiaryText, quaternaryText } = renderPersona(fourLines);

    expect(primaryText).toHaveClass(styles.primaryText);
    expect(primaryText).not.toHaveClass(styles.optionalText);

    expect(secondaryText).toHaveClass(styles.optionalText);
    expect(secondaryText).toHaveClass(styles.secondaryText);
    expect(secondaryText).not.toHaveClass(styles.primaryText);
    expect(secondaryText).not.toHaveClass(styles.tertiaryText);

    expect(tertiaryText).toHaveClass(styles.optionalText);
    expect(tertiaryText).toHaveClass(styles.tertiaryText);
    expect(tertiaryText).not.toHaveClass(styles.secondaryText);

    expect(quaternaryText).toHaveClass(styles.optionalText);
    expect(quaternaryText).toHaveClass(styles.quaternaryText);
    expect(quaternaryText).not.toHaveClass(styles.tertiaryText);

    expect(renderPersona(fourLines).coin).toHaveClass(styles.avatar);
  });

  it('renders the avatar slot as a windmod Avatar rather than a bare span', () => {
    const { coin } = renderPersona(fourLines);

    expect(coin).not.toBeNull();
    expect(coin).toHaveClass('fui-avatar');
    expect(coin).toHaveClass('group/fui-avatar');
    expect(coin).toHaveClass(styles.avatar);
  });

  it('renders the coin with no avatar prop at all', () => {
    const { coin } = renderPersona({ name: 'Kevin Sturgis' });

    expect(coin).not.toBeNull();
    expect(coin).toHaveClass('fui-avatar');
  });

  it('keeps the name on the rebuilt avatar slot', () => {
    // Rebuilding the slot discards the base hook's own `name` default, so the initials are the
    // only signal that it was re-supplied — without it the coin silently falls back to the glyph.
    const { coin } = renderPersona({ name: 'Kevin Sturgis' });

    expect(coin!.textContent).toBe('KS');
    expect(coin!.querySelector('svg')).toBeNull();
  });

  it('maps the Persona size onto the Avatar size', () => {
    sizes.forEach(size => {
      const { root, coin } = renderPersona({ ...fourLines, size });

      expect(root.getAttribute('data-size')).toBe(size);
      expect(coin!.getAttribute('data-size')).toBe(avatarSizes[size]);
    });
  });

  it("lets a consumer's own avatar size win over the mapped size", () => {
    const { coin } = renderPersona({ ...fourLines, avatar: { size: 24 }, size: 'huge' });

    expect(coin!.getAttribute('data-size')).toBe('24');
  });

  it('defaults size to medium and textAlignment to start', () => {
    const { root, coin } = renderPersona({ name: 'Kevin Sturgis' });

    expect(root.getAttribute('data-size')).toBe('medium');
    expect(root.getAttribute('data-text-alignment')).toBe('start');
    expect(coin!.getAttribute('data-size')).toBe('32');
  });

  it('stamps data attributes on the root alone', () => {
    const { root, coin, primaryText, secondaryText } = renderPersona({
      ...fourLines,
      size: 'large',
      textAlignment: 'center',
    });

    expect(root.getAttributeNames().sort()).toEqual([
      'class',
      'data-size',
      'data-text-alignment',
      'data-text-position',
    ]);
    expect(root.getAttribute('data-text-alignment')).toBe('center');
    expect(primaryText!.hasAttribute('data-size')).toBe(false);
    expect(primaryText!.hasAttribute('data-text-alignment')).toBe(false);
    expect(secondaryText!.hasAttribute('data-text-position')).toBe(false);
    // The coin carries its own Avatar size, never the Persona's named one.
    expect(coin!.hasAttribute('data-text-alignment')).toBe(false);
  });

  it('leaves data-text-position to the headless hook and never re-stamps it', () => {
    textPositions.forEach(textPosition => {
      const { root } = renderPersona({ ...fourLines, textPosition });

      expect(root.getAttribute('data-text-position')).toBe(textPosition);
      expect(
        root
          .getAttribute('class')!
          .split(/\s+/)
          .filter(token => token === styles.root),
      ).toHaveLength(1);
    });

    expect(renderPersona(fourLines).root.getAttribute('data-text-position')).toBe('after');
  });

  it('never lets the avatar shorthand reach the DOM as an attribute', () => {
    // The headless hook forwards its rest props to the root, so an undestructured `avatar` lands
    // there as `avatar="[object Object]"`. Nothing else in this spec would notice.
    expect(renderPersona({ ...fourLines, avatar: { color: 'brand' } }).root.hasAttribute('avatar')).toBe(false);
    expect(renderPersona({ ...fourLines, avatar: { size: 24 } }).root.hasAttribute('avatar')).toBe(false);
    expect(renderPersona({ ...fourLines, avatar: <span /> }).root.hasAttribute('avatar')).toBe(false);
  });

  it('removes the coin for avatar={null}', () => {
    const { root, coin, primaryText, secondaryText } = renderPersona({ ...fourLines, avatar: null });

    expect(coin).toBeNull();
    expect(root.querySelector('.fui-avatar')).toBeNull();
    expect(primaryText).not.toBeNull();
    expect(secondaryText).not.toBeNull();
    expect(root.children).toHaveLength(4);
  });

  it('removes the first line for primaryText={null}', () => {
    const { root, coin, primaryText } = renderPersona({ name: 'Kevin Sturgis', primaryText: null });

    expect(primaryText).toBeNull();
    expect(coin).not.toBeNull();
    expect(root.children).toHaveLength(1);
    expect(root.children[0]).toBe(coin);
  });

  it('renders the slots in order, with the coin last only for textPosition="before"', () => {
    const after = renderPersona(fourLines);

    expect(Array.from(after.root.children)).toEqual([
      after.coin,
      after.primaryText,
      after.secondaryText,
      after.tertiaryText,
      after.quaternaryText,
    ]);

    const below = renderPersona({ ...fourLines, textPosition: 'below' });

    expect(below.root.children[0]).toBe(below.coin);

    const before = renderPersona({ ...fourLines, textPosition: 'before' });

    expect(Array.from(before.root.children)).toEqual([
      before.primaryText,
      before.secondaryText,
      before.tertiaryText,
      before.quaternaryText,
      before.coin,
    ]);
  });

  it('lands native props on the root', () => {
    const { root } = renderPersona({
      ...fourLines,
      className: 'consumer',
      'data-testid': 't',
      id: 'my-id',
      style: { width: 320 },
    } as React.ComponentProps<typeof Persona>);

    expect(root.id).toBe('my-id');
    expect(root.getAttribute('data-testid')).toBe('t');
    expect(root).toHaveClass('consumer');
    expect(root.style.width).toBe('320px');
  });

  it('keeps a consumer className on each slot exactly once', () => {
    // classList is an ordered set, so a duplicated token is only visible in the raw attribute.
    const tokensOf = (element: HTMLElement) => element.getAttribute('class')!.split(/\s+/);

    const { root, coin, primaryText } = renderPersona({
      ...fourLines,
      avatar: { className: 'consumer-coin' },
      className: 'consumer',
      primaryText: { children: 'Kevin Sturgis', className: 'consumer-primary' },
    });

    expect(tokensOf(root).filter(token => token === 'consumer')).toHaveLength(1);
    expect(tokensOf(root).filter(token => token === styles.root)).toHaveLength(1);

    expect(tokensOf(coin!).filter(token => token === 'consumer-coin')).toHaveLength(1);
    expect(tokensOf(coin!).filter(token => token === styles.avatar)).toHaveLength(1);

    expect(tokensOf(primaryText!).filter(token => token === 'consumer-primary')).toHaveLength(1);
    expect(tokensOf(primaryText!).filter(token => token === styles.primaryText)).toHaveLength(1);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: {
        root: 'div',
        avatar: 'span',
        primaryText: 'span',
        secondaryText: 'span',
        tertiaryText: 'span',
        quaternaryText: 'span',
      },
      avatar: { className: 'consumer-coin' },
      primaryText: { className: 'consumer-primary' },
      quaternaryText: { className: 'consumer-quaternary' },
      root: { className: 'consumer' },
      secondaryText: { className: 'consumer-secondary' },
      size: 'large',
      tertiaryText: { className: 'consumer-tertiary' },
      textAlignment: 'center',
      textPosition: 'after',
    } as unknown as PersonaState;

    const styled = usePersonaStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.avatar).not.toBe(state.avatar);
    expect(styled.primaryText).not.toBe(state.primaryText);
    expect(styled.secondaryText).not.toBe(state.secondaryText);
    expect(styled.tertiaryText).not.toBe(state.tertiaryText);
    expect(styled.quaternaryText).not.toBe(state.quaternaryText);

    expect(state.root.className).toBe('consumer');
    expect(state.avatar!.className).toBe('consumer-coin');
    expect(state.primaryText!.className).toBe('consumer-primary');
    expect(state.secondaryText!.className).toBe('consumer-secondary');
    expect(state.tertiaryText!.className).toBe('consumer-tertiary');
    expect(state.quaternaryText!.className).toBe('consumer-quaternary');
    expect('data-size' in state.root).toBe(false);
    expect('data-text-alignment' in state.root).toBe(false);

    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(personaClassNames.root);
    expect(styled.root.className).toContain(styles.root);
    expect(styled.avatar!.className).toContain(styles.avatar);
    expect(styled.primaryText!.className).toContain(styles.primaryText);
    expect(styled.secondaryText!.className).toContain(styles.optionalText);
    expect(styled.secondaryText!.className).toContain(styles.secondaryText);
    expect(styled.tertiaryText!.className).toContain(styles.tertiaryText);
    expect(styled.quaternaryText!.className).toContain(styles.quaternaryText);
  });

  it('renders the full pipeline against a frozen headless state without throwing', () => {
    expect(() => renderPersona()).not.toThrow();
    expect(() => renderPersona({ ...fourLines, avatar: null })).not.toThrow();
    expect(() => renderPersona({ ...fourLines, primaryText: null })).not.toThrow();

    sizes.forEach(size => {
      textPositions.forEach(textPosition => {
        (['start', 'center'] as const).forEach(textAlignment => {
          expect(() => renderPersona({ ...fourLines, size, textAlignment, textPosition })).not.toThrow();
        });
      });
    });
  });
});
