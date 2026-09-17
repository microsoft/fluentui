export type {
  ComponentStyleSpec,
  ComponentStyleSpecVersion,
  ConcatValue,
  CssPropertyName,
  Declarations,
  StateDefinition,
  StyleCondition,
  StyleRule,
  StyleValue,
  TokenName,
  TokenReference,
  VarReference,
  VariantAxis,
} from './types';
export { ROOT_SLOT } from './types';

export type { ValidationIssue, ValidationResult } from './validate';
export { assertValidSpec, isConcatStyleValue, isKnownToken, isTokenValue, isVarValue, validateSpec } from './validate';

export type {
  IrDeclaration,
  IrRule,
  IrStateCondition,
  IrVariantAxis,
  IrVariantCondition,
  StyleSpecIR,
} from './normalize';
export { groupRules, normalizeSpec } from './normalize';
