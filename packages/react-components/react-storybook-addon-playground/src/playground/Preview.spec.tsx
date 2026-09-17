import { PREVIEW_SANDBOX } from './Preview';

describe('Preview sandbox permissions', () => {
  it('keeps evaluated user code in an opaque-origin iframe', () => {
    expect(PREVIEW_SANDBOX.split(/\s+/)).toEqual(['allow-scripts']);
    expect(PREVIEW_SANDBOX.split(/\s+/)).not.toContain('allow-same-origin');
  });
});
