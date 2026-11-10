import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Site } from './Site';
import type { ISiteDefinition } from '@fluentui/react-docsite-components/lib/index2';

jest.mock('@fluentui/react-docsite-components/lib/index2', () => {
  const react = jest.requireActual<typeof React>('react');
  return {
    baseDefinition: { siteTitle: 'Fluent UI', pages: [] },
    EventNames: {},
    getSiteArea: () => 'Controls',
    hasActiveChild: () => true,
    PlatformContext: react.createContext('default'),
    trackEvent: jest.fn(),
    trackPageView: jest.fn(),
    TopBanner: jest.fn(() => null),
    TopNav: jest.fn(() => <nav aria-label="Top-level navigation" />),
    getNormalizedPath: () => window.location.hash,
    getQueryParam: jest.fn(),
    getActivePage: () => ({ title: 'Button' }),
  };
});

jest.mock('@fluentui/react-docsite-components/lib/index', () => {
  const react = jest.requireActual<typeof React>('react');
  return {
    AppThemesContext: react.createContext({}),
    extractAnchorLink: jest.fn(),
  };
});

describe('Site section navigation', () => {
  const siteDefinition: ISiteDefinition = {
    siteTitle: 'Fluent UI',
    pages: [
      {
        title: 'Controls',
        url: '#/controls',
        pages: [
          { title: 'Button', url: '#/controls/ios/button' },
          { title: 'Avatar', url: '#/controls/ios/avatar' },
        ],
      },
    ],
  };
  const Page = ({ title }: { title: string }) => <h1>{title}</h1>;

  beforeEach(() => {
    window.history.replaceState(null, '', '#/controls/ios/button');
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: jest.fn(() => ({ matches: false, addListener: jest.fn(), removeListener: jest.fn() })),
    });
  });

  it.each([true, false])('provides section navigation with hasUHF=%s', hasUHF => {
    render(
      <Site siteDefinition={siteDefinition} hasUHF={hasUHF}>
        <Page title="Button" />
      </Site>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Section navigation' }));

    expect(screen.getByRole('navigation', { name: 'Controls section navigation' })).not.toBeNull();
    expect(!!screen.queryByRole('navigation', { name: 'Top-level navigation' })).toBe(!hasUHF);
  });

  it('does not remount the disclosure or lose focus when the site updates', () => {
    const { rerender } = render(
      <Site siteDefinition={siteDefinition} hasUHF>
        <Page title="Button" />
      </Site>,
    );
    const button = screen.getByRole('button', { name: 'Section navigation' });
    fireEvent.click(button);
    rerender(
      <Site siteDefinition={siteDefinition} hasUHF>
        <Page title="Updated" />
      </Site>,
    );

    expect(screen.getByRole('button', { name: 'Section navigation' })).toBe(button);
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(document.activeElement).toBe(button);
    expect(screen.getByRole('heading', { name: 'Updated' })).not.toBeNull();
  });

  it('focuses the content after a mobile navigation link is activated', () => {
    const { container } = render(
      <Site siteDefinition={siteDefinition} hasUHF>
        <Page title="Button" />
      </Site>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Section navigation' }));
    fireEvent.click(screen.getByRole('link', { name: 'Avatar' }));

    expect(screen.queryByRole('navigation', { name: 'Controls section navigation' })).toBeNull();
    expect(document.activeElement).toBe(container.querySelector('[data-app-content-div]'));
  });

  it('does not add an empty disclosure on pages without section navigation', () => {
    render(
      <Site siteDefinition={{ siteTitle: 'Fluent UI', pages: [] }} hasUHF>
        <Page title="Home" />
      </Site>,
    );

    expect(screen.queryByRole('button', { name: 'Section navigation' })).toBeNull();
  });

  it('does not add a disclosure on full-bleed pages', () => {
    render(
      <Site
        siteDefinition={{
          ...siteDefinition,
          pages: [{ ...siteDefinition.pages[0], isContentFullBleed: true }],
        }}
        hasUHF
      >
        <Page title="Home" />
      </Site>,
    );

    expect(screen.queryByRole('button', { name: 'Section navigation' })).toBeNull();
  });
});
