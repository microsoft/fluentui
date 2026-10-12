// Import the shipping root before the direct loader to exercise the public initialization path.
import type {
  VegaDataParseOptions,
  VegaDataResolver,
  VegaLiteResourceFormat,
  VegaLiteResourceOptions,
  VegaLiteSpec,
} from '../../index';
import { resolveVegaLiteResources } from '../../index';
import type {
  VegaDataParseOptions as DirectParseOptions,
  VegaDataResolver as DirectResolver,
  VegaLiteResourceOptions as DirectResourceOptions,
} from './VegaLiteResourceLoader';
import { parseVegaDataValues, resolveVegaLiteResources as directResolve } from './VegaLiteResourceLoader';

type Equal<Left, Right> = (<Value>() => Value extends Left ? 1 : 2) extends <Value>() => Value extends Right ? 1 : 2
  ? true
  : false;

describe('Vega-Lite public resource API', () => {
  it('preserves exact resolver, resource, parser and direct-import contracts', () => {
    const contracts: {
      resolver: Equal<
        VegaDataResolver,
        (request: { url: string; signal: AbortSignal; format?: VegaLiteResourceFormat }) => Promise<unknown>
      >;
      result: Equal<ReturnType<typeof resolveVegaLiteResources>, Promise<VegaLiteSpec>>;
      parameters: Equal<Parameters<typeof resolveVegaLiteResources>, [VegaLiteSpec, VegaLiteResourceOptions]>;
      rows: Equal<ReturnType<typeof parseVegaDataValues>, Record<string, unknown>[]>;
      parserOptions: Equal<Parameters<typeof parseVegaDataValues>[1], VegaDataParseOptions | undefined>;
      limits: Equal<VegaDataParseOptions, { maxRows?: number; maxTextLength?: number; maxWork?: number }>;
      policy: Equal<
        { [Key in keyof VegaLiteResourceOptions]: VegaLiteResourceOptions[Key] },
        {
          maxRows?: number;
          maxTextLength?: number;
          maxWork?: number;
          resolveData: VegaDataResolver;
          allowedOrigins?: readonly string[];
          signal: AbortSignal;
          baseUrl?: string;
        }
      >;
      directResolver: Equal<DirectResolver, VegaDataResolver>;
      directLimits: Equal<DirectParseOptions, VegaDataParseOptions>;
      directOptions: Equal<DirectResourceOptions, VegaLiteResourceOptions>;
      limitsWithoutResolver: Equal<VegaDataParseOptions extends VegaLiteResourceOptions ? true : false, false>;
      missingSignal: Equal<{ resolveData: VegaDataResolver } extends VegaLiteResourceOptions ? true : false, false>;
    } = {
      resolver: true,
      result: true,
      parameters: true,
      rows: true,
      parserOptions: true,
      limits: true,
      policy: true,
      directResolver: true,
      directLimits: true,
      directOptions: true,
      limitsWithoutResolver: true,
      missingSignal: true,
    };

    expect(Object.values(contracts).every(Boolean)).toBe(true);
    expect(resolveVegaLiteResources).toBe(directResolve);
  });

  it('accepts typed host options and preserves optional formats, promise results and parser rows', async () => {
    const signal = new AbortController().signal;
    const origin = 'https://charts.example';
    const limits: VegaDataParseOptions = { maxRows: 2, maxTextLength: 1000, maxWork: 10000 };
    const resolveData: VegaDataResolver = async request => {
      const url: string = request.url;
      const requestSignal: AbortSignal = request.signal;
      const format: VegaLiteResourceFormat | undefined = request.format;
      expect(url).toBe(`${origin}/data.json`);
      expect(requestSignal).toBe(signal);
      expect(format).toBeUndefined();
      return [{ n: '2' }];
    };
    const options: VegaLiteResourceOptions = {
      ...limits,
      resolveData,
      signal,
      allowedOrigins: [origin] as const,
    };
    const result: Promise<VegaLiteSpec> = resolveVegaLiteResources({ data: { url: `${origin}/data.json` } }, options);
    const resolved = await result;
    expect(resolved.data?.values).toEqual([{ n: '2' }]);

    const rows: Record<string, unknown>[] = parseVegaDataValues(
      { values: resolved.data?.values, format: { parse: { n: 'number' } } },
      limits,
    );
    const value: unknown = rows[0].n;
    expect(value).toBe(2);
    expect(parseVegaDataValues({ values: [] })).toEqual([]);
  });

  it.each<{ limits: VegaDataParseOptions; payload: unknown; error: RegExp }>([
    { limits: { maxRows: 1 }, payload: [{ n: 1 }, { n: 2 }], error: /row.*limit/i },
    { limits: { maxTextLength: 64 }, payload: `n\n${'1'.repeat(100)}\n`, error: /text.*limit/i },
    { limits: { maxWork: 300 }, payload: [{ n: 'x'.repeat(500) }], error: /work.*limit/i },
  ])('enforces typed public limits $limits on host payloads', async ({ limits, payload, error }) => {
    const resolveData = jest.fn<ReturnType<VegaDataResolver>, Parameters<VegaDataResolver>>(async () => payload);
    const options: VegaLiteResourceOptions = {
      ...limits,
      resolveData,
      signal: new AbortController().signal,
      baseUrl: 'https://charts.example/',
    };

    await expect(resolveVegaLiteResources({ data: { url: 'data.json' } }, options)).rejects.toThrow(error);
    expect(resolveData).toHaveBeenCalledTimes(1);
  });

  it('does not grant network permissions through parsing limits or install a default resolver', async () => {
    const resolveData = jest.fn<ReturnType<VegaDataResolver>, Parameters<VegaDataResolver>>(async () => []);
    const options: VegaLiteResourceOptions = {
      maxRows: 100000,
      maxTextLength: 10000000,
      maxWork: 2000000,
      resolveData,
      signal: new AbortController().signal,
    };
    const inline: VegaLiteSpec = { data: { values: [{ n: 1 }] } };
    await expect(resolveVegaLiteResources(inline, options)).resolves.toEqual(inline);
    await expect(
      resolveVegaLiteResources({ data: { url: 'https://charts.example/data.json' } }, options),
    ).rejects.toThrow(/origin|allowlist/i);
    expect(resolveData).not.toHaveBeenCalled();
  });
});
