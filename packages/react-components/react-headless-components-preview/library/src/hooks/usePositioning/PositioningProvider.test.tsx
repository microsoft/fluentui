import * as React from 'react';
import { render } from '@testing-library/react';
import { floatingUIPositioningEngine } from '@fluentui/react-positioning';
import type { PositioningEngine } from '@fluentui/react-positioning';
import { PositioningProvider } from './PositioningProvider';
import { usePositioningEngineContext } from './PositioningEngineContext';
import { isFallbackPositioningEngine } from './fallbackPositioningEngine';

function readEngine(element: (capture: React.ReactNode) => React.ReactElement) {
  let engine: PositioningEngine | undefined;
  const Capture = () => {
    engine = usePositioningEngineContext();
    return null;
  };
  render(element(<Capture />));
  return engine;
}

describe('PositioningProvider', () => {
  it('supplies no engine without a provider', () => {
    expect(readEngine(capture => <>{capture}</>)).toBeUndefined();
  });

  it('supplies a fallback-wrapped Floating UI engine in fallback mode', () => {
    const engine = readEngine(capture => <PositioningProvider mode="fallback">{capture}</PositioningProvider>);

    expect(engine).toBeDefined();
    expect(isFallbackPositioningEngine(engine)).toBe(true);
  });

  it('supplies the Floating UI engine as is in floating-ui mode', () => {
    const engine = readEngine(capture => <PositioningProvider mode="floating-ui">{capture}</PositioningProvider>);

    expect(engine).toBe(floatingUIPositioningEngine);
  });

  it('supplies no engine in css mode', () => {
    expect(readEngine(capture => <PositioningProvider mode="css">{capture}</PositioningProvider>)).toBeUndefined();
  });

  it('lets a nested provider override the mode for its subtree', () => {
    const cssInsideFallback = readEngine(capture => (
      <PositioningProvider mode="fallback">
        <PositioningProvider mode="css">{capture}</PositioningProvider>
      </PositioningProvider>
    ));
    const floatingInsideFallback = readEngine(capture => (
      <PositioningProvider mode="fallback">
        <PositioningProvider mode="floating-ui">{capture}</PositioningProvider>
      </PositioningProvider>
    ));

    expect(cssInsideFallback).toBeUndefined();
    expect(floatingInsideFallback).toBe(floatingUIPositioningEngine);
  });

  it('keeps the same engine identity across renders', () => {
    const first = readEngine(capture => <PositioningProvider mode="fallback">{capture}</PositioningProvider>);
    const second = readEngine(capture => <PositioningProvider mode="fallback">{capture}</PositioningProvider>);

    expect(first).toBe(second);
  });
});
