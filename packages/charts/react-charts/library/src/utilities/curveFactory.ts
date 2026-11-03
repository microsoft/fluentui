import type { CurveFactory } from 'd3-shape';
import { curveCardinal } from 'd3-shape';

const cardinalCurveTension = Symbol('cardinalCurveTension');

export function createCardinalCurve(tension: number): CurveFactory {
  // Retain producer semantics without caching factory instances or comparing function source.
  return Object.defineProperty(curveCardinal.tension(tension), cardinalCurveTension, { value: tension });
}

export function getCardinalCurveTension(curve: unknown): number | undefined {
  return typeof curve === 'function' && cardinalCurveTension in curve && typeof curve[cardinalCurveTension] === 'number'
    ? curve[cardinalCurveTension]
    : undefined;
}
