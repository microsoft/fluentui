import * as path from 'path';

import { getStateDataAttributes } from './getStateDataAttributes';

const FIXTURES_ROOT = path.join(__dirname, '__fixtures__/state-data-attributes');

describe('getStateDataAttributes', () => {
  it('extracts data attributes from an exported component state', () => {
    const result = getStateDataAttributes({ packageRoot: path.join(FIXTURES_ROOT, 'valid') });

    expect(Object.keys(result)).toEqual(['Button']);
    expect(Object.keys(result.Button)).toEqual(['data-disabled']);
    expect(result.Button['data-disabled']).toMatchObject({
      table: {
        category: 'Data attributes',
        type: { summary: 'boolean' },
      },
      control: false,
    });
  });

  it('throws an actionable error when package exports are missing', () => {
    expect(() => getStateDataAttributes({ packageRoot: path.join(FIXTURES_ROOT, 'invalid') })).toThrow(
      /missing an "exports" object/,
    );
  });
});
