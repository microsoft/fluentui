import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './drawer.definition-async.js';
import { Drawer } from './drawer.js';

RenderableFASTElement(Drawer).defineAsync(definition);
