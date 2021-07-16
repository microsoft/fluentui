import { BooleanKnob } from './BooleanKnob';
import { LiteralKnob } from './LiteralKnob';
import { NumberKnob } from './NumberKnob';
import { ShorthandKnob } from './ShorthandKnob';
import { StringKnob } from './StringKnob';

export const knobs = {
  boolean: BooleanKnob,
  number: NumberKnob,
  string: StringKnob,
  ShorthandValue: ShorthandKnob,
  literal: LiteralKnob,
  ReactText: StringKnob,
  'React.ElementType': StringKnob,
};
