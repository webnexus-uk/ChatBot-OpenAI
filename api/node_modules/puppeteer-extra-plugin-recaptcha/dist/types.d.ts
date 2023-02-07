/// <reference path="../dist/puppeteer-mods.d.ts" />
/// <reference path="../dist/playwright-mods.d.ts" />
/**
 * Extend window object with recaptcha things
 */
declare global {
    interface Window {
        __google_recaptcha_client?: boolean;
        ___grecaptcha_cfg?: {
            clients?: any;
        };
    }
}
export declare type RecaptchaPluginPageAdditions = {
    /** Attempt to find all reCAPTCHAs on this page. */
    findRecaptchas: () => Promise<FindRecaptchasResult>;
    getRecaptchaSolutions: (captchas: CaptchaInfo[], provider?: SolutionProvider) => Promise<GetSolutionsResult>;
    enterRecaptchaSolutions: (solutions: CaptchaSolution[]) => Promise<EnterRecaptchaSolutionsResult>;
    /** Attempt to detect and solve reCAPTCHAs on this page automatically. 🔮 */
    solveRecaptchas: () => Promise<SolveRecaptchasResult>;
};
export interface SolutionProvider<TOpts = any> {
    id?: string;
    token?: string;
    fn?: (captchas: CaptchaInfo[], token?: string) => Promise<GetSolutionsResult>;
    opts?: TOpts;
}
export interface FindRecaptchasResult {
    captchas: CaptchaInfo[];
    filtered: FilteredCaptcha[];
    error?: any;
}
export interface EnterRecaptchaSolutionsResult {
    solved: CaptchaSolved[];
    error?: any;
}
export interface GetSolutionsResult {
    solutions: CaptchaSolution[];
    error?: any;
}
export declare type SolveRecaptchasResult = FindRecaptchasResult & EnterRecaptchaSolutionsResult & GetSolutionsResult;
export declare type CaptchaVendor = 'recaptcha' | 'hcaptcha';
export declare type CaptchaType = 'checkbox' | 'invisible' | 'score';
export interface CaptchaInfo {
    _vendor: CaptchaVendor;
    id?: string;
    widgetId?: number;
    sitekey?: string;
    s?: string;
    isEnterprise?: boolean;
    isInViewport?: boolean;
    /** Is captcha invisible */
    isInvisible?: boolean;
    /** Invisible recaptchas: Does the captcha have an active challenge popup */
    hasActiveChallengePopup?: boolean;
    /** Invisible recaptchas: Can the captcha trigger a challenge or is it purely score based (v3) */
    hasChallengeFrame?: boolean;
    _type?: CaptchaType;
    action?: string;
    callback?: string | Function;
    hasResponseElement?: boolean;
    url?: string;
    display?: {
        size?: string;
        theme?: string;
        top?: string;
        left?: string;
        width?: string;
        height?: string;
    };
}
export declare type FilteredCaptcha = CaptchaInfo & {
    filtered: boolean;
    filteredReason: 'solveInViewportOnly' | 'solveScoreBased' | 'solveInactiveChallenges';
};
export interface CaptchaSolution {
    _vendor: CaptchaVendor;
    id?: string;
    provider?: string;
    providerCaptchaId?: string;
    text?: string;
    requestAt?: Date;
    responseAt?: Date;
    duration?: number;
    error?: string | Error;
    hasSolution?: boolean;
}
export interface CaptchaSolved {
    _vendor: CaptchaVendor;
    id?: string;
    responseElement?: boolean;
    responseCallback?: boolean;
    solvedAt?: Date;
    error?: string | Error;
    isSolved?: boolean;
}
export interface PluginOptions {
    /** Visualize reCAPTCHAs based on their state */
    visualFeedback: boolean;
    /** Throw on errors instead of returning them in the error property */
    throwOnError: boolean;
    /** Only solve captchas and challenges visible in the viewport */
    solveInViewportOnly: boolean;
    /** Solve invisible captchas used to acquire a score and not present a challenge (e.g. reCAPTCHA v3) */
    solveScoreBased: boolean;
    /** Solve invisible captchas that have no active challenge */
    solveInactiveChallenges: boolean;
    provider?: SolutionProvider;
}
export interface ContentScriptOpts {
    visualFeedback: boolean;
    debugBinding?: string;
}
export interface ContentScriptData {
    solutions?: CaptchaSolution[];
}
