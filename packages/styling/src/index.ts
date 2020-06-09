export * from './classNames/index';
export * from './styles/index';
export * from './utilities/index';
export * from './interfaces/index';
export * from './MergeStyles';
import './version';

// This file contains logic to initialize default theme.
// Unfortunately we need to ensure this file is always imported when this package is referenced.
import './styles/theme';
