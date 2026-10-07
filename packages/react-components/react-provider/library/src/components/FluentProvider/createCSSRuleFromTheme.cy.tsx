import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import type { PartialTheme } from '@fluentui/react-theme';
import { FluentProvider } from './FluentProvider';
import { createCSSRuleFromTheme } from './createCSSRuleFromTheme';

const cases = [
  { value: '<url(a{)', accepted: false },
  { value: '>url(a{)', accepted: false },
  { value: '<url(/*)', accepted: false },
  { value: ';url(a{)', accepted: false },
  { value: '}url(a[)', accepted: false },
  { value: 'calc(1px', accepted: false },
  { value: '"font', accepted: false },
  { value: 'red /* comment', accepted: false },
  { value: 'url(image.png fallback)', accepted: false },
  { value: 'url(a{)', accepted: true },
  { value: 'url(/*)', accepted: true },
  { value: 'url( image.png )', accepted: true },
  { value: '"<font>"', accepted: true },
  { value: 'custom({ value; [other] })', accepted: true },
];

function assertDeclarations(sheet: CSSStyleSheet, accepted: boolean): void {
  expect(sheet.cssRules.length).to.equal(1);
  const rule = sheet.cssRules[0] as CSSStyleRule;
  expect(rule.style.length).to.equal(accepted ? 2 : 1);
  expect(rule.style.getPropertyValue('--customToken') !== '').to.equal(accepted);
  expect(rule.style.getPropertyValue('--colorBrandBackground')).to.equal('blue');
}

describe('theme serialization in the browser', () => {
  for (const { value, accepted } of cases) {
    const theme: PartialTheme & { customToken: string } = {
      customToken: value,
      colorBrandBackground: 'blue',
    };

    it(`isolates ${JSON.stringify(value)} through client insertion`, () => {
      mount(<FluentProvider theme={theme} data-testid="theme-provider" />);
      cy.get('[data-testid="theme-provider"]').should($provider => {
        const element = $provider[0];
        const themeClass = Array.from(element.classList).find(
          name => name.startsWith('fui-FluentProvider') && name !== 'fui-FluentProvider',
        );
        const tag = element.ownerDocument.getElementById(themeClass!) as HTMLStyleElement;
        assertDeclarations(tag.sheet!, accepted);
      });
    });

    it(`isolates ${JSON.stringify(value)} through server style-text parsing`, () => {
      cy.document().then(targetDocument => {
        const tag = targetDocument.createElement('style');
        tag.textContent = createCSSRuleFromTheme('.server-theme', theme);
        targetDocument.head.appendChild(tag);
        try {
          assertDeclarations(tag.sheet!, accepted);
        } finally {
          tag.remove();
        }
      });
    });
  }
});
