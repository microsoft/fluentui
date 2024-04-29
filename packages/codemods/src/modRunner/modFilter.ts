import { CodeMod } from '../codeMods/types';
import { Maybe } from '../helpers/maybe';

export function getStringFilter(filter: string) {
  return (modString: string) => {
    return modString === filter;
  };
}

export function getRegexFilter(filter: string) {
  const regexFilter = new RegExp(filter);
  return (modString: string) => {
    return regexFilter.test(modString);
  };
}

/**
 * Returns a function that will return true if the mod is found in the filters
 * Default returns true for all mods
 */
export function getModFilter<T>(filters: { stringFilter: Maybe<string[]>; regexFilter: Maybe<string[]> }) {
  let filts: ((modString: string) => boolean)[] = [];
  filts = filts.concat(filters.stringFilter.then(v => v.map(getStringFilter)).orElse([]));
  filts = filts.concat(filters.regexFilter.then(v => v.map(getRegexFilter)).orElse([]));

  // Return default filter if no other filters provided
  if (filts.length === 0) {
    return (mod: CodeMod<T>) => true;
  }
  return (mod: CodeMod<T>) => {
    return filts.some(v => v(mod.name));
  };
}

export function getModExcludeFilter<T>(filters: { stringFilter: Maybe<string[]>; regexFilter: Maybe<string[]> }) {
  const filter = getModFilter(filters);
  return (mod: CodeMod<T>) => !filter(mod);
}
