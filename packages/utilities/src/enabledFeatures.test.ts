import { isFeatureEnabled } from './enabledFeatures';

describe('isFeatureEnabled', () => {
  it('works in the base case', () => {
    let a = 0;
    let b = 1;
    let c = 1;
    (window as any).FabricConfig = {
      // tslint:disable-line:no-any
      enabledFeatures: {
        'F9168C5E-CEB2-4FAA-B6BF-329BF39FA1E4': true,
        '936DA01F-9ABD-4D9D-80C7-02AF85C822A8': false,
      },
    };

    if (isFeatureEnabled('f9168c5e-ceb2-4faa-b6bf-329bf39fa1e4', 'me', '1/2/3')) {
      a = 1;
    }
    if (isFeatureEnabled('936DA01F-9ABD-4D9D-80C7-02AF85C822A8', 'me', '1/2/3')) {
      b = 0;
    }
    if (isFeatureEnabled('non-existentName', 'me', '1/2/3')) {
      c = 0;
    }

    expect(a).toEqual(1);
    expect(b).toEqual(1);
    expect(c).toEqual(1);
  });

  it('throws when there is no owner or date', () => {
    let a = 1;
    let b = 0;
    let c = 0;

    try {
      if (isFeatureEnabled('f9168c5e-ceb2-4faa-b6bf-329bf39fa1e4', '', '1/2/3')) {
        a = 2;
      }
      a = 3;
    } catch {
      b = 1;
    }

    try {
      if (isFeatureEnabled('936DA01F-9ABD-4D9D-80C7-02AF85C822A8', 'me', '')) {
        a = 4;
      }
      a = 5;
    } catch {
      c = 1;
    }

    expect(a).toEqual(1);
    expect(b).toEqual(1);
    expect(c).toEqual(1);
  });
});
