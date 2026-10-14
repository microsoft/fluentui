import type { VegaLiteData, VegaLiteSpec } from './VegaLiteTypes';
import { parseVegaDataValues, resolveVegaLiteResources } from './VegaLiteResourceLoader';
import type { VegaDataResolver } from './VegaLiteResourceLoader';
import { timeParse, utcParse } from 'd3-time-format';

const origin = 'https://charts.example';
function options(resolveData: VegaDataResolver, signal = new AbortController().signal) {
  return { resolveData, signal, allowedOrigins: [origin], baseUrl: `${origin}/app/` };
}

describe('parseVegaDataValues', () => {
  it('purely parses declared scalars and local/UTC custom dates before any transforms', () => {
    const data: VegaLiteData = {
      values: [{ n: '4.5', b: '0', s: 17, d: '2026-03-04', u: '04/03/2026', bad: 'wrong' }],
      format: {
        parse: { n: 'number', b: 'boolean', s: 'string', d: "date:'%Y-%m-%d'", u: 'utc:"%d/%m/%Y"', bad: 'date' },
      },
    };
    Object.freeze(data.values![0]);
    Object.freeze(data);
    expect(parseVegaDataValues(data)).toEqual([
      {
        n: 4.5,
        b: false,
        s: '17',
        d: timeParse('%Y-%m-%d')('2026-03-04'),
        u: utcParse('%d/%m/%Y')('04/03/2026'),
        bad: null,
      },
    ]);
    expect(data.values![0].n).toBe('4.5');
  });

  it('uses safe Vega field paths for JSON properties and nested parse fields', () => {
    const data = {
      values: '{"response":{"rows":[{"nested":{"n":"2"},"a.b":"3"}]}}',
      format: { type: 'json', property: 'response["rows"]', parse: { 'nested.n': 'number', 'a\\.b': 'number' } },
    };
    expect(parseVegaDataValues(data as unknown as VegaLiteData)).toEqual([{ nested: { n: 2 }, 'a.b': 3 }]);
  });

  it('uses descriptor-only array, field, parse and Date reads, including prototype-shaped keys', () => {
    const getter = jest.fn(() => '9');
    const hook = jest.fn(() => 0);
    const date = new Date('2026-01-02');
    Object.defineProperty(date, 'getTime', { get: getter });
    date.valueOf = hook;
    const row = Object.defineProperty(JSON.parse('{"__proto__":"2","nested":{}}'), 'hidden', {
      enumerable: true,
      get: getter,
    });
    row.date = date;
    Object.defineProperty(row.nested, 'n', { enumerable: true, get: getter });
    const values = [row];
    Object.defineProperty(values, '1', { enumerable: true, get: getter });
    const parse = Object.defineProperty({ date: 'date', __proto__: 'number' }, 'hidden', {
      enumerable: true,
      get: getter,
    });
    Object.defineProperty(parse, '__proto__', { value: 'number', enumerable: true });
    const rows = parseVegaDataValues({ values, format: { parse } });
    expect(rows).toHaveLength(1);
    expect(Object.getOwnPropertyDescriptor(rows[0], '__proto__')?.value).toBe(2);
    expect(rows[0].date).toEqual(new Date('2026-01-02'));
    expect(rows[0].date).not.toBe(date);
    expect(Object.getPrototypeOf(rows[0])).toBe(Object.prototype);
    expect(getter).not.toHaveBeenCalled();
    expect(hook).not.toHaveBeenCalled();
  });

  it.each(['date:', "utc:'%Y", 'date:%J', 'mystery'])(
    'rejects invalid declared parse syntax even on empty records: %s',
    type => {
      expect(() => parseVegaDataValues({ values: [], format: { parse: { d: type } } })).toThrow(/parse|format/i);
    },
  );

  it('bounds rows, text and parsing work, including sparse arrays, before allocating output', () => {
    expect(() => parseVegaDataValues({ values: [{ n: '1' }, { n: '2' }] }, { maxRows: 1 })).toThrow(/row.*limit/i);
    expect(() => parseVegaDataValues({ values: '[{"n":1}]' } as unknown as VegaLiteData, { maxTextLength: 3 })).toThrow(
      /text.*limit/i,
    );
    expect(() =>
      parseVegaDataValues({ values: [{ n: '123456789' }], format: { parse: { n: 'number' } } }, { maxWork: 4 }),
    ).toThrow(/work.*limit/i);
    const sparse = new Array(1000001);
    expect(() => parseVegaDataValues({ values: sparse })).toThrow(/row.*limit/i);
  });

  it('never resolves a URL or a named source and rejects malformed/cyclic inline data', () => {
    expect(() => parseVegaDataValues({ url: `${origin}/data.json` })).toThrow(/unresolved/i);
    expect(() => parseVegaDataValues({ name: 'table' })).toThrow(/unresolved/i);
    const row: Record<string, unknown> = {};
    row.self = row;
    expect(() => parseVegaDataValues({ values: [row] })).toThrow(/cyclic/i);
    expect(() => parseVegaDataValues({ values: [new Date()] } as unknown as VegaLiteData)).toThrow(/record/i);
  });

  it('accepts d3 ISO week-year date directives and rejects invalid limits', () => {
    expect(
      parseVegaDataValues({ values: [{ when: '2026-W01-1' }], format: { parse: { when: "utc:'%G-W%V-%u'" } } }),
    ).toEqual([{ when: utcParse('%G-W%V-%u')('2026-W01-1') }]);
    expect(() => parseVegaDataValues({ values: [] }, { maxRows: NaN })).toThrow(/budget|limit/i);
  });
});

describe('resolveVegaLiteResources', () => {
  it('uses the pure parser for custom-date CSV returned by the host', async () => {
    const result = await resolveVegaLiteResources(
      {
        data: {
          url: 'a.csv',
          format: {
            parse: { when: "utc:'%d/%m/%Y'" },
          },
        },
      },
      options(async () => 'when\n04/03/2026\nwrong\n'),
    );
    expect(result.data?.values).toEqual([{ when: new Date('2026-03-04') }, { when: null }]);
  });

  it('enforces host payload row/text/work budgets and cumulative work across resources', async () => {
    await expect(
      resolveVegaLiteResources(
        { data: { url: 'a.json' } },
        {
          ...options(async () => [{ n: 1 }, { n: 2 }]),
          maxRows: 1,
        },
      ),
    ).rejects.toThrow(/row.*limit/i);
    await expect(
      resolveVegaLiteResources(
        { data: { url: 'a.csv' } },
        {
          ...options(async () => 'n\n123456789\n'),
          maxTextLength: 3,
        },
      ),
    ).rejects.toThrow(/text.*limit/i);
    await expect(
      resolveVegaLiteResources(
        { data: { url: 'a.json' } },
        {
          ...options(async () => [{ n: '123456789' }]),
          maxWork: 8,
        },
      ),
    ).rejects.toThrow(/work.*limit/i);
  });

  it('rejects an invalid declared URL or format before the host callback', async () => {
    const host = jest.fn(async () => []);
    await expect(
      resolveVegaLiteResources({ data: { url: 7 } } as unknown as VegaLiteSpec, options(host)),
    ).rejects.toThrow(/string/i);
    await expect(
      resolveVegaLiteResources({ data: { url: 'a.json', format: { parse: { n: 'magic' } } } }, options(host)),
    ).rejects.toThrow(/parse/i);
    expect(host).not.toHaveBeenCalled();
  });

  it('selects escaped/bracketed JSON resource properties without invoking accessors', async () => {
    const result = await resolveVegaLiteResources(
      { data: { url: 'a.json', format: { property: 'response["a.b"]' } } },
      options(async () => ({ response: { 'a.b': [{ n: 2 }] } })),
    );
    expect(result.data?.values).toEqual([{ n: 2 }]);
  });

  it('does not treat composition/domain arrays as rows when maxRows is small', async () => {
    const result = await resolveVegaLiteResources(
      {
        hconcat: [
          {
            data: { url: 'a.json' },
            mark: 'point',
            encoding: { x: { field: 'n', type: 'quantitative', scale: { domain: [0, 10] } } },
          },
          { data: { url: 'b.json' }, mark: 'point' },
        ],
      },
      { ...options(async () => [{ n: 1 }]), maxRows: 1 },
    );
    expect(result.hconcat?.map(child => child.data?.values)).toEqual([[{ n: 1 }], [{ n: 1 }]]);
  });

  it('charges a single cumulative work budget across separately resolved host payloads', async () => {
    const payload = [{ text: 'x'.repeat(600) }];
    const single = await resolveVegaLiteResources(
      { data: { url: 'a.json' } },
      { ...options(async () => payload), maxWork: 1500 },
    );
    expect(single.data?.values).toEqual(payload);
    await expect(
      resolveVegaLiteResources(
        { hconcat: [{ data: { url: 'a.json' } }, { data: { url: 'b.json' } }] },
        { ...options(async () => payload), maxWork: 1500 },
      ),
    ).rejects.toThrow(/work.*limit/i);
  });
  it('calls only the supplied host resolver and returns a cloned inline spec', async () => {
    const spec: VegaLiteSpec = { mark: 'point', data: { url: `${origin}/data.json`, format: { type: 'json' } } };
    Object.freeze(spec.data);
    Object.freeze(spec);
    const host = jest.fn(async () => '[{"x":1}]');
    const config = options(host);
    const resolved = await resolveVegaLiteResources(spec, config);
    expect(host).toHaveBeenCalledTimes(1);
    expect(host).toHaveBeenCalledWith({ url: `${origin}/data.json`, signal: config.signal, format: { type: 'json' } });
    expect(resolved).toEqual({ mark: 'point', data: { values: [{ x: 1 }] } });
    expect(spec.data?.url).toBe(`${origin}/data.json`);
  });

  it('recursively resolves nested compositions, layers and lookup.from.data with per-request deduplication', async () => {
    const spec = {
      hconcat: [
        { data: { url: 'same.json' }, mark: 'point' },
        {
          vconcat: [
            {
              layer: [
                {
                  mark: 'line',
                  data: { url: 'same.json' },
                  transform: [{ lookup: 'id', from: { data: { url: 'lookup.json' }, key: 'id' } }],
                },
              ],
            },
          ],
        },
        { facet: { field: 'g' }, spec: { repeat: ['x'], spec: { mark: 'point', data: { url: 'same.json' } } } },
      ],
      datasets: { named: [{ x: 9 }] },
    } as unknown as VegaLiteSpec;
    const host = jest.fn(async () => [{ id: 1 }]);
    const resolved = await resolveVegaLiteResources(spec, options(host));
    expect(host.mock.calls).toHaveLength(2);
    expect(resolved.hconcat?.[0].data?.values).toEqual([{ id: 1 }]);
    expect(resolved.hconcat?.[1].vconcat?.[0].layer?.[0].transform?.[0]).toEqual({
      lookup: 'id',
      from: { data: { values: [{ id: 1 }] }, key: 'id' },
    });
    resolved.hconcat![0].data!.values![0].id = 2;
    expect(resolved.hconcat?.[1].vconcat?.[0].layer?.[0].data?.values).toEqual([{ id: 1 }]);
    expect((resolved as unknown as Record<string, unknown>).datasets).toEqual({ named: [{ x: 9 }] });
  });

  it('requires allowlisted origins for absolute URLs and a base URL for relative references', async () => {
    const host = jest.fn(async () => []);
    const signal = new AbortController().signal;
    await expect(
      resolveVegaLiteResources({ data: { url: `${origin}/a` } }, { resolveData: host, signal }),
    ).rejects.toThrow(/origin|allowlist/i);
    await expect(resolveVegaLiteResources({ data: { url: 'a.json' } }, { resolveData: host, signal })).rejects.toThrow(
      /baseUrl/i,
    );
    const resolved = await resolveVegaLiteResources(
      { data: { url: '../a.json' } },
      {
        resolveData: host,
        signal,
        baseUrl: `${origin}/app/`,
      },
    );
    expect(resolved.data?.values).toEqual([]);
    expect(host).toHaveBeenCalledWith({ url: `${origin}/a.json`, signal, format: undefined });
  });

  it.each([
    // eslint-disable-next-line no-script-url -- Deliberately hostile URL tests rejection; it is never executed.
    'javascript:alert(1)',
    'data:text/csv,x',
    'file:///secret',
    'vbscript:evil',
    'ftp://charts.example/a',
    'https://user:secret@charts.example/a',
    'https://charts.example.evil/a',
    '//evil.example/a',
    'https://charts.example:444/a',
    'https://charts.example\\@evil.example/a',
  ])('denies unsafe or unapproved URL %s before any host invocation', async url => {
    const host = jest.fn(async () => []);
    await expect(resolveVegaLiteResources({ data: { url } }, options(host))).rejects.toThrow();
    expect(host).not.toHaveBeenCalled();
  });

  it('validates returned redirect metadata before accepting values', async () => {
    const host = jest.fn(async () => ({ values: [{ x: 1 }], url: 'https://evil.example/redirect' }));
    await expect(resolveVegaLiteResources({ data: { url: `${origin}/a` } }, options(host))).rejects.toThrow(
      /origin|allowlist/i,
    );
    const approved = await resolveVegaLiteResources(
      { data: { url: `${origin}/a` } },
      options(async () => ({
        values: [{ x: 1 }],
        url: `${origin}/redirect`,
      })),
    );
    expect(approved.data?.values).toEqual([{ x: 1 }]);
  });

  it('aborts before invoking a host and after a pending host returns', async () => {
    const controller = new AbortController();
    controller.abort();
    const host = jest.fn(async () => []);
    await expect(
      resolveVegaLiteResources({ data: { url: `${origin}/a` } }, options(host, controller.signal)),
    ).rejects.toMatchObject({ name: 'AbortError' });
    expect(host).not.toHaveBeenCalled();
    const pendingController = new AbortController();
    const abortingHost = jest.fn(async request => {
      expect(request.signal).toBe(pendingController.signal);
      pendingController.abort();
      return [{ x: 1 }];
    });
    await expect(
      resolveVegaLiteResources({ data: { url: `${origin}/a` } }, options(abortingHost, pendingController.signal)),
    ).rejects.toMatchObject({ name: 'AbortError' });
  });

  it('rejects promptly when a host ignores an abort signal', async () => {
    const controller = new AbortController();
    const promise = resolveVegaLiteResources(
      { data: { url: `${origin}/a` } },
      options(async () => {
        controller.abort();
        return new Promise<unknown>(() => undefined);
      }, controller.signal),
    );
    await expect(promise).rejects.toMatchObject({ name: 'AbortError' });
  });

  it('propagates offline host errors without fallback or input mutation', async () => {
    const spec = { data: { url: `${origin}/offline` } };
    const failure = new Error('Offline');
    await expect(
      resolveVegaLiteResources(
        spec,
        options(async () => {
          throw failure;
        }),
      ),
    ).rejects.toBe(failure);
    expect(spec).toEqual({ data: { url: `${origin}/offline` } });
  });

  it('parses escaped CSV, quoted newlines, CRLF and explicit number/boolean/date fields', async () => {
    const spec: VegaLiteSpec = {
      data: {
        url: `${origin}/a.csv`,
        format: {
          type: 'csv',
          parse: { amount: 'number', active: 'boolean', date: 'date' },
        },
      },
    };
    const text =
      '\uFEFFlabel,amount,active,date\r\n"A, ""quoted""\nline",2.5,true,2026-01-02T00:00:00Z\r\nB,,false,\r\n';
    const resolved = await resolveVegaLiteResources(
      spec,
      options(async () => text),
    );
    expect(resolved.data?.values).toEqual([
      { label: 'A, "quoted"\nline', amount: 2.5, active: true, date: new Date('2026-01-02T00:00:00Z') },
      { label: 'B', amount: null, active: false, date: null },
    ]);
  });

  it('parses TSV and JSON format.property using own nested fields', async () => {
    const tsv = await resolveVegaLiteResources(
      { data: { url: 'a.tsv', format: { type: 'tsv' } } },
      options(async () => 'name\tvalue\nA\t"x\ty"\n'),
    );
    expect(tsv.data?.values).toEqual([{ name: 'A', value: 'x\ty' }]);
    const json = await resolveVegaLiteResources(
      {
        data: {
          url: 'a.json',
          format: {
            type: 'json',
            property: 'response.rows',
            parse: { n: 'number' },
          },
        },
      } as unknown as VegaLiteSpec,
      options(async () => '{"response":{"rows":[{"n":"4"}]}}'),
    );
    expect(json.data?.values).toEqual([{ n: 4 }]);
  });

  it('keeps CSV strings unless explicit parsing is requested and safely retains __proto__ columns', async () => {
    const result = await resolveVegaLiteResources(
      { data: { url: 'a.csv', format: { type: 'csv' } } },
      options(async () => '__proto__,constructor,n\nowned,safe,001\n'),
    );
    const row = result.data!.values![0];
    expect(Object.prototype.hasOwnProperty.call(row, '__proto__')).toBe(true);
    expect(Object.getOwnPropertyDescriptor(row, '__proto__')?.value).toBe('owned');
    expect(row.constructor).toBe('safe');
    expect(row.n).toBe('001');
    expect(Object.getPrototypeOf(row)).toBe(Object.prototype);
  });

  it.each(['a,b\n"unterminated,1', 'a,a\n1,2', 'a,b\n1,2,3', 'a,b\n"x"junk,2'])(
    'rejects malformed CSV %s rather than inventing records',
    async text => {
      await expect(
        resolveVegaLiteResources(
          { data: { url: 'a.csv', format: { type: 'csv' } } },
          options(async () => text),
        ),
      ).rejects.toThrow(/CSV|delimited|column|header/i);
    },
  );

  it.each([{}, [1], [null], 'not json'])('rejects a non-record resource payload', async payload => {
    await expect(
      resolveVegaLiteResources(
        { data: { url: 'a.json' } },
        options(async () => payload),
      ),
    ).rejects.toThrow();
  });

  it('does not share caches across requests or conflate differently parsed uses of the same URL', async () => {
    const host = jest.fn(async () => 'n\n2\n');
    const spec: VegaLiteSpec = {
      hconcat: [
        { data: { url: 'a.csv', format: { type: 'csv', parse: { n: 'number' } } } },
        { data: { url: 'a.csv', format: { type: 'csv' } } },
      ],
    };
    const first = await resolveVegaLiteResources(spec, options(host));
    expect(first.hconcat?.[0].data?.values).toEqual([{ n: 2 }]);
    expect(first.hconcat?.[1].data?.values).toEqual([{ n: '2' }]);
    expect(host).toHaveBeenCalledTimes(2);
    await resolveVegaLiteResources(spec, options(host));
    expect(host).toHaveBeenCalledTimes(4);
  });

  it('leaves inline data and named dataset references alone and clones Dates', async () => {
    const host = jest.fn(async () => []);
    const date = new Date('2026-01-01');
    const spec: VegaLiteSpec = { hconcat: [{ data: { name: 'table' } }, { data: { values: [{ date }] } }] };
    const resolved = await resolveVegaLiteResources(spec, options(host));
    expect(host).not.toHaveBeenCalled();
    expect(resolved.hconcat?.[0].data).toEqual({ name: 'table' });
    expect(resolved.hconcat?.[1].data?.values?.[0].date).toEqual(date);
    expect(resolved.hconcat?.[1].data?.values?.[0].date).not.toBe(date);
  });

  it('never invokes input or response accessors and drops callable resource values', async () => {
    const getter = jest.fn(() => 'https://evil.example/a');
    const callable = jest.fn();
    const data = Object.defineProperty({ values: [{ n: 1, callable }] }, 'url', { enumerable: true, get: getter });
    const host = jest.fn(async () => []);
    const result = await resolveVegaLiteResources({ data }, options(host));
    expect(result.data?.values).toEqual([{ n: 1 }]);
    expect(getter).not.toHaveBeenCalled();
    expect(callable).not.toHaveBeenCalled();
    expect(host).not.toHaveBeenCalled();
  });

  it('rejects unsafe bases and cyclic inputs before the host callback', async () => {
    const host = jest.fn(async () => []);
    await expect(
      resolveVegaLiteResources(
        { data: { url: 'a.json' } },
        {
          ...options(host),
          baseUrl: 'file:///private/',
        },
      ),
    ).rejects.toThrow(/HTTP/i);
    const spec: VegaLiteSpec = { hconcat: [] };
    spec.hconcat!.push(spec);
    await expect(resolveVegaLiteResources(spec, options(host))).rejects.toThrow(/cyclic/i);
    expect(host).not.toHaveBeenCalled();
  });
});
