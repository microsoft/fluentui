import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './menu-button.definition-async.js';
import { MenuButton } from './menu-button.js';

RenderableFASTElement(MenuButton).defineAsync(definition);
