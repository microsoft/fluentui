import { RemoveRecordIndexSignature } from './types';

describe(`types`, () => {
  describe(`utils`, () => {
    describe(`#RemoveRecordIndexSignature`, () => {
      it(`it should get record shape without index signatures`, () => {
        type RecordWithIndexType = { one: number; two: string; [k: string]: unknown };

        // $ExpectType { one: number; two: string; }
        type Test = RemoveRecordIndexSignature<RecordWithIndexType>;

        // @ts-expect-error - testing types
        const assertion: Test = { one: 1, two: '2', fooBar: true };
        expect(assertion).toBeDefined();
      });
    });
  });
});
