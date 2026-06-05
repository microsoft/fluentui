import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './badge.definition-async.js';
import { Badge } from './badge.js';

RenderableFASTElement(Badge).defineAsync(definition);
