import { isFeatureDisabled } from './disabledFeatures';

describe('isFeatureDisabled', () => {
  it('works', () => {
    let a = 1;
    let b = 0;
    let c = 0;
    (window as any).FabricConfig = {
      // tslint:disable-line:no-any
      disabledFeatures: {
        'F9168C5E-CEB2-4FAA-B6BF-329BF39FA1E4': true,
        '936DA01F-9ABD-4D9D-80C7-02AF85C822A8': false,
      },
    };

    if (!isFeatureDisabled('f9168c5e-ceb2-4faa-b6bf-329bf39fa1e4', 'me', '1/2/3')) {
      a = 2;
    }
    if (!isFeatureDisabled('936DA01F-9ABD-4D9D-80C7-02AF85C822A8', 'me', '1/2/3')) {
      b = 1;
    }

    try {
      // no owner, should throw
      if (!isFeatureDisabled('f9168c5e-ceb2-4faa-b6bf-329bf39fa1e4', '', '1/2/3')) {
        a = 3;
      }
      a = 4;
    } catch {
      c = 1;
    }

    expect(a).toEqual(1);
    expect(b).toEqual(1);
    expect(c).toEqual(1);
  });
});
