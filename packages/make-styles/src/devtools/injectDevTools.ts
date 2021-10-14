import { DEFINITION_LOOKUP_TABLE, SEQUENCE_PREFIX } from '../constants';
import { LookupItem } from '../types';
import { MK_DEBUG } from './store';
import { DebugSequence } from './types';
import { findRootSequenceForClassName, getDirectionalClassName } from './utils';

export function injectDevTools() {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  if (typeof window === 'undefined') {
    return;
  }

  window.__MAKESTYLES_DEVTOOLS__ = {
    getInfo: element => {
      const rootSequenceId = Array.from(element.classList).find(className => className.startsWith(SEQUENCE_PREFIX));

      if (rootSequenceId === undefined) {
        return undefined;
      }

      const lookupItem: LookupItem | undefined = DEFINITION_LOOKUP_TABLE[rootSequenceId];

      if (lookupItem === undefined) {
        return undefined;
      }

      const debugSequences: Record<string, DebugSequence> = {};

      const classesMapping = lookupItem[0];
      const direction = lookupItem[1];

      Object.values(classesMapping).forEach(classes => {
        const atomicClassName = getDirectionalClassName(classes, direction);
        const sequenceHash = findRootSequenceForClassName(atomicClassName, direction, rootSequenceId);

        const mapData = MK_DEBUG.getSequenceDetails(sequenceHash);
        const cssRule = MK_DEBUG.getCSSRules().find(cssRule => {
          return cssRule.includes(atomicClassName);
        });

        if (debugSequences[sequenceHash]) {
          debugSequences[sequenceHash].rules.push({
            /* TODO: fix me */
            cssRule: cssRule!,
            className: atomicClassName,
          });
          return;
        }

        debugSequences[sequenceHash] = {
          id: sequenceHash,
          direction,
          rules: [{ cssRule: cssRule!, className: atomicClassName }],

          ...(mapData && {
            slot: mapData.slotName,
            sourceMap: MK_DEBUG.getSourceMapMapping(mapData.sourceMapId)!,
            sourceMapLine: mapData.line,
          }),
        };
      });

      return {
        id: rootSequenceId,
        sequences: debugSequences,
      };
    },
  };
}
