import * as React from 'react';
import { render } from '@testing-library/react';

import { FluentProvider } from '../FluentProvider';
import { ScaleRegion, clearScaleRegionWarnings } from './ScaleRegion';
import { isConformant } from '../../testing/isConformant';

import styles from './ScaleRegion.module.css';

describe('ScaleRegion', () => {
  beforeEach(() => {
    clearScaleRegionWarnings(document);
  });

  isConformant({
    Component: ScaleRegion,
    displayName: 'ScaleRegion',
    requiredProps: { children: 'content' },
  });

  it('renders one div carrying the theme-package mechanism class and the contents module class', () => {
    const { container } = render(
      <FluentProvider theme="fui-theme-web-light">
        <ScaleRegion data-testid="region">content</ScaleRegion>
      </FluentProvider>,
    );

    const el = container.querySelector('[data-testid="region"]') as HTMLElement;

    expect(el.tagName).toBe('DIV');
    // The mechanism class ships with the theme stylesheet, not this package's modules.
    expect(el).toHaveClass('fui-scale-region');
    // The contents display comes from the module class map (jsdom cannot compute @apply;
    // the class application is asserted here, the computed display in the browser probe).
    expect(el).toHaveClass(styles.root);
    expect(el.className).toMatch(/fuicm-/);
    expect(el.textContent).toBe('content');
  });

  it('stamps data-fui-scale from the scale prop and omits it when the prop is omitted', () => {
    const { rerender, getByTestId } = render(
      <FluentProvider theme="fui-theme-web-light">
        <ScaleRegion data-testid="region" scale={1.5}>
          content
        </ScaleRegion>
      </FluentProvider>,
    );

    expect(getByTestId('region')).toHaveAttribute('data-fui-scale', '1.5');

    rerender(
      <FluentProvider theme="fui-theme-web-light">
        <ScaleRegion data-testid="region">content</ScaleRegion>
      </FluentProvider>,
    );

    // Absent attribute → the theme rule's typed attr() fallback of 1 applies.
    expect(getByTestId('region')).not.toHaveAttribute('data-fui-scale');
  });

  it('re-stamps the enclosing provider theme class', () => {
    const { getByTestId } = render(
      <FluentProvider theme="fui-theme-web-dark">
        <ScaleRegion data-testid="region" scale={2}>
          content
        </ScaleRegion>
      </FluentProvider>,
    );

    expect(getByTestId('region')).toHaveClass('fui-theme-web-dark');
  });

  it('re-stamps the nearest theme through a themeless nested provider', () => {
    const { getByTestId } = render(
      <FluentProvider theme="fui-theme-web-dark">
        <FluentProvider>
          <ScaleRegion data-testid="region">content</ScaleRegion>
        </FluentProvider>
      </FluentProvider>,
    );

    expect(getByTestId('region')).toHaveClass('fui-theme-web-dark');
  });

  it('re-stamps the innermost theme when providers nest with different themes', () => {
    const { getByTestId } = render(
      <FluentProvider theme="fui-theme-web-light">
        <FluentProvider theme="fui-theme-web-dark">
          <ScaleRegion data-testid="region">content</ScaleRegion>
        </FluentProvider>
      </FluentProvider>,
    );

    expect(getByTestId('region')).toHaveClass('fui-theme-web-dark');
    expect(getByTestId('region')).not.toHaveClass('fui-theme-web-light');
  });

  it('merges the consumer className last and passes the rest through', () => {
    const { getByTestId } = render(
      <FluentProvider theme="fui-theme-web-light">
        <ScaleRegion className="consumer" id="host" aria-label="zoomed" data-testid="region">
          content
        </ScaleRegion>
      </FluentProvider>,
    );

    const el = getByTestId('region');
    const classes = el.className.split(' ');

    expect(classes[classes.length - 1]).toBe('consumer');
    expect(el).toHaveClass('fui-scale-region');
    expect(el).toHaveAttribute('id', 'host');
    expect(el).toHaveAttribute('aria-label', 'zoomed');
  });

  it('forwards its ref to the rendered div', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <FluentProvider theme="fui-theme-web-light">
        <ScaleRegion ref={ref}>content</ScaleRegion>
      </FluentProvider>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('fui-scale-region');
  });

  it('warns once per document when no themed provider encloses it', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    try {
      render(<ScaleRegion scale={2}>content</ScaleRegion>);

      const scaleWarnings = () => warn.mock.calls.filter(([message]) => String(message).includes('ScaleRegion'));

      expect(scaleWarnings()).toHaveLength(1);
      expect(String(scaleWarnings()[0][0])).toContain('no themed FluentProvider');

      // Latched: a second unthemed region in the same document stays quiet.
      render(<ScaleRegion>content</ScaleRegion>);
      expect(scaleWarnings()).toHaveLength(1);
    } finally {
      warn.mockRestore();
    }
  });

  it('stamps no theme class and keeps the mechanism class when unthemed', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    try {
      const { getByTestId } = render(
        <ScaleRegion data-testid="region" scale={2}>
          content
        </ScaleRegion>,
      );

      const el = getByTestId('region');

      expect(el).toHaveClass('fui-scale-region');
      expect(el.className).not.toMatch(/fui-theme-/);
    } finally {
      warn.mockRestore();
    }
  });

  it('does not warn inside a themed provider', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    try {
      render(
        <FluentProvider theme="fui-theme-web-light">
          <ScaleRegion scale={2}>content</ScaleRegion>
        </FluentProvider>,
      );

      expect(warn.mock.calls.filter(([message]) => String(message).includes('ScaleRegion'))).toHaveLength(0);
    } finally {
      warn.mockRestore();
    }
  });
});
