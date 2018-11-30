export * from './classNames/index';
export * from './styles/index';
export * from './utilities/index';
export * from './interfaces/index';
export * from './MergeStyles';
import './version';

// This is temporary and should not be checked in.
// It is used to verify that changing the API file breaks the CI build.
export const TEST_API_EXTRACTOR = 'should break build';
