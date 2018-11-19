import { FileIconType, FileIconTypeInput } from './FileIconType';

declare const allFileTypeIconValues: FileIconType;

function validateFileIconTypeValues(allowedFileTypeIconValues: FileIconTypeInput): void {
  // The purpose of this function is to verify that the below call compiles,
  // which may only occur if every enum value matches its key.
}

validateFileIconTypeValues(allFileTypeIconValues);
