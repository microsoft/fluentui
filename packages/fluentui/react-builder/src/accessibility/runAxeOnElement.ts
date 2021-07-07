import * as axeCore from 'axe-core';
import { AccessibilityError } from './types';

export function runAxeOnElement(selectedElementUuid): AccessibilityError[] {
  const iframe = document.getElementsByTagName('iframe')[0];
  const axeErrors = [];
  axeCore.run(
    iframe,
    {
      rules: {
        // excluding rules which are related to the whole page not to components
        'page-has-heading-one': { enabled: false },
        region: { enabled: false },
        'landmark-one-main': { enabled: false },
      },
    },

    (err, result) => {
      if (err) {
        console.error('AXE check failed', err);
      } else {
        result.violations.forEach(violation => {
          violation.nodes.forEach(node => {
            if (node.html.includes(`data-builder-id="${selectedElementUuid}"`)) {
              const axeError: AccessibilityError = {
                elementUuid: selectedElementUuid,
                source: 'AXE-Core',
                error: node.failureSummary
                  .replace('Fix all of the following:', '')
                  .replace('Fix any of the following:', ''),
                severity: node.impact,
              };
              axeErrors.push(axeError);
            }
          });
        });
      }
    },
  );
  console.log(selectedElementUuid, axeErrors);

  return axeErrors;
}

export function runAxeOnElements(): Array<AccessibilityError> {
  const iframe = document.getElementsByTagName('iframe')[0];
  const axeErrors = [];
  axeCore.run(
    iframe,
    {
      rules: {
        // excluding rules which are related to the whole page not to components
        'page-has-heading-one': { enabled: false },
        region: { enabled: false },
        'landmark-one-main': { enabled: false },
      },
    },

    (err, result) => {
      if (err) {
        console.error('AXE check failed', err);
      } else {
        result.violations.forEach(violation => {
          violation.nodes.forEach(node => {
            // get the element uuid from the data-builder-id attribute with regex matching
            const matchedId = node.html.match(/data-builder-id=\"(.+?)\"/);
            if (matchedId) {
              const violationUuid = matchedId[1];
              const axeError: AccessibilityError = {
                elementUuid: violationUuid,
                source: 'AXE-Core',
                error: node.failureSummary
                  .replace('Fix all of the following:', '')
                  .replace('Fix any of the following:', ''),
                severity: node.impact,
              };
              axeErrors.push(axeError);
            }
          });
        });
      }
    },
  );
  console.log(axeErrors);

  return axeErrors;
}
