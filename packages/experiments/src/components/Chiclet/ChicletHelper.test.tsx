import { findIcon } from '../../utilities/chicletHelper';

describe('ChicletHelper', () => {
  it("returns a docx icon from a input that contains '.docx'", () => {
    const extension = findIcon('Test.docx');

    expect(extension).toEqual('docx');
  });

  it('returns undefined when no extension is provided', () => {
    const extension = findIcon('Test');

    expect(extension).toBeUndefined();
  });
});
