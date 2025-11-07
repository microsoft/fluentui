import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { ThemingDesigner } from './components/ThemingDesigner';

initializeIcons();

let _rootDiv: HTMLElement;

function start(): void {
  if (!_rootDiv) {
    _rootDiv = document.createElement('div');
    document.body.appendChild(_rootDiv);
  }
  createRoot(_rootDiv).render(<ThemingDesigner />);
}

// Start the application.
start();
