import { IRectangle } from '@fluentui/utilities';
import { IPage } from '../List.types';

export type RenderParams = {
  visibleRect: IRectangle | undefined;
  allowedRect: IRectangle | null;
  requiredRect: IRectangle | null;
  materializedRect: IRectangle | null;
  surfaceRect: IRectangle | undefined;
  totalListHeight: number;
  pages: IPage[] | undefined;
  scrollTop: number;
  estimatedLine: number;
  scrollY: number;
};

const RENDER_COLOR_VISIBLE_RECT = 'hotpink';
const RENDER_COLOR_ALLOWED_RECT = 'green';
const RENDER_COLOR_REQUIRED_RECT = 'blue';
const RENDER_COLOR_MATERIALIZED_RECT = 'red';
const RENDER_COLOR_SURFACE_RECT = 'black';
const RENDER_COLOR_PAGE = 'purple';
const RENDER_COLOR_SPACER_PAGE = 'orange';

export class ListDebugRenderer {
  private _wrapper: HTMLElement;
  private _renderer: CanvasRenderingContext2D;
  private _doc: Document;

  constructor(doc?: Document) {
    // eslint-disable-next-line no-restricted-globals
    this._doc = doc || document;
    this._wrapper = this._doc.createElement('div');
    this._wrapper.style.position = 'fixed';
    this._wrapper.style.top = '0';
    this._wrapper.style.right = '0';
    this._wrapper.style.width = '300px';
    this._wrapper.style.bottom = '0';

    const canvas = this._doc.createElement('canvas');
    this._renderer = canvas.getContext('2d') as CanvasRenderingContext2D;

    this._wrapper.appendChild(canvas);

    this._doc.body.appendChild(this._wrapper);
  }

  public dispose(): void {
    this._doc.body.removeChild(this._wrapper);
  }

  public render(params: RenderParams): void {
    const {
      visibleRect,
      allowedRect,
      requiredRect,
      materializedRect,
      surfaceRect,
      totalListHeight,
      pages,
      scrollTop,
      estimatedLine,
      scrollY,
    } = params;

    if (!surfaceRect) {
      return;
    }

    const debugRendererHeight = this._wrapper.clientHeight;
    const scaleFactor = debugRendererHeight / totalListHeight;

    this._renderer.canvas.width = this._wrapper.clientWidth;
    this._renderer.canvas.height = debugRendererHeight;
    this._renderer.fillStyle = 'white';
    this._renderer.fillRect(0, 0, this._wrapper.clientWidth, this._wrapper.clientHeight);

    this._renderRect(
      { left: 0, top: 0, height: totalListHeight, width: surfaceRect.width },
      RENDER_COLOR_SURFACE_RECT,
      scaleFactor,
    );

    if (visibleRect) {
      this._renderRect(visibleRect, RENDER_COLOR_VISIBLE_RECT, scaleFactor, 10);
    }

    if (allowedRect) {
      this._renderRect(allowedRect, RENDER_COLOR_ALLOWED_RECT, scaleFactor, 20);
    }

    if (requiredRect) {
      this._renderRect(requiredRect, RENDER_COLOR_REQUIRED_RECT, scaleFactor, 30);
    }

    if (materializedRect) {
      this._renderRect(materializedRect, RENDER_COLOR_MATERIALIZED_RECT, scaleFactor, 40);
    }

    if (pages) {
      let top = 0;
      pages.forEach((page, i) => {
        const isSpacer = page.key.startsWith('spacer');
        const t = isSpacer ? top : page.top;
        this._renderPage(
          page,
          isSpacer ? RENDER_COLOR_SPACER_PAGE : RENDER_COLOR_PAGE,
          scaleFactor,
          surfaceRect.left,
          surfaceRect.width,
          t,
          50 + i * 10,
        );
        top += page.height;
      });
    }

    this._renderLine(scrollTop, 'red', surfaceRect.width);
    this._renderLine(estimatedLine, 'black', surfaceRect.width);
    this._renderLine(scrollY, 'yellow', surfaceRect.width);
  }

  private _renderRect(rect: IRectangle, color: string, scaleFactor: number, offset: number = 0): void {
    this._renderer.strokeStyle = color;
    this._renderer.strokeRect(
      rect.left * scaleFactor + offset,
      rect.top * scaleFactor,
      rect.width * scaleFactor + offset,
      rect.height * scaleFactor,
    );
  }

  private _renderPage(
    page: IPage,
    color: string,
    scaleFactor: number,
    left: number,
    width: number,
    top: number,
    offset: number = 0,
  ): void {
    this._renderer.strokeStyle = color;
    this._renderer.strokeRect(
      left * scaleFactor + offset,
      top * scaleFactor,
      width * scaleFactor + offset,
      page.height * scaleFactor,
    );
  }

  private _renderLine(y: number, color: string, width: number): void {
    this._renderer.strokeStyle = color;
    this._renderer.beginPath();
    this._renderer.moveTo(0, y);
    this._renderer.lineTo(width, y);
    this._renderer.stroke();
  }
}
