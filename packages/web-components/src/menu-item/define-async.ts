import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './menu-item.definition-async.js';
import { MenuItem } from './menu-item.js';

RenderableFASTElement(MenuItem).defineAsync(definition);
