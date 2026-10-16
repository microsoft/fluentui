import type { VegaLiteData } from './VegaLiteTypes';

/**
 * Independent, finite parsing and copying limits. These limits do not authorize network access.
 * A source must satisfy every limit; raising the text/row limit does not raise the cumulative work budget.
 */
export interface VegaDataParseOptions {
  /** Maximum rows in a data source, checked before copying or parsing output. Defaults to 100000. */
  maxRows?: number;
  /** Maximum resource text or individual string length in UTF-16 code units. Defaults to 10000000. */
  maxTextLength?: number;
  /**
   * Cumulative parsing and copying work budget for one parse call or entire resource resolution request.
   * Defaults to 40000000: enough for a 10000000-code-unit text source, two row copies and bounded overhead.
   * Charges input text length, copied string/key lengths, array slots, value visits and declared field parsing.
   * Shared across the spec, all resources and repeated copies, even when host requests are deduplicated.
   * Large/wide records or multiple sources can exhaust work before reaching the independent text/row limits.
   */
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
