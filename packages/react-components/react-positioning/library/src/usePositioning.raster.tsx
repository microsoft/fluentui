import { webLightTheme as theme } from '@fluentui/react-theme';
import './usePositioning.geometry.cy';

// Paint the otherwise transparent geometry fixtures without changing their layout.
beforeEach(() => {
  cy.document().then(doc => {
    const sheet = doc.createElement('style');
    sheet.dataset.positioningRaster = '';
    sheet.textContent = `
      [data-enabled] { background: ${theme.colorNeutralBackground1}; }
      [data-target] {
        background: ${theme.colorBrandBackground2};
        outline: ${theme.strokeWidthThin} solid ${theme.colorBrandStroke1};
      }
      [data-floating] {
        background: ${theme.colorNeutralBackground2};
        outline: ${theme.strokeWidthThin} solid ${theme.colorNeutralStroke1};
        border-radius: ${theme.borderRadiusMedium};
        box-shadow: ${theme.shadow8};
      }
      [data-arrow] { background: ${theme.colorBrandBackground}; }
      [data-target]::after, [data-floating]::after {
        position: absolute;
        inset: 0;
        overflow: hidden;
        color: ${theme.colorNeutralForeground1};
        font: ${theme.fontSizeBase300} ${theme.fontFamilyBase};
      }
      [data-target]::after { content: 'Target'; }
      [data-floating]::after { content: 'Positioned surface'; }
      [data-boundary] { outline: ${theme.strokeWidthThin} solid ${theme.colorNeutralStroke2}; }
    `;
    doc.head.appendChild(sheet);
  });
});

afterEach(() => {
  cy.document().then(doc => {
    if (doc.querySelector('[data-enabled]')) {
      cy.get('[data-enabled]').first().screenshot(Cypress.currentTest.title, { overwrite: true, scale: false });
    }
  });
  cy.get('style[data-positioning-raster]').invoke('remove');
});
