import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './text-input.definition-async.js';
import { TextInput } from './text-input.js';

RenderableFASTElement(TextInput).defineAsync(definition);
