import { customElement, html } from '@microsoft/fast-element';
import { Card } from './card';
import { cardStyles as styles } from './card.styles';

/**
 * The Fluent Card component
 *
 *
 * @public
 * @remarks
 * Generates HTML Element: `<fluent-card>`
 */
@customElement({
  name: 'fluent-card',
  template: html`<template role="group"><slot></slot></template>`,
  styles,
})
export class FluentCard extends Card {}
