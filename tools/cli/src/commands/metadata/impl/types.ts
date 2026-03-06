// ============================================================================
// Metadata command types
// ============================================================================

/**
 * Parsed CLI arguments for the `metadata` command.
 */
export interface MetadataArgs {
  /** Path to the .d.ts entry file. When omitted, resolved from package.json "types" field. */
  entry?: string;
  /** Output format. Defaults to 'json'. */
  reporter?: 'json' | 'markdown' | 'html';
  /** Output file path. Defaults to stdout. */
  output?: string;
}

// ============================================================================
// Metadata output schema
// ============================================================================

/**
 * Root metadata output structure written as JSON.
 */
export interface MetadataOutput {
  /** Package identity. */
  package: PackageInfo;
  /** Describes each category used in the output. */
  legend: Record<string, CategoryLegendEntry>;
  /** Categorised API symbols. */
  categories: {
    components: Record<string, ComponentDoc>;
    hooks: Record<string, HookDoc>;
    types: Record<string, TypeDoc>;
    others: Record<string, OtherDoc>;
  };
}

export interface PackageInfo {
  name: string;
  version: string;
}

export interface CategoryLegendEntry {
  name: string;
  description: string;
}

// ============================================================================
// Symbol documentation types
// ============================================================================

/** Base fields shared by every documented symbol. */
export interface BaseSymbolDoc {
  /** Export name as it appears in the .d.ts. */
  name: string;
  /** JSDoc description (first line / summary). */
  description: string;
  /** Full type signature text. */
  typeSignature: string;
  /** JSDoc tags extracted from the declaration (e.g. @internal, @deprecated). */
  tags: Record<string, string>;
}

/** A React component export. */
export interface ComponentDoc extends BaseSymbolDoc {
  /** Reference to the props type, e.g. `{ "$ref": "#/categories/types/ButtonProps" }`. */
  propsType?: RefOrInline;
}

/** A React hook export. */
export interface HookDoc extends BaseSymbolDoc {
  parameters: ParameterDoc[];
  returnType: string;
}

/** A type alias, interface, or enum export. */
export interface TypeDoc extends BaseSymbolDoc {
  /** 'interface' | 'type-alias' | 'enum'. */
  kind: TypeKind;
  /** Resolved members for interfaces / type aliases with object shapes. */
  members: Record<string, MemberDoc>;
}

/** Any other export (constants, render functions, utility functions). */
export interface OtherDoc extends BaseSymbolDoc {
  /** 'variable' | 'function' | 'class' | 'unknown'. */
  kind: OtherKind;
  /** Function parameters (when kind is 'function'). */
  parameters?: ParameterDoc[];
  /** Function return type (when kind is 'function'). */
  returnType?: string;
}

// ============================================================================
// Supporting types
// ============================================================================

export type TypeKind = 'interface' | 'type-alias' | 'enum';
export type OtherKind = 'variable' | 'function' | 'class' | 'unknown';

/** A function or hook parameter. */
export interface ParameterDoc {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

/** A member of an interface or type alias. */
export interface MemberDoc {
  name: string;
  type: string;
  required: boolean;
  description: string;
  /** Extracted from @default JSDoc tag. */
  defaultValue?: string;
}

/**
 * Either a JSON `$ref` pointer or an inline type string.
 * When the referenced package has metadata.json, `$ref` is used.
 * Otherwise `inline` contains the raw type signature.
 */
export type RefOrInline = { $ref: string } | { inline: string };

// ============================================================================
// Classification
// ============================================================================

/**
 * Classification of an exported symbol.
 */
export type SymbolClassification = 'component' | 'hook' | 'type' | 'other';
