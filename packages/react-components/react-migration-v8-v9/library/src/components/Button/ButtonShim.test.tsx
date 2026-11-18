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

const getVariantClassNames = (element: HTMLElement) =>
  Array.from(element.classList).filter(className => className.startsWith('ms-Button--'));

describe('Button shims', () => {
  describe('v8 variant class names', () => {
    it.each([
      ['DefaultButtonShim', () => <DefaultButtonShim text="Button" />, ['ms-Button--default']],
      ['DefaultButtonShim with primary', () => <DefaultButtonShim primary text="Button" />, ['ms-Button--primary']],
      ['DefaultButtonShim with toggle', () => <DefaultButtonShim toggle text="Button" />, ['ms-Button--default']],
      ['PrimaryButtonShim', () => <PrimaryButtonShim text="Button" />, ['ms-Button--primary']],
      ['PrimaryButtonShim with toggle', () => <PrimaryButtonShim toggle text="Button" />, ['ms-Button--primary']],
      [
        'ButtonShim with variantClassName',
        () => <ButtonShim variantClassName="ms-Button--icon" />,
        ['ms-Button--icon'],
      ],
      ['ActionButtonShim', () => <ActionButtonShim text="Button" />, ['ms-Button--action', 'ms-Button--command']],
      ['CommandButtonShim', () => <CommandButtonShim text="Button" />, ['ms-Button--action', 'ms-Button--command']],
      ['CompoundButtonShim', () => <CompoundButtonShim text="Button" />, ['ms-Button--compound']],
      [
        'CompoundButtonShim with primary',
        () => <CompoundButtonShim primary text="Button" />,
        ['ms-Button--compoundPrimary'],
      ],
      ['MenuButtonShim', () => <MenuButtonShim text="Button" />, ['ms-Button--default']],
      ['MenuButtonShim with primary', () => <MenuButtonShim primary text="Button" />, ['ms-Button--primary']],
      ['ToggleButtonShim', () => <ToggleButtonShim text="Button" />, ['ms-Button--default']],
      ['ToggleButtonShim with primary', () => <ToggleButtonShim primary text="Button" />, ['ms-Button--primary']],
    ] as const)('%s renders the matching v8 variant class', (_, renderShim, expected) => {
      const { getByRole } = render(renderShim());

      expect(getVariantClassNames(getByRole('button'))).toEqual(expected);
    });
  });
});
