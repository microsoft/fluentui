import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './dropdown.definition-async.js';
import { Dropdown } from './dropdown.js';

RenderableFASTElement(Dropdown).defineAsync(definition);
