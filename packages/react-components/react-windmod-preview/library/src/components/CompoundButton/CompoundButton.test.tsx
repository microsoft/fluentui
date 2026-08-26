import * as React from 'react';
import { render } from '@testing-library/react';

import { classOccurrences } from '../../testing/classOccurrences';
import { isConformant } from '../../testing/isConformant';
import { CompoundButton } from './CompoundButton';
import type { CompoundButtonState } from './CompoundButton.types';
import { compoundButtonClassNames, useCompoundButtonStyles } from './useCompoundButtonStyles';

import styles from './CompoundButton.module.css';

const iconOf = (root: HTMLElement): HTMLElement => {
  const icon = root.querySelector<HTMLElement>(`span.${styles.icon}`);

  if (!icon) {
    throw new Error('CompoundButton rendered no icon slot');
  }

  return icon;
};

const containerOf = (root: HTMLElement): HTMLElement | null =>
  root.querySelector<HTMLElement>(`span.${styles.contentContainer}`);

const Glyph = (): React.ReactElement => <i data-testid="glyph" />;

describe('CompoundButton', () => {
  isConformant({
    Component: CompoundButton,
    displayName: 'CompoundButton',
  });

  it('stamps both marker pairs, its own first', () => {
    const { getByTestId } = render(<CompoundButton data-testid="root">Compound</CompoundButton>);

    const root = getByTestId('root');

    expect(root.className).toContain(compoundButtonClassNames.root);
    expect(root).toHaveClass('fui-compound-button');
    expect(root).toHaveClass('group/fui-compound-button');
    expect(root).toHaveClass('fui-button');
    expect(root).toHaveClass('group/fui-button');
    expect(root.classList[0]).toBe('fui-compound-button');
  });

  it('carries the root class of both stylesheets', () => {
    const { getByTestId } = render(<CompoundButton data-testid="root">Compound</CompoundButton>);

    expect(classOccurrences(getByTestId('root'), styles.root)).toBe(2);
  });

  it('carries the icon class of both stylesheets', () => {
    const { getByTestId } = render(
      <CompoundButton data-testid="root" icon={<Glyph />}>
        Compound
      </CompoundButton>,
    );

    expect(classOccurrences(iconOf(getByTestId('root')), styles.icon)).toBe(2);
  });

  it('styles the content container and the secondary content', () => {
    const { getByTestId } = render(
      <CompoundButton data-testid="root" secondaryContent="Second line">
        Compound
      </CompoundButton>,
    );

    const container = containerOf(getByTestId('root'));

    expect(container).not.toBeNull();
    expect(container).toHaveClass(styles.contentContainer);
    expect(container!.querySelector(`span.${styles.secondaryContent}`)).not.toBeNull();
  });

  it('renders children then secondaryContent inside the container, and no container when icon only', () => {
    const { getByTestId } = render(
      <>
        <CompoundButton data-testid="labelled" secondaryContent="Second line">
          Compound
        </CompoundButton>
        <CompoundButton data-testid="icon-only" icon={<Glyph />} aria-label="Compound" />
      </>,
    );

    const container = containerOf(getByTestId('labelled'));

    expect(container).not.toBeNull();
    expect(container!.textContent).toBe('CompoundSecond line');
    expect(container!.lastElementChild).toHaveClass(styles.secondaryContent);
    expect(container!.lastElementChild!.textContent).toBe('Second line');

    expect(containerOf(getByTestId('icon-only'))).toBeNull();
  });

  it('keeps the content container when an icon and secondaryContent arrive without children', () => {
    const { getByTestId } = render(
      <CompoundButton data-testid="root" icon={<Glyph />} secondaryContent="Second line" />,
    );

    const root = getByTestId('root');

    expect(root.hasAttribute('data-icon-only')).toBe(false);
    expect(root.getAttribute('data-has-secondary-content')).toBe('');
    expect(root.hasAttribute('data-empty')).toBe(true);
    expect(root.getAttribute('data-icon-position')).toBe('before');

    const container = containerOf(root);

    expect(container).not.toBeNull();
    expect(container!.textContent).toBe('Second line');
    expect(container!.firstElementChild).toHaveClass(styles.secondaryContent);
  });

  it('renders no secondaryContent span when the consumer supplies none', () => {
    const { getByTestId } = render(<CompoundButton data-testid="root">Compound</CompoundButton>);

    expect(getByTestId('root').querySelector(`span.${styles.secondaryContent}`)).toBeNull();
  });

  it('stamps data-icon-position only when an icon is rendered', () => {
    const { getByTestId } = render(
      <>
        <CompoundButton data-testid="plain">Compound</CompoundButton>
        <CompoundButton data-testid="before" icon={<Glyph />}>
          Compound
        </CompoundButton>
        <CompoundButton data-testid="after" icon={<Glyph />} iconPosition="after">
          Compound
        </CompoundButton>
      </>,
    );

    expect(getByTestId('plain').hasAttribute('data-icon-position')).toBe(false);
    expect(getByTestId('before').getAttribute('data-icon-position')).toBe('before');
    expect(getByTestId('after').getAttribute('data-icon-position')).toBe('after');
  });

  it('keeps the data attributes useButtonStyles resolves', () => {
    const { getByTestId } = render(
      <>
        <CompoundButton data-testid="labelled" appearance="primary" size="large" secondaryContent="Second line">
          Compound
        </CompoundButton>
        <CompoundButton data-testid="icon-only" icon={<Glyph />} aria-label="Compound" />
      </>,
    );

    const labelled = getByTestId('labelled');

    expect(labelled.getAttribute('data-appearance')).toBe('primary');
    expect(labelled.getAttribute('data-size')).toBe('large');
    expect(labelled.hasAttribute('data-empty')).toBe(false);

    expect(getByTestId('icon-only').hasAttribute('data-empty')).toBe(true);
  });

  it('resolves the look-prop defaults and passes an explicit shape through', () => {
    const { getByTestId } = render(
      <>
        <CompoundButton data-testid="default">Compound</CompoundButton>
        <CompoundButton data-testid="circular" shape="circular">
          Compound
        </CompoundButton>
      </>,
    );

    const byDefault = getByTestId('default');

    expect(byDefault.getAttribute('data-appearance')).toBe('secondary');
    expect(byDefault.getAttribute('data-size')).toBe('medium');
    expect(byDefault).not.toHaveClass(styles.circular);

    expect(getByTestId('circular')).toHaveClass(styles.circular);
  });

  it('leaves data-icon-only and data-has-secondary-content to the headless hook', () => {
    const { getByTestId } = render(
      <>
        <CompoundButton data-testid="plain">Compound</CompoundButton>
        <CompoundButton data-testid="secondary" secondaryContent="Second line">
          Compound
        </CompoundButton>
        <CompoundButton data-testid="icon-only" icon={<Glyph />} aria-label="Compound" />
      </>,
    );

    const plain = getByTestId('plain');

    expect(plain.hasAttribute('data-icon-only')).toBe(false);
    expect(plain.hasAttribute('data-has-secondary-content')).toBe(false);

    expect(getByTestId('secondary').getAttribute('data-has-secondary-content')).toBe('');

    const iconOnly = getByTestId('icon-only');

    expect(iconOnly.getAttribute('data-icon-only')).toBe('');
    expect(iconOnly.hasAttribute('data-has-secondary-content')).toBe(false);
  });

  it('keeps consumer props on every slot it restyles', () => {
    const { getByTestId } = render(
      <CompoundButton
        data-testid="root"
        className="consumer"
        icon={{ children: <Glyph />, id: 'consumer-icon' }}
        contentContainer={{ id: 'consumer-container', className: 'consumer-container' }}
        secondaryContent={{ children: 'Second line', id: 'consumer-secondary', className: 'consumer-secondary' }}
      >
        Compound
      </CompoundButton>,
    );

    const root = getByTestId('root');

    expect(root).toHaveClass('consumer');
    expect(classOccurrences(root, 'consumer')).toBe(1);

    expect(iconOf(root).id).toBe('consumer-icon');

    const container = containerOf(root);

    expect(container!.id).toBe('consumer-container');
    expect(container).toHaveClass('consumer-container');
    expect(classOccurrences(container!, 'consumer-container')).toBe(1);

    const secondary = root.querySelector<HTMLElement>(`span.${styles.secondaryContent}`);

    expect(secondary!.id).toBe('consumer-secondary');
    expect(secondary).toHaveClass('consumer-secondary');
    expect(classOccurrences(secondary!, 'consumer-secondary')).toBe(1);
  });

  it('passes disabled and disabledFocusable through to the root', () => {
    const { getByTestId } = render(
      <>
        <CompoundButton data-testid="disabled" disabled>
          Compound
        </CompoundButton>
        <CompoundButton data-testid="disabled-focusable" disabledFocusable>
          Compound
        </CompoundButton>
      </>,
    );

    const disabled = getByTestId('disabled');

    expect(disabled.getAttribute('data-disabled')).toBe('');
    expect(disabled).toBeDisabled();

    const disabledFocusable = getByTestId('disabled-focusable');

    expect(disabledFocusable.getAttribute('data-disabled-focusable')).toBe('');
    expect(disabledFocusable.getAttribute('aria-disabled')).toBe('true');
  });

  it('does not mutate the state it is given', () => {
    const state = {
      appearance: 'primary',
      components: { root: 'button', icon: 'span', contentContainer: 'span', secondaryContent: 'span' },
      contentContainer: { as: 'span', className: 'consumer-container' },
      icon: { className: 'consumer-icon' },
      iconPosition: 'after',
      root: { as: 'button', className: 'consumer', 'data-icon-only': '' },
      secondaryContent: { as: 'span', className: 'consumer-secondary' },
      shape: 'circular',
      size: 'large',
    } as unknown as CompoundButtonState;

    const styled = useCompoundButtonStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.contentContainer).not.toBe(state.contentContainer);
    expect(styled.secondaryContent).not.toBe(state.secondaryContent);

    expect(state.root.className).toBe('consumer');
    expect(state.root).not.toHaveProperty('data-icon-position');
    expect(state.root).not.toHaveProperty('data-appearance');
    expect(state.icon!.className).toBe('consumer-icon');
    expect(state.contentContainer.className).toBe('consumer-container');
    expect(state.secondaryContent!.className).toBe('consumer-secondary');

    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(compoundButtonClassNames.root);
    expect(styled.root['data-icon-only']).toBe('');
    expect((styled.root as { 'data-icon-position'?: string })['data-icon-position']).toBe('after');
    expect(classOccurrences(styled.icon!.className!, styles.icon)).toBe(2);
    expect(styled.contentContainer.className).toContain(styles.contentContainer);
    expect(styled.contentContainer.className).toContain('consumer-container');
    expect(styled.secondaryContent!.className).toContain(styles.secondaryContent);
    expect(styled.secondaryContent!.className).toContain('consumer-secondary');
  });

  it('adds no icon or secondaryContent slot when the consumer supplies neither', () => {
    const state = {
      appearance: 'secondary',
      components: { root: 'button', icon: 'span', contentContainer: 'span', secondaryContent: 'span' },
      contentContainer: { as: 'span' },
      root: { as: 'button' },
      shape: 'rounded',
      size: 'medium',
    } as unknown as CompoundButtonState;

    const styled = useCompoundButtonStyles(state);

    expect(styled.icon).toBeUndefined();
    expect(styled.secondaryContent).toBeUndefined();
    expect((styled.root as { 'data-icon-position'?: string })['data-icon-position']).toBeUndefined();
  });
});
