/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file HTMLEmbed.tsx
 */

import * as React from 'react';
import { KeyCodes } from '../../utilities/KeyCodes';
import {
  IEmbedServiceResult,
  IEmbeddableUrlMetadata,
  EmbedServiceResponseCode } from './EmbeddableService/IEmbeddableService';
import HtmlGenerator, { IHtmlGeneratorProps } from './HtmlGenerator/HtmlGenerator';
import HtmlGeneratorFactory from './HtmlGenerator/HtmlGeneratorFactory';
import styles from './style/HTMLEmbed.module.scss';
import { IHTMLEmbedProps, EmbedCodeType, IHTMLEmbedArea } from './HTMLEmbed.Props';
import { IValidateResult } from './HtmlValidator/HtmlValidator';

export interface IHTMLEmbedState {
  isValidating?: boolean;
  errorMessage?: string;
}

/**
 * A client side webpart to embed some code on a page.
 */
export default class HTMLEmbed extends React.Component<IHTMLEmbedProps, IHTMLEmbedState> {

  private static _defaultWidthHeightScale: number = 1.5;

  private _htmlGenerator: HtmlGenerator;
  private _urlMetadata: IEmbeddableUrlMetadata;
  private _boundingArea: IHTMLEmbedArea;
  private _htmlEmbedDivDom: Element;

  constructor(props: IHTMLEmbedProps) {
    super(props);
    this.state = {
      isValidating: true,
      errorMessage: ''
    };
    if (this.props.boundingArea && this.props.boundingArea.width > 0 && this.props.boundingArea.height > 0) {
      this._boundingArea = this.props.boundingArea;
    }
  }

  public getErrorMessage(): string {
    return this.state.errorMessage;
  }

  public getMetadata(): IEmbeddableUrlMetadata {
    return this._urlMetadata;
  }

  public componentWillMount(): void {
    if (this._boundingArea) {
      this._triggerServiceCall(this.props);
    }
  }

  public componentDidMount(): void {
    if (this._boundingArea || !this._htmlEmbedDivDom) {
      return;
    }

    const htmlEmbedDivDom: HTMLDivElement = (this._htmlEmbedDivDom as HTMLDivElement);
    let width: number = Math.ceil(htmlEmbedDivDom.getBoundingClientRect().width);
    let height: number = Math.ceil(htmlEmbedDivDom.getBoundingClientRect().height);
    if (width <= 0 && height <= 0) {
      this.setState({
        isValidating: false,
        errorMessage: this.props.stringsLoc.htmlEmbedBoundingAreaZero
      } as IHTMLEmbedState);
      return;
    }

    if (width <= 0) {
      width = height * HTMLEmbed._defaultWidthHeightScale;
    }

    if (height <= 0) {
      height = width / HTMLEmbed._defaultWidthHeightScale;
    }

    this._boundingArea = {
      width: width,
      height: height
    };

    this._triggerServiceCall(this.props);
  }

  public componentWillReceiveProps(nextProps: IHTMLEmbedProps): void {
    if (this._boundingArea &&
      (this.props.embeddableService !== nextProps.embeddableService
      || this.props.embedCode.embedCode !== nextProps.embedCode.embedCode) ) {
      this._triggerServiceCall(nextProps);
    }
  }

  /**
   * Main entry point, called by the ClientSideWebPart Manager. Loads the webpart's DOM manipulation.
   * @return {JSX.Element} The filled in react element.
   */
  public render(): JSX.Element {

    return (
      <div
        ref={ (htmlEmbedDivDom) => {
          this._htmlEmbedDivDom = htmlEmbedDivDom;
        } }
      >
        { this.state.isValidating ?
          this._renderLoadingIndicator() : (
            (!this.state.errorMessage && this._htmlGenerator) ? (
              <div
                className={ styles.HTMLEmbed }
                style={ this._htmlGenerator.getMaxWidthStyle() }
              >
                <div
                  role='row'
                  className={ styles.embedCode }
                  tabIndex='0'
                  style={ this._htmlGenerator.getPaddingBottomStyle() }
                  onKeyDown={ this._handleKeyDown.bind(this) }
                  aria-label={ this.props.stringsLoc.htmlEmbedWebPartAriaLabel }
                >
                { this._htmlGenerator.createHtmlElement() }
                </div>
              </div>
            ) :
            this._renderError()
          )
        }
      </div>
      );
  }

  private _handleKeyDown(event: React.KeyboardEvent): void {
    if ((event.keyCode === KeyCodes.enter) || (event.keyCode === KeyCodes.down)) {
        event.preventDefault();
        const iframeDom: HTMLElement = (event.target as HTMLDivElement).firstChild.firstChild as HTMLElement;
        if (iframeDom instanceof HTMLElement) {
            iframeDom.focus();
        }
    }
  }

  private _startValidate(htmlGeneratorProps: IHtmlGeneratorProps,
    nextProps: IHTMLEmbedProps): void {
    this._htmlGenerator = HtmlGeneratorFactory.createHtmlGenerator(htmlGeneratorProps);
    if (nextProps.noNeedValidate) {
      return this.setState({
        isValidating: false,
        errorMessage: ''
      } as IHTMLEmbedState);
    }

    this._htmlGenerator.setSuccessorValidator(nextProps.htmlValidator);
    this._htmlGenerator.isValid(this._htmlGenerator.getFilteredVanillaHtml())
      .then((validateResult: IValidateResult) => {
      this.setState({
        isValidating: false,
        errorMessage: (validateResult.isValid ? '' : validateResult.errorMessage)
      } as IHTMLEmbedState);
    }, (validateResult: IValidateResult) => {
      this.setState({
        isValidating: false,
        errorMessage: validateResult.errorMessage
      } as IHTMLEmbedState);
    });
  }

  private _triggerServiceCall(nextProps: IHTMLEmbedProps): void {
    if (nextProps.embedCode.embedCodeType === EmbedCodeType.VanillaHtml) {
      this.setState({
        isValidating: true,
        errorMessage: ''
      } as IHTMLEmbedState);

      this._startValidate( {
        vanillaHtml: nextProps.embedCode.embedCode,
        htmlEmbedArea: this._boundingArea,
        type: HtmlGenerator.unknownType,
        shouldScale: nextProps.shouldScale,
        embedCodeShownType: nextProps.embedCode.embedCodeShownType,
        stringsLoc: nextProps.stringsLoc
        }, nextProps);
    } else {
      if (!nextProps.embeddableService) {
        return this.setState({
          isValidating: false,
          errorMessage: this.props.stringsLoc.noSettingEmbedableService
        } as IHTMLEmbedState);
      }

      nextProps.embeddableService.getEmbeddableHtmlCode().then((embeddableHtmlResult: IEmbedServiceResult) => {
        if (embeddableHtmlResult.ResponseCode !== EmbedServiceResponseCode.OK) {
          return this.setState({
            isValidating: false,
            errorMessage: this.props.stringsLoc.unsupportedEmbedUrl
          } as IHTMLEmbedState);
        }

        this._urlMetadata = embeddableHtmlResult.EmbedMetadata;
        this._startValidate( {
          vanillaHtml: embeddableHtmlResult.Html,
          originalUrl: nextProps.embedCode.embedCode,
          htmlEmbedArea: this._boundingArea,
          type: embeddableHtmlResult.Type,
          metadata: embeddableHtmlResult.EmbedMetadata,
          shouldScale: nextProps.shouldScale,
          embedCodeShownType: nextProps.embedCode.embedCodeShownType,
          stringsLoc: nextProps.stringsLoc
          }, nextProps);
      });
    }
  }

  private _renderLoadingIndicator(): JSX.Element {
    if (!this.props.renderLoadingIndicator) {
      return undefined;
    }

    return this.props.renderLoadingIndicator();
  }

  private _renderError(): JSX.Element {
    if (!this.props.renderError) {
      return undefined;
    }

    return this.props.renderError(this.state.errorMessage);
  }
}
