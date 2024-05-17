import * as React from 'react';

export type MaterialTypeContextValue = MaterialType;

export const MaterialType = {
  /**
   * A solid surface that does not allow any light to pass through.
   */
  Opaque: 'opaque',
  /**
   * A surface that allows some light to pass through.
   *
   * > backdrop-filter: blur(80px);
   */
  SemiOpaque: 'semi-opaque',
  /**
   * A surface that allows light to pass through.
   *
   * > backdrop-filter: blur(45px);
   */
  Translucent: 'translucent',
  /**
   * A surface that allows light to pass through.
   *
   * > backdrop-filter: blur(30px);
   */
  SemiTransparent: 'semi-transparent',
} as const;

export type MaterialType = (typeof MaterialType)[keyof typeof MaterialType];

namespace MaterialType {
  export type Opaque = typeof MaterialType.Opaque;
  export type SemiOpaque = typeof MaterialType.SemiOpaque;
  export type Translucent = typeof MaterialType.Translucent;
  export type SemiTransparent = typeof MaterialType.SemiTransparent;
}

/**
 * @internal
 * Used as a flag that indicates that the components should have a semi-transparent background.
 * The provided number will be used as a backdrop filter blur value.
 */
const MaterialTypeContext = React.createContext<MaterialTypeContextValue | undefined>(
  undefined,
) as React.Context<MaterialTypeContextValue>;

const materialTypeDefaultValue: MaterialTypeContextValue = MaterialType.Opaque;

export const { Provider: MaterialTypeProvider } = MaterialTypeContext;

export function useMaterialType(): MaterialTypeContextValue {
  return React.useContext(MaterialTypeContext) ?? materialTypeDefaultValue;
}
