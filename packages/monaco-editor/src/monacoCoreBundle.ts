// Import this file to include the main editor features and only TS language features (not other languages).
// Calling addMonacoWebpackConfig with includeAllLanguages=false will automatically point all
// @fluentui/monaco-editor root imports here.

// Main editor features
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore because monaco doesn't provide typings for this file
export * from '../esm/vs/editor/edcore.main.js';

// TS language features are registered as a side effect of these imports
import '../esm/vs/basic-languages/typescript/typescript.contribution.js';
import '../esm/vs/basic-languages/javascript/javascript.contribution.js';
import '../esm/vs/language/typescript/monaco.contribution.js';

// If the consumer has set a MonacoConfig global, this will set up Monaco's required
// MonacoEnvironment globals (otherwise the consumer can manually call this function later)
import { configureEnvironment } from './configureEnvironment';
configureEnvironment();
