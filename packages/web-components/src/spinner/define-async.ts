import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './spinner.definition-async.js';
import { Spinner } from './spinner.js';

RenderableFASTElement(Spinner).defineAsync(definition);
