'use client';

import * as React from 'react';
import { createTheme, DefaultPalette } from '@fluentui/theme';
import { webLightTheme } from '@fluentui/react-theme';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { black, white, grey, blackAlpha, whiteAlpha } from '../../../../packages/tokens/src/global/colors';
import * as sharedColors from '../../../../packages/tokens/src/global/colors';
import { brandWeb } from '../../../../packages/tokens/src/global/brandColors';

const semanticColors = createTheme().semanticColors;
const globalColors: Record<string, unknown> = { grey, blackAlpha, whiteAlpha, sharedColors, brand: brandWeb };

function textOf(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return textOf(node.props.children);
  }
  return React.Children.toArray(node).map(textOf).join('');
}

function colorOf(name: string, column: number): string | undefined {
  if (column === 0) {
    return (
      (DefaultPalette as unknown as Record<string, string>)[name] ??
      (semanticColors as unknown as Record<string, string>)[name]
    );
  }
  if (name === 'black') {
    return black;
  }
  if (name === 'white') {
    return white;
  }
  if (name in webLightTheme) {
    return String(webLightTheme[name as keyof typeof webLightTheme]);
  }
  const parts = name.replace(/\[(\d+)\]/g, '.$1').split('.');
  let value: unknown = globalColors;
  for (const part of parts) {
    if (!value || typeof value !== 'object' || !Object.prototype.hasOwnProperty.call(value, part)) {
      return undefined;
    }
    value = (value as Record<string, unknown>)[part];
  }
  return typeof value === 'string' ? value : undefined;
}

/** Add comparison swatches to the authored mapping tables; prose and Markdown exports stay authoritative. */
export const ColorMappingTable: ForwardRefComponent<React.ComponentProps<'table'>> = React.forwardRef(
  ({ children, ...props }, ref) => {
    function decorate(node: React.ReactNode): React.ReactNode {
      if (!React.isValidElement<React.ComponentProps<'tr'>>(node)) {
        return node;
      }
      if (node.type === 'tr') {
        return React.cloneElement(
          node,
          {},
          React.Children.map(node.props.children, (cell, column) => {
            if (!React.isValidElement<React.ComponentProps<'td'>>(cell) || cell.type !== 'td' || column > 1) {
              return cell;
            }
            const color = colorOf(textOf(cell.props.children).trim(), column);
            if (!color) {
              return cell;
            }
            return React.cloneElement(
              cell,
              {},
              <>
                <span
                  aria-hidden="true"
                  data-color-swatch=""
                  className="block h-3xl min-w-control rounded-control border-thin border-stroke mb-sm forced-color-adjust-none"
                  style={{ backgroundColor: color }}
                />
                {cell.props.children}
                <span className="block font-mono text-small text-muted mt-xs">{color}</span>
              </>,
            );
          }),
        );
      }
      return React.cloneElement(node, {}, React.Children.map(node.props.children, decorate));
    }
    return (
      <div className="overflow-x-auto">
        <table {...props} ref={ref}>
          {React.Children.map(children, decorate)}
        </table>
      </div>
    );
  },
);
ColorMappingTable.displayName = 'ColorMappingTable';
