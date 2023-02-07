"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const index_1 = __importDefault(require("./index"));
const puppeteer_extra_1 = require("puppeteer-extra");
const PUPPETEER_ARGS = ['--no-sandbox', '--disable-setuid-sandbox'];
(0, ava_1.default)('will solve reCAPTCHAs', async (t) => {
    if (!process.env.TWOCAPTCHA_TOKEN) {
        t.truthy('foo');
        console.log('TWOCAPTCHA_TOKEN not set, skipping test.');
        return;
    }
    const puppeteer = (0, puppeteer_extra_1.addExtra)(require('puppeteer'));
    const recaptchaPlugin = (0, index_1.default)({
        provider: {
            id: '2captcha',
            token: process.env.TWOCAPTCHA_TOKEN
        }
    });
    puppeteer.use(recaptchaPlugin);
    const browser = await puppeteer.launch({
        args: PUPPETEER_ARGS,
        headless: true
    });
    const page = await browser.newPage();
    const url = 'https://www.google.com/recaptcha/api2/demo';
    await page.goto(url, { waitUntil: 'networkidle0' });
    const result = await page.solveRecaptchas();
    const { captchas, solutions, solved, error } = result;
    t.falsy(error);
    t.is(captchas.length, 1);
    t.is(solutions.length, 1);
    t.is(solved.length, 1);
    t.is(solved[0]._vendor, 'recaptcha');
    t.is(solved[0].isSolved, true);
    await browser.close();
});
(0, ava_1.default)('will solve hCAPTCHAs', async (t) => {
    if (!process.env.TWOCAPTCHA_TOKEN) {
        t.truthy('foo');
        console.log('TWOCAPTCHA_TOKEN not set, skipping test.');
        return;
    }
    const puppeteer = (0, puppeteer_extra_1.addExtra)(require('puppeteer'));
    const recaptchaPlugin = (0, index_1.default)({
        provider: {
            id: '2captcha',
            token: process.env.TWOCAPTCHA_TOKEN
        }
    });
    puppeteer.use(recaptchaPlugin);
    const browser = await puppeteer.launch({
        args: PUPPETEER_ARGS,
        headless: true
    });
    const page = await browser.newPage();
    const url = 'http://democaptcha.com/demo-form-eng/hcaptcha.html';
    await page.goto(url, { waitUntil: 'networkidle0' });
    const result = await page.solveRecaptchas();
    const { captchas, solutions, solved, error } = result;
    t.falsy(error);
    t.is(captchas.length, 1);
    t.is(solutions.length, 1);
    t.is(solved.length, 1);
    t.is(solved[0]._vendor, 'hcaptcha');
    t.is(solved[0].isSolved, true);
    await browser.close();
});
(0, ava_1.default)('will solve reCAPTCHA enterprise', async (t) => {
    if (!process.env.TWOCAPTCHA_TOKEN) {
        t.truthy('foo');
        console.log('TWOCAPTCHA_TOKEN not set, skipping test.');
        return;
    }
    const puppeteer = (0, puppeteer_extra_1.addExtra)(require('puppeteer'));
    const recaptchaPlugin = (0, index_1.default)({
        provider: {
            id: '2captcha',
            token: process.env.TWOCAPTCHA_TOKEN,
            opts: {
                useEnterpriseFlag: false // Not sure but using the enterprise flag makes it worse
            }
        }
    });
    puppeteer.use(recaptchaPlugin);
    const browser = await puppeteer.launch({
        args: PUPPETEER_ARGS,
        headless: true
    });
    const page = await browser.newPage();
    const url = 'https://berstend.github.io/static/recaptcha/enterprise-checkbox-explicit.html';
    await page.goto(url, { waitUntil: 'networkidle0' });
    const result = await page.solveRecaptchas();
    const { captchas, solutions, solved, error } = result;
    t.falsy(error);
    t.is(captchas.length, 1);
    t.is(solutions.length, 1);
    t.is(solved.length, 1);
    t.is(solved[0]._vendor, 'recaptcha');
    t.is(solved[0].isSolved, true);
    await browser.close();
});
(0, ava_1.default)('will solve multiple reCAPTCHAs', async (t) => {
    if (!process.env.TWOCAPTCHA_TOKEN) {
        t.truthy('foo');
        console.log('TWOCAPTCHA_TOKEN not set, skipping test.');
        return;
    }
    const puppeteer = (0, puppeteer_extra_1.addExtra)(require('puppeteer'));
    const recaptchaPlugin = (0, index_1.default)({
        provider: {
            id: '2captcha',
            token: process.env.TWOCAPTCHA_TOKEN,
            opts: {
                useEnterpriseFlag: false // Not sure but using the enterprise flag makes it worse
            }
        }
    });
    puppeteer.use(recaptchaPlugin);
    const browser = await puppeteer.launch({
        args: PUPPETEER_ARGS,
        headless: true
    });
    const page = await browser.newPage();
    const url = 'https://berstend.github.io/static/recaptcha/v2-checkbox-explicit-multi.html';
    await page.goto(url, { waitUntil: 'networkidle0' });
    page.on('dialog', async (dialog) => {
        dialog.dismiss(); // the test page has blocking `alert`s
    });
    const result = await page.solveRecaptchas();
    const { captchas, solutions, solved, error } = result;
    t.falsy(error);
    t.is(captchas.length, 3);
    t.is(solutions.length, 3);
    t.is(solved.length, 3);
    t.is(solved[0]._vendor, 'recaptcha');
    t.is(solved[0].isSolved, true);
    await browser.close();
});
(0, ava_1.default)('will not solve inactive invisible reCAPTCHAs by default', async (t) => {
    if (!process.env.TWOCAPTCHA_TOKEN) {
        t.truthy('foo');
        console.log('TWOCAPTCHA_TOKEN not set, skipping test.');
        return;
    }
    const puppeteer = (0, puppeteer_extra_1.addExtra)(require('puppeteer'));
    const recaptchaPlugin = (0, index_1.default)({
        provider: {
            id: '2captcha',
            token: process.env.TWOCAPTCHA_TOKEN
        }
    });
    puppeteer.use(recaptchaPlugin);
    const browser = await puppeteer.launch({
        args: PUPPETEER_ARGS,
        headless: true
    });
    const page = await browser.newPage();
    const url = 'https://berstend.github.io/static/recaptcha/v2-invisible-auto.html';
    await page.goto(url, { waitUntil: 'networkidle0' });
    const result = await page.solveRecaptchas();
    const { captchas, solutions, solved, error } = result;
    t.falsy(error);
    t.is(captchas.length, 0);
    t.is(solutions.length, 0);
    t.is(solved.length, 0);
    await browser.close();
});
(0, ava_1.default)('will not solve score based reCAPTCHAs by default', async (t) => {
    if (!process.env.TWOCAPTCHA_TOKEN) {
        t.truthy('foo');
        console.log('TWOCAPTCHA_TOKEN not set, skipping test.');
        return;
    }
    const puppeteer = (0, puppeteer_extra_1.addExtra)(require('puppeteer'));
    const recaptchaPlugin = (0, index_1.default)({
        provider: {
            id: '2captcha',
            token: process.env.TWOCAPTCHA_TOKEN
        }
    });
    puppeteer.use(recaptchaPlugin);
    const browser = await puppeteer.launch({
        args: PUPPETEER_ARGS,
        headless: true
    });
    const page = await browser.newPage();
    const url = 'https://berstend.github.io/static/recaptcha/v3-programmatic.html';
    await page.goto(url, { waitUntil: 'networkidle0' });
    const result = await page.solveRecaptchas();
    const { captchas, solutions, solved, error } = result;
    t.falsy(error);
    t.is(captchas.length, 0);
    t.is(solutions.length, 0);
    t.is(solved.length, 0);
    await browser.close();
});
//# sourceMappingURL=solve.test.js.map