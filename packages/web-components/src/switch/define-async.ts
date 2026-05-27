import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './switch.definition-async.js';
import { Switch } from './switch.js';

RenderableFASTElement(Switch).defineAsync(definition);
