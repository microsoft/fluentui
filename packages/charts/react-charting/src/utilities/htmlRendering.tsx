import * as React from 'react';
import { parseHtmlDocument } from './htmlSanitization';

const SUPPORTED_HTML_TAGS = new Set([
  'a',
  'abbr',
  'b',
  'br',
  'code',
  'div',
  'em',
  'i',
  'li',
  'mark',
  'ol',
  'p',
  'pre',
  's',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'u',
  'ul',
]);

const ELEMENT_NODE_TYPE = 1; // DOM Node.ELEMENT_NODE
const TEXT_NODE_TYPE = 3; // DOM Node.TEXT_NODE

const hyphenToCamelCase = (property: string): string =>
  property
    .trim()
    .replace(/^-ms-/, 'ms-')
    .replace(/-([a-z0-9])/gi, (_, char: string) => char.toUpperCase());

const parseStyleAttribute = (styleValue: string): React.CSSProperties => {
  const style: React.CSSProperties = {};

  styleValue
    .split(';')
    .map(rule => rule.trim())
    .filter(Boolean)
    .forEach(rule => {
      const colonIndex = rule.indexOf(':');
      if (colonIndex === -1) {
        return;
      }
      const property = hyphenToCamelCase(rule.slice(0, colonIndex));
      const value = rule.slice(colonIndex + 1).trim();

      if (property) {
        (style as Record<string, string>)[property] = value;
      }
    });

  return style;
};

const isSafeHref = (href: string): boolean => {
  const trimmed = href.trim().toLowerCase();
  if (!trimmed) {
    return false;
  }

  if (trimmed.startsWith('javascript:')) {
    return false;
  }

  return (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('/')
  );
};

const convertDomNodesToReact = (nodes: ChildNode[], keyPrefix: string): React.ReactNode[] =>
  nodes.flatMap((node, index) => {
    const key = `${keyPrefix}-${index}`;

    if (node.nodeType === TEXT_NODE_TYPE) {
      const textContent = node.textContent;
      return textContent ? [<React.Fragment key={key}>{textContent}</React.Fragment>] : [];
    }

    if (node.nodeType === ELEMENT_NODE_TYPE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();

      const children = convertDomNodesToReact(Array.from(element.childNodes), key);

      if (!SUPPORTED_HTML_TAGS.has(tagName)) {
        return children;
      }

      const props: Record<string, unknown> = { key };

      element.getAttributeNames().forEach(attributeName => {
        if (/^on/i.test(attributeName)) {
          return;
        }

        const attributeValue = element.getAttribute(attributeName);
        if (attributeValue === null) {
          return;
        }

        if (attributeName === 'class') {
          props.className = attributeValue;
          return;
        }

        if (attributeName === 'style') {
          props.style = parseStyleAttribute(attributeValue);
          return;
        }

        if (attributeName === 'href') {
          if (isSafeHref(attributeValue)) {
            props.href = attributeValue;
          }
          return;
        }

        if (attributeName === 'target') {
          props.target = attributeValue;
          if (attributeValue === '_blank' && !element.getAttribute('rel')) {
            props.rel = 'noopener noreferrer';
          }
          return;
        }

        if (attributeName === 'rel') {
          props.rel = attributeValue;
          return;
        }

        if (attributeName === 'tabindex') {
          props.tabIndex = Number.isNaN(Number(attributeValue)) ? undefined : Number(attributeValue);
          return;
        }

        if (attributeName.startsWith('data-') || attributeName.startsWith('aria-')) {
          props[attributeName] = attributeValue;
          return;
        }

        props[attributeName] = attributeValue;
      });

      return [React.createElement(tagName, props, children.length > 0 ? children : undefined)];
    }

    return [];
  });

export const convertHtmlToReactNodes = (html: string, keyPrefix = 'html'): React.ReactNode => {
  if (!html) {
    return null;
  }

  if (typeof window === 'undefined' || !window.document) {
    return html;
  }

  const parsedDocument = parseHtmlDocument(html, window.document);
  if (!parsedDocument?.body) {
    return html;
  }

  const nodes = convertDomNodesToReact(Array.from(parsedDocument.body.childNodes), keyPrefix);
  return nodes.length > 1 ? nodes : nodes[0] ?? null;
};
