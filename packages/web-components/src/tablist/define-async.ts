import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './tablist.definition-async.js';
import { Tablist } from './tablist.js';

RenderableFASTElement(Tablist).defineAsync(definition);
