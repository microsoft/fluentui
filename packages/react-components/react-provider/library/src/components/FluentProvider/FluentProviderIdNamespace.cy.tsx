import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { IdNamespaceDemo } from '../../../testing/IdNamespaceDemo';

type AppName = 'host' | 'embedded';
type AppState = {
  version: string;
  id?: string;
  label?: string;
  themeClass?: string;
  values: Record<string, string> | null;
  descendantValues: Record<string, string> | null;
  expected: Record<string, string>;
};
type DemoState = {
  revision: number;
  ready: boolean;
  apps: Record<AppName, AppState>;
  styleIds: string[];
  serverIds: string[];
  independentRuntimes: boolean;
  griffelSheets: number;
  errors: string[];
  hasProcess: boolean;
};

function state(minimumRevision = 1) {
  return cy
    .get('[data-demo-state]')
    .should(element => {
      expect(element.text(), 'fixture state message').to.match(/^\{/);
      const value: DemoState = JSON.parse(element.text());
      expect(value.ready, 'completed app mounts').to.equal(true);
      expect(value.revision).to.be.at.least(minimumRevision);
    })
    .then(element => {
      const value: DemoState = JSON.parse(element.text());
      return value;
    });
}

function expectHealthy(value: DemoState, names: AppName[] = ['host', 'embedded']) {
  expect(value.independentRuntimes).to.equal(true);
  expect(value.griffelSheets).to.be.greaterThan(0);
  expect(value.hasProcess).to.equal(false);
  expect(value.errors).to.deep.equal([]);
  for (const name of names) {
    const app = value.apps[name];
    expect(app.version).to.equal(Cypress.env('idNamespaceReactVersion'));
    expect(app.id).to.equal(app.label);
    expect(app.values).to.deep.equal(app.expected);
    expect(app.descendantValues).to.deep.equal(app.expected);
    expect(value.styleIds).to.include(app.themeClass);
    expect(Object.values(app.expected).every(Boolean)).to.equal(true);
  }
  if (names.length === 2) {
    expect(value.apps.host.id).not.to.equal(value.apps.embedded.id);
    expect(value.apps.host.themeClass).not.to.equal(value.apps.embedded.themeClass);
    expect(new Set(value.styleIds).size).to.equal(value.styleIds.length);
  }
}

describe('FluentProvider ID namespace', () => {
  beforeEach(() => {
    expect(Cypress.env('idNamespaceReactVersion'), 'fixture builder uses the mounted React version').to.equal(
      React.version,
    );
  });

  it('demonstrates independent unconfigured bundles colliding without a root prefix', () => {
    mount(<IdNamespaceDemo baseUrl="/id-namespace-demo" scenario="broken" />);
    state().then(value => {
      expect(value.independentRuntimes).to.equal(true);
      expect(value.apps.host.id).to.equal(value.apps.embedded.id);
      expect(value.apps.host.themeClass).to.equal(value.apps.embedded.themeClass);
      expect(value.apps.host.version).to.equal(Cypress.env('idNamespaceReactVersion'));
      expect(value.apps.embedded.version).to.equal(Cypress.env('idNamespaceReactVersion'));
    });
    cy.contains('button', 'Unmount embedded app').click();
    state(2).then(value => {
      // Observe the incident without requiring destructive cleanup to remain permanent behavior.
      expect(value.griffelSheets).to.be.greaterThan(0);
      cy.log('Host values after embedded cleanup', JSON.stringify(value.apps.host.values));
    });
  });

  for (const hydration of [false, true]) {
    for (const reverse of [false, true]) {
      const scenario = `build${hydration ? '-hydrate' : ''}${reverse ? '-reverse' : ''}`;
      it(`isolates full themes and lifecycle without root/provider prefixes: ${scenario}`, () => {
        mount(<IdNamespaceDemo baseUrl="/id-namespace-demo" scenario={scenario} />);
        let before: DemoState;
        let updated: DemoState;
        state().then(value => {
          before = value;
          expectHealthy(value);
          if (hydration) {
            expect([value.apps.host.id, value.apps.embedded.id]).to.deep.equal(value.serverIds);
          }
        });
        cy.contains('button', 'Update embedded theme').click();
        state(2).then(value => {
          updated = value;
          expectHealthy(value);
          expect(value.apps.host.values).to.deep.equal(before.apps.host.values);
          expect(value.apps.embedded.values).not.to.deep.equal(before.apps.embedded.values);
        });
        const removed: AppName = reverse ? 'host' : 'embedded';
        const survivor: AppName = reverse ? 'embedded' : 'host';
        cy.contains('button', reverse ? 'Unmount host app' : 'Unmount embedded app').click();
        state(3).then(value => {
          expectHealthy(value, [survivor]);
          expect(value.apps[survivor].values).to.deep.equal(updated.apps[survivor].values);
          expect(value.styleIds).not.to.include(updated.apps[removed].themeClass);
        });
        cy.contains('button', reverse ? 'Unmount embedded app' : 'Unmount host app').click();
        state(4).then(value => expect(value.styleIds).to.deep.equal([]));
      });
    }
  }

  it('supports existing root/provider isolation without build namespaces', () => {
    const legacy = Number(String(Cypress.env('idNamespaceReactVersion')).split('.')[0]) < 18;
    mount(<IdNamespaceDemo baseUrl="/id-namespace-demo" scenario={legacy ? 'provider' : 'root'} />);
    state().then(value => expectHealthy(value));
  });

  for (const bundler of ['webpack', 'vite']) {
    it(`runs published ${bundler} output without a process shim`, () => {
      mount(<IdNamespaceDemo baseUrl="/id-namespace-demo" scenario={bundler} />);
      cy.get('[data-demo-state]').should(element => {
        expect(element.text(), 'consumer state message').to.match(/^\{/);
        const value: { html: string; version: string; hasProcess: boolean } = JSON.parse(element.text());
        expect(value.html).to.contain(`id="${bundler}-app-scope-field-`);
        expect(value.version).to.equal(Cypress.env('idNamespaceReactVersion'));
        expect(value.hasProcess).to.equal(false);
      });
    });
  }
});
