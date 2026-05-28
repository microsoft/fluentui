import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './link.definition-async.js';
import { Link } from './link.js';

RenderableFASTElement(Link).defineAsync(definition);
