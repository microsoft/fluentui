import * as React from 'react';
import * as axeCore from 'axe-core';
import { AccessibilityError } from '../accessibility/types';

export function useAxeOnElements(): AccessibilityError[] {
  const [axeErrors, setAxeErrors] = React.useState([]);
  React.useCallback(() => {
    const iframe = document.getElementsByTagName('iframe')[0];
    const componentAxeErrors = [];
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
              const matchedId = node.html.match(/data-builder-id=\"(.*?)\"/);
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
                componentAxeErrors.push(axeError);
              }
            });
          });
        }
        setAxeErrors(componentAxeErrors);
      },
    );
  }, []);
  console.log(axeErrors);
  return axeErrors;
}
export function useAxeOnAllElements(): [AccessibilityError[], (elements: Element[]) => void] {
  const [axeErrors, setAxeErrors] = React.useState<AccessibilityError[]>([]);
  const runAxeOnAllElements = React.useCallback(elements => {
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
              elements.forEach(element => {
                const elementBuilderId = element.getAttribute('data-builder-id');
                if (node.html.includes(`data-builder-id="${elementBuilderId}"`)) {
                  const axeError: AccessibilityError = {
                    elementUuid: elementBuilderId,
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
          });
        }
        setAxeErrors(selectedComponentAxeErrors);
      },
    );
  }, []);
  return [axeErrors, runAxeOnAllElements];
}

export function useAxeOnElement(): [AccessibilityError[], (selectedElementUuid: any) => void] {
  const [axeErrors, setAxeErrors] = React.useState<AccessibilityError[]>([]);
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
        setAxeErrors(selectedComponentAxeErrors);
      },
    );
  }, []);
  return [axeErrors, runAxeOnElement];
}
