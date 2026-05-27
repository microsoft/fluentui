import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './textarea.definition-async.js';
import { TextArea } from './textarea.js';

RenderableFASTElement(TextArea).defineAsync(definition);
