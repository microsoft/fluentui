import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { NavSubItem } from './NavSubItem';
import { navSubItemClassNames } from './useNavSubItemStyles.styles';
import type { NavSubItemProps } from './NavSubItem.types';
import { NavProvider } from '../NavContext';
import { NavCategoryProvider } from '../NavCategoryContext';

import type { NavContextValue } from '../NavContext.types';
import type { NavCategoryContextValue } from '../NavCategoryContext';

const renderNavSubItem = (options: { density?: 'medium' | 'small'; selected?: boolean }) => {
  const { density = 'medium', selected = true } = options;
  const navContextValue: NavContextValue = {
    selectedValue: selected ? 'sub-item-1' : undefined,
    density,
    onRegister: () => undefined,
    onUnregister: () => undefined,
    onSelect: () => undefined,
    getRegisteredNavItems: () => ({ registeredNavItems: {} }),
    onRequestNavCategoryItemToggle: () => undefined,
    openCategories: [],
    multiple: true,
    tabbable: false,
  };
  const categoryContextValue: NavCategoryContextValue = { open: true, value: 'category-1' };

  return render(
    <NavProvider value={navContextValue}>
      <NavCategoryProvider value={categoryContextValue}>
        <NavSubItem value="sub-item-1">Sub item</NavSubItem>
      </NavCategoryProvider>
    </NavProvider>,
  );
};

function getIndicatorMarginRule(element: HTMLElement): string | undefined {
  const classList = Array.from(element.classList);
  for (const sheet of Array.from(element.ownerDocument.styleSheets)) {
    try {
      for (const rule of Array.from(sheet.cssRules)) {
        if (rule instanceof CSSStyleRule) {
          for (const cls of classList) {
            if (
              (rule.selectorText === `.${cls}::after` || rule.selectorText === `.${cls}:after`) &&
              (rule.style.marginInlineStart || rule.cssText.includes('margin-inline-start'))
            ) {
              return rule.style.marginInlineStart || rule.cssText;
            }
          }
        }
      }
    } catch {
      // ignore
    }
  }
  return undefined;
}

describe('NavSubItem', () => {
  isConformant({
    Component: NavSubItem as React.FunctionComponent<NavSubItemProps>,
    displayName: 'NavSubItem',
    testOptions: {
      'has-static-classnames': [
        {
          props: { value: 'test-value' },
          expectedClassNames: {
            root: navSubItemClassNames.root,
          },
        },
      ],
    },
  });

  it('applies density-specific ::after margin-inline-start matching the expected token calc expressions when selected', () => {
    const { container: mediumContainer } = renderNavSubItem({ density: 'medium', selected: true });
    const mediumRoot = mediumContainer.querySelector<HTMLElement>(`.${navSubItemClassNames.root}`)!;
    const mediumIndicatorRule = getIndicatorMarginRule(mediumRoot);

    const { container: smallContainer } = renderNavSubItem({ density: 'small', selected: true });
    const smallRoot = smallContainer.querySelector<HTMLElement>(`.${navSubItemClassNames.root}`)!;
    const smallIndicatorRule = getIndicatorMarginRule(smallRoot);

    const expectedMediumCalc =
      'calc(-1 * (var(--spacingHorizontalMNudge) + calc(var(--spacingHorizontalXXXL) + var(--spacingHorizontalXS)) + var(--spacingHorizontalSNudge)))';
    const expectedSmallCalc =
      'calc(-1 * (var(--spacingHorizontalMNudge) + calc(var(--spacingHorizontalXXL) + var(--spacingHorizontalSNudge)) + var(--spacingHorizontalSNudge)))';

    expect(mediumIndicatorRule).toBeDefined();
    expect(mediumIndicatorRule).toContain(expectedMediumCalc);

    expect(smallIndicatorRule).toBeDefined();
    expect(smallIndicatorRule).toContain(expectedSmallCalc);

    expect(smallIndicatorRule).not.toEqual(mediumIndicatorRule);
  });

  it('resolves padding-inline-start to small density without medium density overriding it', () => {
    const { container: mediumContainer } = renderNavSubItem({ density: 'medium', selected: true });
    const mediumRoot = mediumContainer.querySelector<HTMLElement>(`.${navSubItemClassNames.root}`)!;
    const mediumView = mediumRoot.ownerDocument.defaultView!;
    const mediumPadding = mediumView.getComputedStyle(mediumRoot).getPropertyValue('padding-inline-start');

    const { container: smallContainer } = renderNavSubItem({ density: 'small', selected: true });
    const smallRoot = smallContainer.querySelector<HTMLElement>(`.${navSubItemClassNames.root}`)!;
    const smallView = smallRoot.ownerDocument.defaultView!;
    const smallPadding = smallView.getComputedStyle(smallRoot).getPropertyValue('padding-inline-start');

    const expectedMediumPaddingCalc =
      'calc(var(--spacingHorizontalMNudge) + calc(var(--spacingHorizontalXXXL) + var(--spacingHorizontalXS)))';
    const expectedSmallPaddingCalc =
      'calc(var(--spacingHorizontalMNudge) + calc(var(--spacingHorizontalXXL) + var(--spacingHorizontalSNudge)))';

    expect(mediumPadding).toBe(expectedMediumPaddingCalc);
    expect(smallPadding).toBe(expectedSmallPaddingCalc);
    expect(smallPadding).not.toEqual(mediumPadding);
  });

  it('does not apply ::after margin-inline-start rule when unselected', () => {
    const { container } = renderNavSubItem({ density: 'medium', selected: false });
    const root = container.querySelector<HTMLElement>(`.${navSubItemClassNames.root}`)!;
    const indicatorRule = getIndicatorMarginRule(root);

    expect(indicatorRule).toBeUndefined();
  });
});
