import * as React from 'react';
import { renderToString } from 'react-dom/server';

export class Entity {
  public static EntityName: string;

  protected value: string;
  protected editable: boolean = false;
  protected element: HTMLElement | null = null;
  protected id: string;

  public static parse(node: HTMLElement): Entity | null {
    throw new Error('Method not implemented.');
  }

  constructor(value: string, id?: string) {
    this.id = id ?? Math.random().toString(36).substr(2, 9);
    this.value = value;
  }

  public render() {
    throw new Error('Method not implemented.');
  }
}

export class TextEntity extends Entity {
  public static entityName = 'TextEntity';

  public static parse(node: HTMLElement): Entity | null {
    const textContent = node.textContent || '';
    const entityId = node.dataset.entityid || '';
    if (textContent.trim() === '') {
      return null;
    } else {
      return new TextEntity(textContent, entityId);
    }
  }

  public static parseNode(node: Node): Entity | null {
    const textContent = node.textContent || '';
    if (textContent.trim() === '') {
      return null;
    } else {
      return new TextEntity(textContent);
    }
  }

  constructor(value: string, id?: string) {
    super(value, id);
    this.editable = true;
  }

  public render() {
    return renderToString(
      <span data-entityid={this.id} data-entityname={TextEntity.entityName}>
        {this.value}
      </span>,
    );
  }
}

export class AtomicEntity extends Entity {
  public static entityName = 'AtomicEntity';

  public static parse(node: HTMLElement): Entity | null {
    const textContent = node.textContent || '';
    const entityId = node.dataset.entityid || '';
    if (textContent.trim() === '') {
      return null;
    } else {
      return new AtomicEntity(textContent, entityId);
    }
  }

  public render() {
    return renderToString(
      <span
        data-entityid={this.id}
        data-entityname={AtomicEntity.entityName}
        contentEditable={false}
        style={{ display: 'inline-block', color: 'blue' }}
      >
        {this.value}
      </span>,
    );
  }
}
