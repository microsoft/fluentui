import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './drawer-body.definition-async.js';
import { DrawerBody } from './drawer-body.js';

RenderableFASTElement(DrawerBody).defineAsync(definition);
