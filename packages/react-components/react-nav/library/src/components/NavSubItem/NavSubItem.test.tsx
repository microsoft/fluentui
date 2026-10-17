import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { NavSubItem } from './NavSubItem';
import { navSubItemClassNames } from './useNavSubItemStyles.styles';
import type { NavSubItemProps } from './NavSubItem.types';
import { NavProvider } from '../NavContext';
import { NavCategoryProvider } from '../NavCategoryContext';
import { navItemTokens } from '../sharedNavStyles.styles';
import { webLightTheme } from '@fluentui/react-theme';

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

// jsdom cannot resolve CSS variables or compute layout, so we evaluate the Griffel-generated calc() against theme tokens.
function evaluateCalc(expr: string, theme: Record<string, string | number>): number {
  let s = expr.replace(/var\(--([a-zA-Z0-9]+)\)/g, (_, name) => {
    const val = theme[name];
    if (val === undefined) {
      throw new Error(`Token --${name} not found in theme`);
    }
    return String(val);
  });

  s = s.replace(/calc/g, '').replace(/px/g, '').replace(/\s+/g, '');

  const evalSimple = (sub: string): string => {
    let cur = sub;
    const mulDivRegex = /(-?\d+(?:\.\d+)?)([*/])(-?\d+(?:\.\d+)?)/;
    while (mulDivRegex.test(cur)) {
      cur = cur.replace(mulDivRegex, (_, a, op, b) =>
        String(op === '*' ? Number(a) * Number(b) : Number(a) / Number(b)),
      );
    }
    const addSubRegex = /(-?\d+(?:\.\d+)?)([+-])(\d+(?:\.\d+)?)/;
    while (addSubRegex.test(cur)) {
      cur = cur.replace(addSubRegex, (_, a, op, b) =>
        String(op === '+' ? Number(a) + Number(b) : Number(a) - Number(b)),
      );
    }
    return cur;
  };

  while (/\([^()]+\)/.test(s)) {
    s = s.replace(/\(([^()]+)\)/g, (_, inner) => evalSimple(inner));
  }

  const result = Number(evalSimple(s));
  if (!Number.isFinite(result)) {
    throw new Error(`Failed to evaluate CSS calc expression: "${expr}" (resolved to: "${s}")`);
  }
  return result;
}

function extractMarginInlineStart(ruleText: string): string {
  const match = ruleText.match(/margin-inline-start:\s*([^;}]+)/);
  return match ? match[1].trim() : ruleText.trim();
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

    const expectedMediumCalc = `calc(-1 * (calc(var(--spacingHorizontalXXXL) + var(--spacingHorizontalXS)) + ${navItemTokens.indicatorOffset}px))`;
    const expectedSmallCalc = `calc(-1 * (calc(var(--spacingHorizontalXXL) + var(--spacingHorizontalSNudge)) + ${navItemTokens.indicatorOffset}px))`;

    expect(mediumIndicatorRule).toBeDefined();
    expect(mediumIndicatorRule).toContain(expectedMediumCalc);

    expect(smallIndicatorRule).toBeDefined();
    expect(smallIndicatorRule).toContain(expectedSmallCalc);

    expect(smallIndicatorRule).not.toEqual(mediumIndicatorRule);
  });

  describe.each(['medium', 'small'] as const)('density: %s', density => {
    it.each(['6px', '8px'] as const)(
      'resolves net indicator position to -6px matching top-level NavItem when spacingHorizontalSNudge is %s',
      sNudgeValue => {
        // Top-level NavItem indicator sits at paddingInlineStart (10px, spacingHorizontalMNudge)
        // plus marginInlineStart (-16px, -navItemTokens.indicatorOffset) = -6px.
        // NavSubItem must match this exact -6px position relative to the root element's outer edge,
        // ensuring the selection rail remains visually aligned across both medium and small densities
        // even when spacingHorizontalSNudge is customized.
        const { container } = renderNavSubItem({ density, selected: true });
        const root = container.querySelector<HTMLElement>(`.${navSubItemClassNames.root}`)!;
        const view = root.ownerDocument.defaultView!;

        const paddingInlineStartRaw = view.getComputedStyle(root).getPropertyValue('padding-inline-start');
        const indicatorRule = getIndicatorMarginRule(root)!;
        const marginInlineStartRaw = extractMarginInlineStart(indicatorRule);

        const theme = {
          ...webLightTheme,
          spacingHorizontalSNudge: sNudgeValue,
        };

        const paddingInlineStart = evaluateCalc(paddingInlineStartRaw, theme);
        const marginInlineStart = evaluateCalc(marginInlineStartRaw, theme);
        const netPosition = paddingInlineStart + marginInlineStart;

        const expectedPosition = parseFloat(webLightTheme.spacingHorizontalMNudge) - navItemTokens.indicatorOffset; // 10 - 16 = -6px
        expect(netPosition).toBe(expectedPosition);
      },
    );
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
