import * as React from 'react';
import { hydrateRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { RendererProvider, createDOMRenderer } from '@griffel/react';
import { readStyles } from './harness';
import { createSSRWorker } from './ssr/createSSRWorker';
import { SSRParityApp, ssrComponents, ssrContainerId, ssrScenarios } from './ssr/SSRParityApp';
import type { SSRScenario } from './ssr/SSRParityApp';
import type { SSRResult } from './ssr/ssr.worker';

type Samples = Record<string, Record<string, string>>;

/** Server rendering only collects Fluent CSS Modules rules through the runtime Griffel integration. */
const griffelBuckets = Cypress.env('griffelBuckets') === true && Cypress.env('extraction') !== true;

function serverRender(scenario: SSRScenario): Promise<SSRResult> {
  const worker = createSSRWorker();
  return new Promise<SSRResult>((resolve, reject) => {
    worker.onmessage = (event: MessageEvent<SSRResult>) => resolve(event.data);
    worker.onerror = event => reject(new Error(`Server rendering failed: ${event.message}`));
    worker.postMessage({ scenario });
  }).finally(() => worker.terminate());
}

function sampleAll(container: HTMLElement): Samples {
  const samples: Samples = {};
  for (const [name, component] of Object.entries(ssrComponents)) {
    component.variants.forEach((_, index) => {
      for (const implementation of ['griffel', 'css'] as const) {
        const id = ssrContainerId(implementation, name, index);
        const root = container.querySelector(`[data-testid="${id}"]`)!.lastElementChild as HTMLElement;
        samples[id] = readStyles(root, component);
      }
    });
  }
  return samples;
}

/** Differences between the Griffel and CSS Modules implementations of every component variant. */
function compareImplementations(samples: Samples, phase: string): string[] {
  const differences: string[] = [];
  for (const [name, component] of Object.entries(ssrComponents)) {
    component.variants.forEach((variant, index) => {
      const expected = samples[ssrContainerId('griffel', name, index)];
      const actual = samples[ssrContainerId('css', name, index)];
      for (const key of Object.keys(expected)) {
        if (expected[key] !== actual[key]) {
          differences.push(
            `${phase} ${name} ${JSON.stringify(variant)} ${key}: griffel=${expected[key]} css=${actual[key]}`,
          );
        }
      }
    });
  }
  return differences;
}

/** Style changes caused by hydration, for both implementations. */
function compareHydration(before: Samples, after: Samples): string[] {
  return Object.keys(before).flatMap(id =>
    Object.keys(before[id])
      .filter(key => before[id][key] !== after[id][key])
      .map(key => `hydration changed ${id} ${key}: server=${before[id][key]} hydrated=${after[id][key]}`),
  );
}

describe('CSS Modules parity: server rendering and hydration', () => {
  let root: Root | undefined;
  let container: HTMLElement | undefined;

  const cleanUp = () =>
    cy.document().then(doc => {
      root?.unmount();
      container?.remove();
      root = container = undefined;
      doc.head
        .querySelectorAll('style[data-make-styles-bucket], style[id^="fui-FluentProvider"]')
        .forEach(tag => tag.remove());
    });

  beforeEach(function () {
    if (!griffelBuckets) {
      this.skip();
    }
    cleanUp();
    cy.then(() =>
      Cypress.automation('remote:debugger:protocol', {
        command: 'Emulation.setEmulatedMedia',
        params: { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] },
      }),
    );
  });

  afterEach(() => {
    cleanUp();
  });

  for (const scenario of ssrScenarios) {
    it(`renders on the server and hydrates without style changes: ${scenario}`, () => {
      const recoverableErrors: unknown[] = [];
      let serverSamples: Samples = {};

      cy.then(() => serverRender(scenario)).then(({ html, styles }) => {
        // Fluent CSS Modules rules are collected by the server Griffel renderer, at their half-step priority.
        expect(styles, 'server styles include Fluent CSS Modules rules').to.include('data-priority="-2.5"');
        cy.document().then(doc => {
          doc.head.insertAdjacentHTML('beforeend', styles);
          container = doc.createElement('div');
          container.innerHTML = html;
          doc.body.appendChild(container);
          serverSamples = sampleAll(container);
          const differences = compareImplementations(serverSamples, 'server');
          expect(differences, `server rendered differences:\n${differences.join('\n')}`).to.deep.equal([]);
        });
      });

      cy.window().then(win => cy.spy(win.console, 'error').as('consoleError'));
      cy.document().then(
        doc =>
          new Promise<void>(resolve => {
            root = hydrateRoot(
              container!,
              <RendererProvider renderer={createDOMRenderer(doc)} targetDocument={doc}>
                <SSRParityApp scenario={scenario} onHydrated={resolve} />
              </RendererProvider>,
              { onRecoverableError: error => recoverableErrors.push(error) },
            );
          }),
      );

      cy.then(() => {
        const hydratedSamples = sampleAll(container!);
        const differences = [
          ...compareImplementations(hydratedSamples, 'hydrated'),
          ...compareHydration(serverSamples, hydratedSamples),
        ];
        expect(differences, `hydrated differences:\n${differences.join('\n')}`).to.deep.equal([]);
        expect(recoverableErrors, 'recoverable hydration errors').to.deep.equal([]);
      });
      cy.get('@consoleError').should(spy => {
        const calls = (spy as unknown as sinon.SinonSpy).getCalls().map(call => String(call.args[0]));
        expect(
          calls.filter(message => /hydrat/i.test(message)),
          'hydration warnings',
        ).to.deep.equal([]);
      });
    });
  }
});
