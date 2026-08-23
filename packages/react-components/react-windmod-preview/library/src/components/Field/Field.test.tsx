import * as React from 'react';
import { render } from '@testing-library/react';
import { useFieldContext } from '@fluentui/react-headless-components-preview/field';
import { CheckmarkCircle12Filled } from '@fluentui/react-icons/headless/svg/checkmark-circle';
import { DiamondDismiss12Filled } from '@fluentui/react-icons/headless/svg/diamond-dismiss';
import { Warning12Filled } from '@fluentui/react-icons/headless/svg/warning';

import { Input } from '../Input';
import { isConformant } from '../../testing/isConformant';
import { Field } from './Field';
import type { FieldState } from './Field.types';
import { fieldClassNames, useFieldStyles } from './useFieldStyles';

import styles from './Field.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/field', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/field');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useField: (...args: Parameters<typeof actual.useField>) => deepFreezeState(actual.useField(...args)),
  };
});

const orientations = ['vertical', 'horizontal'] as const;
const sizes = ['small', 'medium', 'large'] as const;

// The root is the primary slot, so a data-testid lands there too; firstElementChild is unambiguous.
// The message and hint are read by their generated id suffixes so a dropped module class cannot
// hide either of them.
const parts = (root: HTMLElement) => {
  const validationMessage = root.querySelector<HTMLElement>('[id$="__validationMessage"]');

  return {
    root,
    label: root.querySelector<HTMLLabelElement>('label'),
    validationMessage,
    validationMessageIcon: validationMessage?.querySelector<HTMLElement>('span') ?? null,
    hint: root.querySelector<HTMLElement>('[id$="__hint"]'),
    control: root.querySelector<HTMLElement>('input'),
  };
};

const renderField = (props: React.ComponentProps<typeof Field> = {}) => {
  const { container } = render(<Field {...props} />);

  return parts(container.firstElementChild as HTMLElement);
};

const pathOf = (element: Element | null) => element?.querySelector('svg path')?.getAttribute('d') ?? null;

const standalonePath = (glyph: React.ReactElement) => {
  const { container } = render(glyph);

  return container.querySelector('path')!.getAttribute('d');
};

describe('Field', () => {
  isConformant({
    Component: Field,
    displayName: 'Field',
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderField();

    expect(root).toHaveClass('fui-field');
    expect(root).toHaveClass('group/fui-field');
    expect(root.classList[0]).toBe('fui-field');
    expect(fieldClassNames.root).toBe('fui-field group/fui-field');
  });

  it('applies one module class per slot, and never a class belonging to another slot', () => {
    const { root, label, validationMessage, validationMessageIcon, hint } = renderField({
      hint: 'H',
      label: 'L',
      validationMessage: 'V',
    });

    expect(root).toHaveClass(styles.root);
    expect(label).toHaveClass(styles.label);
    expect(validationMessage).toHaveClass(styles.secondaryText);
    expect(validationMessage).toHaveClass(styles.validationMessage);
    expect(validationMessageIcon).toHaveClass(styles.validationMessageIcon);
    expect(hint).toHaveClass(styles.secondaryText);
    expect(hint).not.toHaveClass(styles.validationMessage);

    expect(root).not.toHaveClass(styles.label);
    // `styles.root` is not assertable against the label: the jest ident proxy drops the component
    // token, so this module's `root` and the Label module's `root` are the same string under test
    // while the built idents differ (fuicm-field-root-… vs fuicm-label-root-…).
    expect(label).not.toHaveClass(styles.horizontalNoLabel);
    expect(label).not.toHaveClass(styles.secondaryText);
    expect(validationMessage).not.toHaveClass(styles.validationMessageIcon);
    expect(validationMessageIcon).not.toHaveClass(styles.secondaryText);
  });

  it('renders the label as a windmod Label rather than a bare <label>', () => {
    const { label } = renderField({ label: 'L' });

    expect(label).toHaveClass('fui-label');
    expect(label).toHaveClass('group/fui-label');
    expect(label).toHaveClass(styles.label);
    expect(label!.hasAttribute('required')).toBe(false);
  });

  it('keeps every slot element type and its components entry in agreement', () => {
    // assertSlots repairs a slot whose element type disagrees with state.components and warns;
    // the repair makes the disagreement invisible in the DOM, so the warning is the only signal.
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    try {
      renderField({ hint: 'H', label: 'L', validationMessage: 'V' });

      expect(warn).not.toHaveBeenCalled();
    } finally {
      warn.mockRestore();
    }
  });

  it('renders the required asterisk through the Label slot', () => {
    const { label } = renderField({ label: 'L', required: true });
    const asterisk = label!.querySelector('[aria-hidden="true"]');

    expect(label!.getAttribute('data-required')).toBe('');
    expect(asterisk).not.toBeNull();
    expect(asterisk!.textContent).toBe('*');

    expect(renderField({ label: 'L' }).label!.querySelector('[aria-hidden="true"]')).toBeNull();
  });

  it('feeds the Field size to the label and stamps it on the root too, at either orientation', () => {
    // Both stamps are read at both orientations: the root's drives the label's padding through
    // group-size-*, the label's own drives its typography, and neither is orientation-dependent.
    orientations.forEach(orientation => {
      sizes.forEach(size => {
        const { root, label } = renderField({ label: 'L', orientation, size });

        expect(root.getAttribute('data-size')).toBe(size);
        expect(label!.getAttribute('data-size')).toBe(size);
      });
    });

    const { root, label } = renderField({ label: 'L' });

    expect(root.getAttribute('data-size')).toBe('medium');
    expect(label!.getAttribute('data-size')).toBe('medium');
  });

  it("lets a consumer's own label size win over the Field's size, same as any other label prop", () => {
    const { label } = renderField({
      label: { children: 'L', size: 'small' } as React.ComponentProps<typeof Field>['label'],
      size: 'large',
    });

    expect(label!.getAttribute('data-size')).toBe('small');
  });

  it('defaults orientation to vertical and size to medium', () => {
    const { root } = renderField();

    expect(root.getAttribute('data-orientation')).toBe('vertical');
    expect(root.getAttribute('data-size')).toBe('medium');
  });

  it('applies the no-label horizontal class only when horizontal and label-less, at every size', () => {
    // The gate and the orientation stamp are size-independent: the grid track list they select
    // belongs to the orientation alone.
    sizes.forEach(size => {
      expect(renderField({ label: 'L', size }).root).not.toHaveClass(styles.horizontalNoLabel);
      expect(renderField({ label: 'L', orientation: 'horizontal', size }).root).not.toHaveClass(
        styles.horizontalNoLabel,
      );
      expect(renderField({ size }).root).not.toHaveClass(styles.horizontalNoLabel);

      const { root } = renderField({ orientation: 'horizontal', size });

      expect(root).toHaveClass(styles.horizontalNoLabel);
      expect(root.getAttribute('data-orientation')).toBe('horizontal');
      expect(renderField({ size }).root.getAttribute('data-orientation')).toBe('vertical');
    });
  });

  it('restores the glyph that matches the validation state', () => {
    const expected = {
      error: standalonePath(<DiamondDismiss12Filled />),
      warning: standalonePath(<Warning12Filled />),
      success: standalonePath(<CheckmarkCircle12Filled />),
    };

    expect(new Set(Object.values(expected)).size).toBe(3);

    (Object.keys(expected) as Array<keyof typeof expected>).forEach(validationState => {
      const { validationMessageIcon } = renderField({ validationMessage: 'V', validationState });

      expect(validationMessageIcon).not.toBeNull();
      expect(pathOf(validationMessageIcon)).toBe(expected[validationState]);
    });
  });

  it('renders no icon slot and no icon gutter for validationState="none"', () => {
    const { validationMessage, validationMessageIcon } = renderField({
      validationMessage: 'V',
      validationState: 'none',
    });

    expect(validationMessageIcon).toBeNull();
    expect(validationMessage).not.toHaveClass(styles.withIcon);
  });

  it('defaults a bare validationMessage to the error state, alert role and diamond glyph', () => {
    const { root, validationMessage, validationMessageIcon } = renderField({ validationMessage: 'V' });

    expect(root.getAttribute('data-validate-state')).toBe('error');
    expect(validationMessage!.getAttribute('role')).toBe('alert');
    expect(pathOf(validationMessageIcon)).toBe(standalonePath(<DiamondDismiss12Filled />));
  });

  it('passes the alert role through for error and warning only', () => {
    expect(
      renderField({ validationMessage: 'V', validationState: 'warning' }).validationMessage!.getAttribute('role'),
    ).toBe('alert');
    expect(
      renderField({ validationMessage: 'V', validationState: 'success' }).validationMessage!.hasAttribute('role'),
    ).toBe(false);
    expect(
      renderField({ validationMessage: 'V', validationState: 'none' }).validationMessage!.hasAttribute('role'),
    ).toBe(false);
  });

  it('gates the icon gutter on icon presence, not on the validation state', () => {
    const withConsumerIcon = renderField({
      validationMessage: 'V',
      validationMessageIcon: { className: 'x' },
      validationState: 'none',
    });

    expect(withConsumerIcon.validationMessageIcon).not.toBeNull();
    expect(withConsumerIcon.validationMessageIcon).toHaveClass('x');
    expect(withConsumerIcon.validationMessage).toHaveClass(styles.withIcon);

    const errorWithoutMessage = renderField({ validationState: 'error' });

    expect(errorWithoutMessage.validationMessage).toBeNull();
    expect(errorWithoutMessage.validationMessageIcon).toBeNull();
    expect(errorWithoutMessage.root.querySelector(`.${styles.withIcon}`)).toBeNull();
  });

  it('removes the icon slot for validationMessageIcon={null}', () => {
    const { validationMessage, validationMessageIcon } = renderField({
      validationMessage: 'V',
      validationMessageIcon: null,
    });

    expect(validationMessageIcon).toBeNull();
    expect(validationMessage).not.toHaveClass(styles.withIcon);
  });

  it('lets consumer icon children win over the restored glyph', () => {
    const element = renderField({ validationMessage: 'V', validationMessageIcon: <i data-custom="" /> });

    expect(element.validationMessageIcon!.querySelector('[data-custom]')).not.toBeNull();
    expect(element.validationMessageIcon!.querySelector('svg')).toBeNull();

    const text = renderField({ validationMessage: 'V', validationMessageIcon: 'ICON' });

    expect(text.validationMessageIcon!.textContent).toBe('ICON');
    expect(text.validationMessageIcon!.querySelector('svg')).toBeNull();

    const object = renderField({ validationMessage: 'V', validationMessageIcon: { children: <i data-custom="" /> } });

    expect(object.validationMessageIcon!.querySelector('[data-custom]')).not.toBeNull();
  });

  it('keeps both the consumer props and the glyph for a childless icon object', () => {
    const { validationMessage, validationMessageIcon } = renderField({
      validationMessage: 'V',
      validationMessageIcon: { className: 'x', id: 'icon' },
    });

    expect(validationMessageIcon).toHaveClass(styles.validationMessageIcon);
    expect(validationMessageIcon).toHaveClass('x');
    expect(validationMessageIcon!.id).toBe('icon');
    expect(pathOf(validationMessageIcon)).toBe(standalonePath(<DiamondDismiss12Filled />));
    expect(validationMessage).toHaveClass(styles.withIcon);
  });

  it('falls back to the glyph for icon children of null or undefined', () => {
    // The uniform glyph rule is nullish-coalescing, so both blank spellings take the default —
    // the one place windmod does not reproduce the Griffel Field's empty <span>.
    expect(
      pathOf(renderField({ validationMessage: 'V', validationMessageIcon: { children: null } }).validationMessageIcon),
    ).toBe(standalonePath(<DiamondDismiss12Filled />));
    expect(
      pathOf(
        renderField({ validationMessage: 'V', validationMessageIcon: { children: undefined } }).validationMessageIcon,
      ),
    ).toBe(standalonePath(<DiamondDismiss12Filled />));
  });

  it('treats falsy-but-present icon children as consumer content', () => {
    ([0, '', false] as const).forEach(children => {
      const { validationMessageIcon } = renderField({ validationMessage: 'V', validationMessageIcon: { children } });

      expect(validationMessageIcon!.querySelector('svg')).toBeNull();
    });

    expect(
      renderField({ validationMessage: 'V', validationMessageIcon: { children: 0 } }).validationMessageIcon!
        .textContent,
    ).toBe('0');
  });

  it('keeps the consumer label shorthand and the resolved slot defaults', () => {
    const { label } = renderField({ label: { children: 'L', className: 'lx' } });

    expect(label).toHaveClass('lx');
    expect(label).toHaveClass(styles.label);
    expect(label).toHaveClass('fui-label');
    expect(label!.textContent).toBe('L');
    expect(label!.id).toMatch(/__label$/);
    expect(label!.getAttribute('for')).toMatch(/__control$/);
  });

  it('styles the hint as secondary text without the validation colour', () => {
    const { hint } = renderField({ hint: 'H' });

    expect(hint).not.toBeNull();
    expect(hint!.id).toMatch(/__hint$/);
    expect(hint).toHaveClass(styles.secondaryText);
    expect(hint).not.toHaveClass(styles.validationMessage);
    expect(hint).not.toHaveClass(styles.withIcon);
  });

  it('publishes the look props on the field context', () => {
    const seen: Array<ReturnType<typeof useFieldContext>> = [];
    const Probe = () => {
      seen.push(useFieldContext());

      return null;
    };

    render(
      <Field label="L" orientation="horizontal" required size="large" validationMessage="V">
        <Probe />
      </Field>,
    );

    expect(seen[0]).toMatchObject({
      orientation: 'horizontal',
      required: true,
      size: 'large',
      validationState: 'error',
    });
    expect(seen[0]!.generatedControlId).toMatch(/__control$/);
    expect(seen[0]!.labelFor).toMatch(/__control$/);
    expect(seen[0]!.labelId).toMatch(/__label$/);
    expect(seen[0]!.validationMessageId).toMatch(/__validationMessage$/);
  });

  it('propagates the field context to a real control', () => {
    const { root, control, validationMessage } = (() => {
      const { container } = render(
        <Field label="L" required validationMessage="V">
          <Input />
        </Field>,
      );

      return parts(container.firstElementChild as HTMLElement);
    })();

    expect(root.getAttribute('data-validate-state')).toBe('error');
    expect(control!.id).toMatch(/__control$/);
    expect(control!.getAttribute('aria-describedby')).toBe(validationMessage!.id);
    expect(control!.getAttribute('aria-invalid')).toBe('true');
    expect((control as HTMLInputElement).required).toBe(true);
  });

  it('passes the control props to a render-function child', () => {
    const { container } = render(
      <Field label="L" required validationMessage="V">
        {controlProps => <input {...controlProps} />}
      </Field>,
    );
    const control = container.querySelector('input')!;

    expect(control.id).toMatch(/__control$/);
    expect(control.getAttribute('aria-labelledby')).toMatch(/__label$/);
    expect(control.getAttribute('aria-describedby')).toMatch(/__validationMessage$/);
    expect(control.getAttribute('aria-invalid')).toBe('true');
    expect(control.getAttribute('aria-required')).toBe('true');
  });

  it('renders the slots in order, with the icon inside the message', () => {
    const { root, label, validationMessage, validationMessageIcon, hint } = (() => {
      const { container } = render(
        <Field hint="H" label="L" validationMessage="V">
          <input />
        </Field>,
      );

      return parts(container.firstElementChild as HTMLElement);
    })();

    expect(root.children[0]).toBe(label);
    expect(root.children[1]!.tagName).toBe('INPUT');
    expect(root.children[2]).toBe(validationMessage);
    expect(root.children[3]).toBe(hint);
    expect(validationMessage!.firstElementChild).toBe(validationMessageIcon);
    expect(validationMessage!.textContent).toBe('V');
  });

  it('lands native props on the root', () => {
    const { root } = renderField({
      className: 'consumer',
      'data-testid': 't',
      id: 'my-id',
      style: { width: 320 },
    } as React.ComponentProps<typeof Field>);

    expect(root.id).toBe('my-id');
    expect(root.getAttribute('data-testid')).toBe('t');
    expect(root).toHaveClass('consumer');
    expect(root.style.width).toBe('320px');
  });

  it('keeps a consumer className on the root exactly once', () => {
    const { root } = renderField({ className: 'consumer' });

    // classList is an ordered set, so a duplicated token is only visible in the raw attribute.
    const tokens = root.getAttribute('class')!.split(/\s+/);

    expect(tokens.filter(token => token === 'consumer')).toHaveLength(1);
    expect(tokens.filter(token => token === styles.root)).toHaveLength(1);
  });

  it('stamps data attributes on the root alone', () => {
    const { root, label, validationMessage, validationMessageIcon, hint } = renderField({
      hint: 'H',
      label: 'L',
      orientation: 'horizontal',
      size: 'large',
      validationMessage: 'V',
    });

    expect(root.getAttributeNames().sort()).toEqual(['class', 'data-orientation', 'data-size', 'data-validate-state']);
    expect(label!.hasAttribute('data-orientation')).toBe(false);
    expect(validationMessage!.hasAttribute('data-orientation')).toBe(false);
    expect(validationMessage!.hasAttribute('data-validate-state')).toBe(false);
    expect(validationMessageIcon!.hasAttribute('data-validate-state')).toBe(false);
    expect(hint!.hasAttribute('data-size')).toBe(false);
  });

  it('carries the headless validate-state stamp at every state', () => {
    expect(renderField().root.getAttribute('data-validate-state')).toBe('none');

    (['error', 'warning', 'success', 'none'] as const).forEach(validationState => {
      expect(renderField({ validationMessage: 'V', validationState }).root.getAttribute('data-validate-state')).toBe(
        validationState,
      );
    });
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'div', label: 'label', validationMessage: 'div', validationMessageIcon: 'span', hint: 'div' },
      hint: { className: 'consumer-hint' },
      label: { className: 'consumer-label' },
      orientation: 'horizontal',
      root: { className: 'consumer' },
      size: 'large',
      validationMessage: { className: 'consumer-message' },
      validationMessageIcon: { className: 'consumer-icon' },
      validationState: 'error',
    } as unknown as FieldState;

    const styled = useFieldStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.label).not.toBe(state.label);
    expect(styled.validationMessage).not.toBe(state.validationMessage);
    expect(styled.validationMessageIcon).not.toBe(state.validationMessageIcon);
    expect(styled.hint).not.toBe(state.hint);

    expect(state.root.className).toBe('consumer');
    expect(state.label!.className).toBe('consumer-label');
    expect(state.validationMessage!.className).toBe('consumer-message');
    expect(state.validationMessageIcon!.className).toBe('consumer-icon');
    expect(state.hint!.className).toBe('consumer-hint');
    expect('data-orientation' in state.root).toBe(false);

    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(fieldClassNames.root);
    expect(styled.root.className).toContain(styles.root);
    expect(styled.root.className).not.toContain(styles.horizontalNoLabel);
    expect(styled.label!.className).toContain('consumer-label');
    expect(styled.validationMessage!.className).toContain(styles.withIcon);
    expect(styled.validationMessageIcon!.className).toContain('consumer-icon');
    expect(styled.hint!.className).toContain('consumer-hint');
  });

  it('renders without the optional slots and without throwing', () => {
    const { root, label, validationMessage, validationMessageIcon, hint } = renderField();

    expect(label).toBeNull();
    expect(validationMessage).toBeNull();
    expect(validationMessageIcon).toBeNull();
    expect(hint).toBeNull();
    expect(root.children).toHaveLength(0);
  });

  it('renders the full pipeline against a frozen headless state without throwing', () => {
    expect(() => renderField({ label: 'L' })).not.toThrow();
    expect(() => renderField({ hint: 'H', label: 'L', required: true, validationMessage: 'V' })).not.toThrow();
    expect(() => renderField({ validationMessage: 'V', validationMessageIcon: null })).not.toThrow();
    expect(() => renderField({ validationMessage: 'V', validationState: 'none' })).not.toThrow();

    orientations.forEach(orientation => {
      sizes.forEach(size => {
        expect(() => renderField({ label: 'L', orientation, size, validationMessage: 'V' })).not.toThrow();
      });
    });
  });
});
