import * as React from 'react';
import * as axeCore from 'axe-core';

export function useAxeOnElement(): [any[], (selectedElementUuid: any) => void] {
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
          console.error('Axe failed', err);
        } else {
          result.violations.forEach(violation => {
            violation.nodes.forEach(node => {
              if (node.html.includes(`data-builder-id="${selectedElementUuid}"`)) {
                selectedComponentAxeErrors.push(
                  node.failureSummary
                    .replace('Fix all of the following:', '-')
                    .replace('Fix any of the following:', '-'),
                );
              }
            });
          });
        }
        setAxeErrors(selectedComponentAxeErrors);
      },
    );
  }, []);

  return [axeErrors, runAxeOnElement];
}
