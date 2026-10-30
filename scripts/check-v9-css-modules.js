// Run against separately served Griffel and CSS Modules Storybook builds.
const assert = require('node:assert/strict');
const path = require('node:path');
const { chromium } = require('playwright');

const fixtures = [
  ['avatar-converged--basic-rtl', '.fui-Avatar__badge', ['left', 'right']],
  ['avatar-converged--size-image-badge', '.fui-Avatar__image', ['mask-image']],
  ['badge-converged--size-extra-large-rtl', '.fui-Badge__icon', ['margin-left', 'margin-right']],
  ['breadcrumb-converged--size', '.fui-BreadcrumbButton .fui-Button__icon', ['font-size', 'width', 'height']],
  ['calendar-compat--custom-icons-rtl', '.fui-CalendarPicker__itemButton', ['margin-left', 'margin-right']],
  [
    'fluentprovider-customstylehooks--split-button-custom-styles',
    '.fui-SplitButton__menuButton',
    ['border-left-width', 'border-right-width'],
  ],
  ['presencebadge-converged-oof-status--default', '.fui-PresenceBadge', ['color']],
  ['searchbox-converged--size-small', '.fui-SearchBox__dismiss > svg', ['font-size', 'width', 'height']],
  ['tablist-and-tab-converged--large-size', '.fui-Tab', ['width', 'height']],
  ['tablist-and-tab-converged--with-icon-and-vertical-rtl', '.fui-Tab', ['width', 'height']],
  ['text-converged--typography-presets', '.fui-Text', ['font-weight', 'font-size', 'line-height']],
  ['shadow-dom--default', '.fui-Avatar', ['width', 'height']],
  ['shadow-dom--portal', '.fui-Button', ['display', 'font-size', 'height']],
];

async function checkComboboxFocus(browser, urls) {
  const stories = [
    'appearance-outline-default',
    'appearance-underline',
    'appearance-filled-darker',
    'appearance-filled-lighter',
    'invalid-outline',
    'disabled',
    'size-small',
    'size-large',
  ];
  for (const reducedMotion of ['no-preference', 'reduce']) {
    for (const story of stories) {
      const samples = [];
      for (const baseUrl of urls) {
        const page = await browser.newPage({ reducedMotion });
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        try {
          await page.goto(`${baseUrl.replace(/\/$/, '')}/iframe.html?id=combobox-converged--${story}&viewMode=story`);
          const input = page.locator('.fui-Combobox input');
          await input.waitFor();
          await page.evaluate(() => document.fonts.ready);
          const states = {};
          const sample = async name => {
            states[name] = await page.locator('.fui-Combobox').evaluate(element => {
              const properties = [
                'border-top-color',
                'border-right-color',
                'border-bottom-color',
                'border-left-color',
                'border-width',
                'transform',
                'transition-property',
                'transition-duration',
                'transition-delay',
                'transition-timing-function',
              ];
              return ['', '::after'].map(pseudo => {
                const style = getComputedStyle(element, pseudo || null);
                return Object.fromEntries(properties.map(property => [property, style.getPropertyValue(property)]));
              });
            });
          };
          await sample('default');
          await input.hover();
          await sample('hover');
          if (await input.isEnabled()) {
            await input.focus();
            await page.waitForTimeout(250);
            await sample('hovered-focus-250ms');
            await page.waitForTimeout(750);
            await sample('hovered-focus-1000ms');
            await page.mouse.down();
            await sample('active-focus');
            await page.mouse.up();
            await page.mouse.move(0, 0);
            await sample('focus-without-hover');
          }
          samples.push(states);
          assert.deepEqual(errors, [], `Combobox ${story}: browser errors`);
        } finally {
          await page.close();
        }
      }
      assert.deepEqual(samples[1], samples[0], `Combobox ${story}, reduced motion: ${reducedMotion}`);
      process.stdout.write(`PASS Combobox ${story}: focus states, reduced motion: ${reducedMotion}\n`);
    }
  }
}

async function main() {
  const [baselineUrl, cssModulesUrl] = process.argv.slice(2);
  assert(
    baselineUrl && cssModulesUrl,
    'Usage: check-v9-css-modules.js <griffel-storybook-url> <css-modules-storybook-url>',
  );
  const browser = await chromium.launch();
  try {
    await checkComboboxFocus(browser, [baselineUrl, cssModulesUrl]);
    for (const [story, selector, properties] of fixtures) {
      const samples = [];
      for (const baseUrl of [baselineUrl, cssModulesUrl]) {
        const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.route('https://fabricweb.azureedge.net/**', route =>
          route.fulfill({
            path: path.resolve(__dirname, '../packages/react-components/react-persona/library/etc/images/avatar.png'),
            headers: { 'Access-Control-Allow-Origin': '*' },
          }),
        );
        await page.goto(`${baseUrl.replace(/\/$/, '')}/iframe.html?id=${story}&viewMode=story`);
        await page.locator(selector).first().waitFor({ state: 'attached' });
        await page.evaluate(() => document.fonts.ready);
        samples.push(
          await page.locator(selector).evaluateAll(
            (elements, props) =>
              elements.map(element => {
                const style = getComputedStyle(element);
                return Object.fromEntries(props.map(property => [property, style.getPropertyValue(property)]));
              }),
            properties,
          ),
        );
        assert.deepEqual(errors, [], `${story}: browser errors`);
        await page.close();
      }
      assert.deepEqual(samples[1], samples[0], `${story}: ${selector}`);
      process.stdout.write(`PASS ${story}: ${selector}\n`);
    }
  } finally {
    await browser.close();
  }
}

main().catch(error => {
  process.stderr.write(`${error.stack ?? error}\n`);
  process.exitCode = 1;
});
