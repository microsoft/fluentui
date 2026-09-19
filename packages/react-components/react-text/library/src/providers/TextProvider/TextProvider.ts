import * as React from 'react';
import { TextProps } from '../../components/Text/Text.types';

/**
 * The context provided by TextProvider
 */
export type TextContextValue = TextProps;

/**
 * @internal
 * Context shared by all of the texts in the app
 */
const TextContext = React.createContext<TextContextValue | undefined>(undefined) as React.Context<TextContextValue>;

const textContextDefaultValue: TextContextValue = {};

/**
 * @internal
 */
export const TextProvider = TextContext.Provider;

export function useText(): TextContextValue {
  return React.useContext(TextContext) ?? textContextDefaultValue;
}
