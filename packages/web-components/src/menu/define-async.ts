import { RenderableFASTElement } from '@microsoft/fast-html';
import { Menu } from './menu.js';
import { definition } from './menu.definition-async.js';

RenderableFASTElement(Menu).defineAsync(definition);
