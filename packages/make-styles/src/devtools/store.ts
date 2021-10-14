import { SequenceHash } from '../types';
import { DebugSequenceMapping } from './types';

const sequenceMapping: Record<SequenceHash, DebugSequenceMapping> = {};
const sourceMapsMapping: Record<string, string> = {};

const sequenceDetails: Record<SequenceHash, { slotName: string; sourceMapId: string; line: number }> = {};
const cssRules: string[] = [];

export const MK_DEBUG = {
  addSequenceMapping: (hash: SequenceHash, childSequences: DebugSequenceMapping) => {
    sequenceMapping[hash] = childSequences;
  },
  addSourceMapMapping: (sourceMapId: string, sourceMap: string) => {
    sourceMapsMapping[sourceMapId] = sourceMap;
  },
  addCSSRule: (rule: string) => {
    cssRules.push(rule);
  },
  addSequenceDetails: (sequenceHash: SequenceHash, slotName: string, sourceMapId: string, line: number) => {
    sequenceDetails[sequenceHash] = { slotName, sourceMapId, line };
  },

  getSequenceMapping: (hash: SequenceHash): DebugSequenceMapping | undefined => {
    return sequenceMapping[hash];
  },
  getSourceMapMapping: (sourceMapId: string): string | undefined => {
    return sourceMapsMapping[sourceMapId];
  },
  getCSSRules: (): string[] => {
    return cssRules;
  },
  getSequenceDetails: (sequenceHash: SequenceHash): typeof sequenceDetails[string] | undefined => {
    return sequenceDetails[sequenceHash];
  },
};
