import type { VegaLiteData } from './VegaLiteTypes';

/** Parsing and copying limits. These limits do not authorize network access. */
export interface VegaDataParseOptions {
  /** Maximum rows in a data source, checked before copying or parsing output. Defaults to 100000. */
  maxRows?: number;
  /** Maximum resource text or individual string length in UTF-16 code units. Defaults to 10000000. */
  maxTextLength?: number;
  /** Cumulative parsing and copying work budget for one resource resolution request. Defaults to 2000000. */
  maxWork?: number;
}

/** Host-owned I/O. No default resolver, fetch, or other external access is provided. */
export type VegaDataResolver = (request: {
  url: string;
  signal: AbortSignal;
  format?: VegaLiteData['format'];
}) => Promise<unknown>;

/** Explicit host-owned resource loading policy with optional parsing and copying limits. */
export interface VegaLiteResourceOptions extends VegaDataParseOptions {
  /** Host callback responsible for resource I/O and enforcing redirect policy during that I/O. */
  resolveData: VegaDataResolver;
  /** Approved HTTP/S origins for absolute URLs and cross-origin relative references. */
  allowedOrigins?: readonly string[];
  /** Cancellation signal used before, during and after host resource resolution. */
  signal: AbortSignal;
  /** HTTP/S base for relative references; same-origin relative paths need no additional allowlist. */
  baseUrl?: string;
}
