import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './listbox.definition-async.js';
import { Listbox } from './listbox.js';

RenderableFASTElement(Listbox).defineAsync(definition);
