import * as React from 'react';
import * as axeCore from 'axe-core';
import { AccessibilityError } from '../accessibility/types';

export function useAxeOnElement(uuid): [AccessibilityError[]] {
  const [axeErrors, setAxeErrors] = React.useState([]);
  const runAxeOnElement = React.useCallback(selectedElementUuid => {
    const iframe = document.getElementsByTagName('iframe')[0];
    const selectedComponentAxeErrors = [];
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
                selectedComponentAxeErrors.push(axeError);
              }
            });
          });
        }
        setAxeErrors(axeErrors => [...axeErrors, selectedComponentAxeErrors]);
      },
    );
  }, []);
  runAxeOnElement(uuid);
  console.log(axeErrors);

  return [axeErrors];
}
