import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';

export const CODE_HASH_PARAM = 'code';
export const CSS_HASH_PARAM = 'css';
export const VERSION_HASH_PARAM = 'v';
export const TITLE_HASH_PARAM = 'title';
/**
 * Version of the hash payload format. Links without `v` predate versioning and are read as version 1. Bump it only for
 * changes that older playgrounds cannot read, and keep decoding every earlier version.
 */
export const PLAYGROUND_HASH_VERSION = 1;
/** Links longer than this may be truncated by chat apps, email clients, or browsers. */
export const RECOMMENDED_MAX_URL_LENGTH = 8000;
/**
 * Compressed payloads longer than this are not decompressed, so a crafted link cannot make the playground expand a
 * decompression bomb. It is far above {@link RECOMMENDED_MAX_URL_LENGTH}, which links should stay under anyway.
 */
export const MAX_ENCODED_PAYLOAD_LENGTH = 200_000;
/** Longer titles are truncated. */
export const MAX_TITLE_LENGTH = 120;
/** Relative to Storybook's `iframe.html`: shell under `/playground/app`, runtime under `/playground/runtime`. */
export const PLAYGROUND_PATH = 'playground/app/playground.html';

export interface CssModuleSource {
  name: string;
  source: string;
}

export interface PlaygroundUrlState {
  code: string;
  cssModules: CssModuleSource[];
  /** Optional name of the example, e.g. the story it was opened from. */
  title?: string;
}

export interface PlaygroundHashIssue {
  kind: 'invalid-code' | 'invalid-css' | 'payload-too-large' | 'unsupported-version';
  message: string;
  version?: string;
}

export interface PlaygroundHashReadResult {
  /** `null` when the hash has no readable code. */
  state: PlaygroundUrlState | null;
  /** Payload problems users should know about, e.g. a truncated link. */
  issues: PlaygroundHashIssue[];
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

  return typeof decoded === 'string' ? decoded : null;
}

function parseCssModulesPayload(encoded: string): CssModuleSource[] | null {
  const json = decodeCode(encoded);
  if (!json) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(json);
    if (!Array.isArray(parsed)) {
      return null;
    }

    return parsed.filter(
      (entry): entry is CssModuleSource =>
        Boolean(entry) && typeof entry.name === 'string' && typeof entry.source === 'string',
    );
  } catch {
    return null;
  }
}

/**
 * Reads the playground payload from a `location.hash` value (`#code=...&css=...&v=1`) and reports payload problems,
 * such as a truncated link, instead of silently dropping data.
 */
export function readPlaygroundHash(hash: string): PlaygroundHashReadResult {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  const issues: PlaygroundHashIssue[] = [];
  const version = params.get(VERSION_HASH_PARAM);
  if (version !== null && !(Number.isInteger(Number(version)) && Number(version) >= 1)) {
    issues.push({ kind: 'unsupported-version', version, message: `Unknown link format version "${version}".` });
  } else if (version !== null && Number(version) > PLAYGROUND_HASH_VERSION) {
    issues.push({
      kind: 'unsupported-version',
      version,
      message: `This link was created by a newer playground (format version ${version}) and may not open correctly.`,
    });
  }

  const encoded = params.get(CODE_HASH_PARAM);
  if (encoded === null) {
    return { state: null, issues };
  }

  if (encoded.length > MAX_ENCODED_PAYLOAD_LENGTH) {
    issues.push({ kind: 'payload-too-large', message: 'The code in this link is too large to open.' });
    return { state: null, issues };
  }

  const code = encoded === '' ? '' : decodeCode(encoded);
  if (code === null) {
    issues.push({ kind: 'invalid-code', message: 'The code in this link could not be read. It may be truncated.' });
    return { state: null, issues };
  }

  const encodedCss = params.get(CSS_HASH_PARAM);
  let cssModules: CssModuleSource[] = [];
  if (encodedCss && encodedCss.length > MAX_ENCODED_PAYLOAD_LENGTH) {
    issues.push({ kind: 'payload-too-large', message: 'The styles in this link are too large to open.' });
  } else if (encodedCss) {
    const parsed = parseCssModulesPayload(encodedCss);
    if (parsed === null) {
      issues.push({ kind: 'invalid-css', message: 'The styles in this link could not be read. It may be truncated.' });
    } else {
      cssModules = parsed;
    }
  }

  const title = normalizeTitle(params.get(TITLE_HASH_PARAM));

  return { state: title ? { code, cssModules, title } : { code, cssModules }, issues };
}

function normalizeTitle(title: string | null | undefined): string | undefined {
  // Strip control characters from untrusted link data.
  const normalized = title?.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim();

  return normalized ? normalized.slice(0, MAX_TITLE_LENGTH) : undefined;
}

/**
 * Reads the playground payload from a `location.hash` value (`#code=...&css=...`).
 */
export function decodePlaygroundStateFromHash(hash: string): PlaygroundUrlState | null {
  return readPlaygroundHash(hash).state;
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
export function createPlaygroundHash(state: {
  code: string;
  cssModules?: readonly CssModuleSource[];
  title?: string;
}): string {
  let hash = `#${CODE_HASH_PARAM}=${encodeCode(state.code)}`;

  if (state.cssModules && state.cssModules.length > 0) {
    hash += `&${CSS_HASH_PARAM}=${encodeCode(JSON.stringify(state.cssModules))}`;
  }

  const title = normalizeTitle(state.title);
  if (title) {
    hash += `&${TITLE_HASH_PARAM}=${encodeURIComponent(title)}`;
  }

  return `${hash}&${VERSION_HASH_PARAM}=${PLAYGROUND_HASH_VERSION}`;
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
  title?: string,
): string {
  return `${baseUrl}${createPlaygroundHash({ code, cssModules, title })}`;
}
