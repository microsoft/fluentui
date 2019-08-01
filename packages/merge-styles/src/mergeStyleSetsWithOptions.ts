import { mergeStyleSets } from './mergeStyleSets';
import { IStyleSet, IProcessedStyleSet } from './IStyleSet';
import { Stylesheet } from './Stylesheet';

export interface IMergeStyleSetsOptions {
  rtl?: boolean;
}

export function mergeStyleSetsWithOptions<TStyleSet extends IStyleSet<TStyleSet>>(
  options: IMergeStyleSetsOptions,
  ...styleSets: (TStyleSet | false | null | undefined)[]
): IProcessedStyleSet<TStyleSet> {
  const { rtl } = options;
  const stylesheet = Stylesheet.getInstance();

  if (typeof rtl !== undefined) {
    stylesheet.setConfig({ rtl });
  }

  return mergeStyleSets(...styleSets) as IProcessedStyleSet<TStyleSet>;
}
