import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './option.definition-async.js';
import { DropdownOption } from './option.js';

RenderableFASTElement(DropdownOption).defineAsync(definition);
