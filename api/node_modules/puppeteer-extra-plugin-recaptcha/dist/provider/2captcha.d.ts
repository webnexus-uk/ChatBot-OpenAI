export declare const PROVIDER_ID = "2captcha";
import * as types from '../types';
export interface DecodeRecaptchaAsyncResult {
    err?: any;
    result?: any;
    invalid?: any;
}
export interface TwoCaptchaProviderOpts {
    useEnterpriseFlag?: boolean;
    useActionValue?: boolean;
}
export declare function getSolutions(captchas?: types.CaptchaInfo[], token?: string, opts?: TwoCaptchaProviderOpts): Promise<types.GetSolutionsResult>;
