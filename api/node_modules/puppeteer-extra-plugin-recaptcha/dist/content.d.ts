import * as types from './types';
export declare const ContentScriptDefaultOpts: types.ContentScriptOpts;
export declare const ContentScriptDefaultData: types.ContentScriptData;
/**
 * Content script for Recaptcha handling (runs in browser context)
 * @note External modules are not supported here (due to content script isolation)
 */
export declare class RecaptchaContentScript {
    private opts;
    private data;
    private frameSources;
    constructor(opts?: types.ContentScriptOpts, data?: types.ContentScriptData);
    /** Log using debug binding if available */
    private log;
    private _pick;
    private _isVisible;
    /** Check if an element is in the current viewport */
    private _isInViewport;
    private _flattenObject;
    private _getKeyByValue;
    private _waitUntilDocumentReady;
    private _paintCaptchaBusy;
    private _paintCaptchaSolved;
    private _findVisibleIframeNodes;
    private _findVisibleIframeNodeById;
    private _hideChallengeWindowIfPresent;
    private _generateFrameSources;
    private getFrameSelectorForId;
    private getClients;
    private getVisibleIframesIds;
    private getInvisibleIframesIds;
    private getIframesIds;
    private isEnterpriseCaptcha;
    private isInvisible;
    /** Whether an active challenge popup is open */
    private hasActiveChallengePopup;
    /** Whether an (invisible) captcha has a challenge bframe - otherwise it's a score based captcha */
    private hasChallengeFrame;
    private isInViewport;
    private getResponseInputById;
    private getClientById;
    private extractInfoFromClient;
    findRecaptchas(): Promise<{
        captchas: types.CaptchaInfo[];
        error: any;
    }>;
    enterRecaptchaSolutions(): Promise<{
        solved: types.CaptchaSolved[];
        error: any;
    }>;
}
