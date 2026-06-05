import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './tooltip.definition-async.js';
import { Tooltip } from './tooltip.js';

RenderableFASTElement(Tooltip).defineAsync(definition);
