import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import type { PartialTheme } from '@fluentui/react-theme';
import { FluentProvider } from './FluentProvider';
import { createCSSRuleFromTheme } from './createCSSRuleFromTheme';

const values = ['<url(a{)', '>url(a{)', '<url(/*)', ';url(a{)', '}url(a[)'];

function assertDeclarations(sheet: CSSStyleSheet): void {
  expect(sheet.cssRules.length).to.equal(1);
  const rule = sheet.cssRules[0] as CSSStyleRule;
  expect(rule.style.length).to.equal(2);
  expect(rule.style.getPropertyValue('--customToken')).not.to.equal('');
  expect(rule.style.getPropertyValue('--colorBrandBackground')).to.equal('blue');
}

describe('theme serialization in the browser', () => {
  for (const value of values) {
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
        assertDeclarations(tag.sheet!);
      });
    });

    it(`isolates ${JSON.stringify(value)} through server style-text parsing`, () => {
      cy.document().then(targetDocument => {
        const tag = targetDocument.createElement('style');
        tag.textContent = createCSSRuleFromTheme('.server-theme', theme);
        targetDocument.head.appendChild(tag);
        try {
          assertDeclarations(tag.sheet!);
        } finally {
          tag.remove();
        }
      });
    });
  }
});
