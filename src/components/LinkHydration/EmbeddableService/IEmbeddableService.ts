/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 * @file IEmbeddableService.ts
 */

export interface IEmbeddableUrlMetadata {
  CreatorName?: string;
  DatePublishedAt?: string;
  Description?: string;
  PublisherName?: string;
  Thumbnail?: string;
  ThumbnailHeight?: number;
  ThumbnailWidth?: number;
  Title?: string;
  VideoId?: string;
}

export enum EmbedServiceResponseCode {
  OK = 0,
  EmbedSeriveInternalError,
  NoSupporttedEmbedService,
  GetEmbedCodeError
}

export interface IEmbedServiceResult {
  // Type value : 'photo', 'video', 'link', 'rich', 'unknown';
  Type: string;
  Html: string;
  ResponseCode: EmbedServiceResponseCode;
  ErrorMessage: string;
  EmbedMetadata?: IEmbeddableUrlMetadata;
}

export abstract class IEmbeddableService {
  protected _url: string;

  constructor(url: string) {
    this._url = url;
  }

  public abstract getEmbeddableHtmlCode(): Promise<IEmbedServiceResult>;
}

export default IEmbeddableService;
