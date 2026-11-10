import * as React from 'react';
import { render } from '@testing-library/react';
import { ActionButtonShim } from './ActionButtonShim';
import { ButtonShim } from './ButtonShim';
import { CommandButtonShim } from './CommandButtonShim';
import { CompoundButtonShim } from './CompoundButtonShim';
import { DefaultButtonShim } from './DefaultButtonShim';
import { MenuButtonShim } from './MenuButtonShim';
import { PrimaryButtonShim } from './PrimaryButtonShim';
import { ToggleButtonShim } from './ToggleButtonShim';

describe('Button shim variant classes', () => {
  it.each<[string, () => React.ReactElement, string[]]>([
    ['ButtonShim', () => <ButtonShim />, ['ms-Button--default']],
    ['ButtonShim primary', () => <ButtonShim primary />, ['ms-Button--primary']],
    ['DefaultButtonShim', () => <DefaultButtonShim />, ['ms-Button--default']],
    ['DefaultButtonShim primary', () => <DefaultButtonShim primary />, ['ms-Button--primary']],
    ['PrimaryButtonShim', () => <PrimaryButtonShim />, ['ms-Button--primary']],
    ['ActionButtonShim', () => <ActionButtonShim />, ['ms-Button--action', 'ms-Button--command']],
    ['ActionButtonShim primary', () => <ActionButtonShim primary />, ['ms-Button--action', 'ms-Button--command']],
    ['CommandButtonShim', () => <CommandButtonShim />, ['ms-Button--action', 'ms-Button--command']],
    ['CommandButtonShim primary', () => <CommandButtonShim primary />, ['ms-Button--action', 'ms-Button--command']],
    ['CompoundButtonShim', () => <CompoundButtonShim />, ['ms-Button--compound']],
    ['CompoundButtonShim primary', () => <CompoundButtonShim primary />, ['ms-Button--compoundPrimary']],
    ['MenuButtonShim', () => <MenuButtonShim />, ['ms-Button--default']],
    ['MenuButtonShim primary', () => <MenuButtonShim primary />, ['ms-Button--primary']],
    ['ToggleButtonShim', () => <ToggleButtonShim />, ['ms-Button--default']],
    ['ToggleButtonShim primary', () => <ToggleButtonShim primary />, ['ms-Button--primary']],
    ['ButtonShim toggle', () => <ButtonShim toggle />, ['ms-Button--default']],
    ['ButtonShim primary toggle', () => <ButtonShim primary toggle />, ['ms-Button--primary']],
    [
      'ButtonShim toggle custom variant',
      () => <ButtonShim toggle variantClassName="ms-Button--custom" />,
      ['ms-Button--custom'],
    ],
    [
      'ButtonShim primary toggle custom variant',
      () => <ButtonShim primary toggle variantClassName="ms-Button--custom" />,
      ['ms-Button--custom'],
    ],
    ['ButtonShim toggle empty variant', () => <ButtonShim toggle variantClassName="" />, []],
    ['DefaultButtonShim toggle', () => <DefaultButtonShim toggle />, ['ms-Button--default']],
    ['DefaultButtonShim primary toggle', () => <DefaultButtonShim primary toggle />, ['ms-Button--primary']],
    ['PrimaryButtonShim toggle', () => <PrimaryButtonShim toggle />, ['ms-Button--primary']],
    ['ButtonShim secondary text', () => <ButtonShim secondaryText="Description" />, ['ms-Button--compound']],
    [
      'ButtonShim primary secondary text',
      () => <ButtonShim primary secondaryText="Description" />,
      ['ms-Button--compoundPrimary'],
    ],
  ])('%s renders only the expected v8 variant classes', (_name, renderShim, expected) => {
    const { getByRole } = render(renderShim());
    const button = getByRole('button');
    const variants = Array.from(button.classList).filter(className => className.startsWith('ms-Button--'));

    expect(variants).toEqual(expected);
  });

  it('preserves custom base and user class names on a delegated toggle', () => {
    const { getByRole } = render(<ButtonShim toggle baseClassName="custom-base" className="custom-user" />);
    const button = getByRole('button');

    expect(button.classList.contains('custom-base')).toBe(true);
    expect(button.classList.contains('custom-user')).toBe(true);
  });

  it.each([{ checked: true }, { checked: false }, { defaultChecked: true }, { defaultChecked: false }])(
    'preserves toggle state for %o',
    props => {
      const { getByRole } = render(<DefaultButtonShim toggle {...props} />);

      expect(getByRole('button').getAttribute('aria-pressed')).toBe(String(props.checked ?? props.defaultChecked));
    },
  );
});
