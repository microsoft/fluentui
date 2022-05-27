/* eslint-disable */
// @ts-ignore
import objectEach from 'fast-loops/lib/objectEach';
import createSubscription from './connection/createSubscription';
import { FelaRenderer } from '../types';

export default function render(renderer: FelaRenderer, targetDocument?: any): void {
  if (!renderer.updateSubscription) {
    renderer.scoreIndex = {};
    renderer.nodes = {};

    renderer.updateSubscription = createSubscription(renderer, targetDocument);
    renderer.subscribe(renderer.updateSubscription);

    // simulate rendering to ensure all styles rendered prior to
    // calling FelaDOM.render are correctly injected as well
    objectEach(renderer.cache, renderer._emitChange);
  }
}
