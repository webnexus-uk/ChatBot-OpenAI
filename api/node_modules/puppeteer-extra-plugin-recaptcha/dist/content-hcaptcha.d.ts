import * as types from './types';
export declare const ContentScriptDefaultOpts: types.ContentScriptOpts;
export declare const ContentScriptDefaultData: types.ContentScriptData;
/**
 * Content script for Hcaptcha handling (runs in browser context)
 * @note External modules are not supported here (due to content script isolation)
 */
export declare class HcaptchaContentScript {
    private opts;
    private data;
    private baseUrl;
    constructor(opts?: types.ContentScriptOpts, data?: types.ContentScriptData);
    private _waitUntilDocumentReady;
    private _paintCaptchaBusy;
    /** Regular checkboxes */
    private _findRegularCheckboxes;
    /** Find active challenges from invisible hcaptchas */
    private _findActiveChallenges;
    private _extractInfoFromIframes;
    findRecaptchas(): Promise<{
        captchas: types.CaptchaInfo[];
        error: Error;
    }>;
    enterRecaptchaSolutions(): Promise<{
        solved: types.CaptchaSolved[];
        error: any;
    }>;
}
