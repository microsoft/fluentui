import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './checkbox.definition-async.js';
import { Checkbox } from './checkbox.js';

RenderableFASTElement(Checkbox).defineAsync(definition);
