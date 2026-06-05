import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './counter-badge.definition-async.js';
import { CounterBadge } from './counter-badge.js';

RenderableFASTElement(CounterBadge).defineAsync(definition);
