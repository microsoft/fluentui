import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';

export const CODE_HASH_PARAM = 'code';
export const CSS_HASH_PARAM = 'css';
/** Relative to Storybook's `iframe.html`: shell under `/playground/app`, runtime under `/playground/runtime`. */
export const PLAYGROUND_PATH = 'playground/app/playground.html';

export interface CssModuleSource {
  name: string;
  source: string;
}

export interface PlaygroundUrlState {
  code: string;
  cssModules: CssModuleSource[];
}

/**
 * Compresses source code into a URL safe string.
 */
export function encodeCode(code: string): string {
  return compressToEncodedURIComponent(code);
}

/**
 * Inverse of {@link encodeCode}. Returns `null` when the payload is missing or cannot be decoded.
 */
export function decodeCode(encoded: string): string | null {
  if (!encoded) {
    return null;
  }

  const decoded = decompressFromEncodedURIComponent(encoded);

  return typeof decoded === 'string' && decoded.length > 0 ? decoded : null;
}

function parseCssModulesPayload(encoded: string | null): CssModuleSource[] {
  if (!encoded) {
    return [];
  }

  const json = decodeCode(encoded);
  if (!json) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(json);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (entry): entry is CssModuleSource =>
        Boolean(entry) && typeof entry.name === 'string' && typeof entry.source === 'string',
    );
  } catch {
    return [];
  }
}

/**
 * Reads the playground payload from a `location.hash` value (`#code=...&css=...`).
 */
export function decodePlaygroundStateFromHash(hash: string): PlaygroundUrlState | null {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  const encoded = params.get(CODE_HASH_PARAM);
  const code = encoded ? decodeCode(encoded) : null;

  if (!code) {
    return null;
  }

  return { code, cssModules: parseCssModulesPayload(params.get(CSS_HASH_PARAM)) };
}

/**
 * Reads the code payload from a `location.hash` value (`#code=...`).
 */
export function decodeCodeFromHash(hash: string): string | null {
  return decodePlaygroundStateFromHash(hash)?.code ?? null;
}

/**
 * Creates a `location.hash` value for provided playground state.
 */
export function createPlaygroundHash(state: { code: string; cssModules?: readonly CssModuleSource[] }): string {
  let hash = `#${CODE_HASH_PARAM}=${encodeCode(state.code)}`;

  if (state.cssModules && state.cssModules.length > 0) {
    hash += `&${CSS_HASH_PARAM}=${encodeCode(JSON.stringify(state.cssModules))}`;
  }

  return hash;
}

/**
 * Creates a `location.hash` value for provided code.
 */
export function createCodeHash(code: string): string {
  return createPlaygroundHash({ code });
}

/**
 * Creates the playground URL for provided code (and optional CSS modules from the story).
 *
 * The URL is relative to the Storybook preview (`iframe.html`), which lives next to the playground static dirs in the
 * Storybook root, so it also works when Storybook is deployed under a sub path.
 */
export function createPlaygroundUrl(
  code: string,
  baseUrl = `./${PLAYGROUND_PATH}`,
  cssModules?: readonly CssModuleSource[],
): string {
  return `${baseUrl}${createPlaygroundHash({ code, cssModules })}`;
}
