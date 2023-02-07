"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSolutions = exports.PROVIDER_ID = void 0;
exports.PROVIDER_ID = '2captcha';
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)(`puppeteer-extra-plugin:recaptcha:${exports.PROVIDER_ID}`);
// const solver = require('./2captcha-api')
const solver = __importStar(require("./2captcha-api"));
const secondsBetweenDates = (before, after) => (after.getTime() - before.getTime()) / 1000;
const providerOptsDefaults = {
    useEnterpriseFlag: false,
    useActionValue: true
};
async function decodeRecaptchaAsync(token, vendor, sitekey, url, extraData, opts = { pollingInterval: 2000 }) {
    return new Promise(resolve => {
        const cb = (err, result, invalid) => resolve({ err, result, invalid });
        try {
            solver.setApiKey(token);
            let method = 'userrecaptcha';
            if (vendor === 'hcaptcha') {
                method = 'hcaptcha';
            }
            solver.decodeReCaptcha(method, sitekey, url, extraData, opts, cb);
        }
        catch (error) {
            return resolve({ err: error });
        }
    });
}
async function getSolutions(captchas = [], token = '', opts = {}) {
    opts = Object.assign(Object.assign({}, providerOptsDefaults), opts);
    const solutions = await Promise.all(captchas.map(c => getSolution(c, token, opts)));
    return { solutions, error: solutions.find(s => !!s.error) };
}
exports.getSolutions = getSolutions;
async function getSolution(captcha, token, opts) {
    const solution = {
        _vendor: captcha._vendor,
        provider: exports.PROVIDER_ID
    };
    try {
        if (!captcha || !captcha.sitekey || !captcha.url || !captcha.id) {
            throw new Error('Missing data in captcha');
        }
        solution.id = captcha.id;
        solution.requestAt = new Date();
        debug('Requesting solution..', solution);
        const extraData = {};
        if (captcha.s) {
            extraData['data-s'] = captcha.s; // google site specific property
        }
        if (opts.useActionValue && captcha.action) {
            extraData['action'] = captcha.action; // Optional v3/enterprise action
        }
        if (opts.useEnterpriseFlag && captcha.isEnterprise) {
            extraData['enterprise'] = 1;
        }
        if (process.env['2CAPTCHA_PROXY_TYPE'] && process.env['2CAPTCHA_PROXY_ADDRESS']) {
            extraData['proxytype'] = process.env['2CAPTCHA_PROXY_TYPE'].toUpperCase();
            extraData['proxy'] = process.env['2CAPTCHA_PROXY_ADDRESS'];
        }
        const { err, result, invalid } = await decodeRecaptchaAsync(token, captcha._vendor, captcha.sitekey, captcha.url, extraData);
        debug('Got response', { err, result, invalid });
        if (err)
            throw new Error(`${exports.PROVIDER_ID} error: ${err}`);
        if (!result || !result.text || !result.id) {
            throw new Error(`${exports.PROVIDER_ID} error: Missing response data: ${result}`);
        }
        solution.providerCaptchaId = result.id;
        solution.text = result.text;
        solution.responseAt = new Date();
        solution.hasSolution = !!solution.text;
        solution.duration = secondsBetweenDates(solution.requestAt, solution.responseAt);
    }
    catch (error) {
        debug('Error', error);
        solution.error = error.toString();
    }
    return solution;
}
//# sourceMappingURL=2captcha.js.map