// Import this file to include the editor plus features for all built-in languages.
// Calling addMonacoWebpackConfig with includeAllLanguages=true will automatically point all
// @fluentui/monaco-editor root imports here.

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore because monaco doesn't provide typings for this file
export * from '../esm/vs/editor/editor.main.js';

// If the consumer has set a MonacoConfig global, this will set up Monaco's required
// MonacoEnvironment globals (otherwise the consumer can manually call this function later)
import { configureEnvironment } from './configureEnvironment';
configureEnvironment();
