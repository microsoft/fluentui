import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './menu.definition-async.js';
import { Menu } from './menu.js';

RenderableFASTElement(Menu).defineAsync(definition);
