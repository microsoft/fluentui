import { FileIconType } from './FileIconType';
import type { FileIconTypeInput } from './FileIconType';

let allFileTypeIconValues: FileIconType | undefined;

function validateFileIconTypeValues(allowedFileTypeIconValues: FileIconTypeInput | undefined): void {
  // The purpose of this function is to verify that the below call compiles,
  // which may only occur if every enum value matches its key.
}

describe('Validate Icon Type Values', () => {
  it('should validate the enum keys and values', () => {
    validateFileIconTypeValues(allFileTypeIconValues);
  });
});
