import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './text.definition-async.js';
import { Text } from './text.js';

RenderableFASTElement(Text).defineAsync(definition);
