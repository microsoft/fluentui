import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './slider.definition-async.js';
import { Slider } from './slider.js';

RenderableFASTElement(Slider).defineAsync(definition);
