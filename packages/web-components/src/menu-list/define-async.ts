import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './menu-list.definition-async.js';
import { MenuList } from './menu-list.js';

RenderableFASTElement(MenuList).defineAsync(definition);
