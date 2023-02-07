"use strict";
// https://github.com/bochkarev-artem/2captcha/blob/master/index.js
// TODO: Create our own API wrapper
Object.defineProperty(exports, "__esModule", { value: true });
exports.report = exports.solveRecaptchaFromHtml = exports.decodeUrl = exports.decodeReCaptcha = exports.decode = exports.setApiKey = void 0;
var https = require('https');
var url = require('url');
var querystring = require('querystring');
var apiKey;
var apiInUrl = 'https://2captcha.com/in.php';
var apiResUrl = 'https://2captcha.com/res.php';
var apiMethod = 'base64';
var SOFT_ID = '2589';
var defaultOptions = {
    pollingInterval: 2000,
    retries: 3
};
function pollCaptcha(captchaId, options, invalid, callback) {
    invalid = invalid.bind({ options: options, captchaId: captchaId });
    var intervalId = setInterval(function () {
        var httpsRequestOptions = url.parse(apiResUrl +
            '?action=get&soft_id=' +
            SOFT_ID +
            '&key=' +
            apiKey +
            '&id=' +
            captchaId);
        var request = https.request(httpsRequestOptions, function (response) {
            var body = '';
            response.on('data', function (chunk) {
                body += chunk;
            });
            response.on('end', function () {
                if (body === 'CAPCHA_NOT_READY') {
                    return;
                }
                clearInterval(intervalId);
                var result = body.split('|');
                if (result[0] !== 'OK') {
                    callback(result[0]); //error
                }
                else {
                    callback(null, {
                        id: captchaId,
                        text: result[1]
                    }, invalid);
                }
                callback = function () { }; // prevent the callback from being called more than once, if multiple https requests are open at the same time.
            });
        });
        request.on('error', function (e) {
            request.destroy();
            callback(e);
        });
        request.end();
    }, options.pollingInterval || defaultOptions.pollingInterval);
}
const setApiKey = function (key) {
    apiKey = key;
};
exports.setApiKey = setApiKey;
const decode = function (base64, options, callback) {
    if (!callback) {
        callback = options;
        options = defaultOptions;
    }
    var httpsRequestOptions = url.parse(apiInUrl);
    httpsRequestOptions.method = 'POST';
    var postData = {
        method: apiMethod,
        key: apiKey,
        soft_id: SOFT_ID,
        body: base64
    };
    postData = querystring.stringify(postData);
    var request = https.request(httpsRequestOptions, function (response) {
        var body = '';
        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on('end', function () {
            var result = body.split('|');
            if (result[0] !== 'OK') {
                return callback(result[0]);
            }
            pollCaptcha(result[1], options, function (error) {
                var callbackToInitialCallback = callback;
                (0, exports.report)(this.captchaId);
                if (error) {
                    return callbackToInitialCallback('CAPTCHA_FAILED');
                }
                if (!this.options.retries) {
                    this.options.retries = defaultOptions.retries;
                }
                if (this.options.retries > 1) {
                    this.options.retries = this.options.retries - 1;
                    (0, exports.decode)(base64, this.options, callback);
                }
                else {
                    callbackToInitialCallback('CAPTCHA_FAILED_TOO_MANY_TIMES');
                }
            }, callback);
        });
    });
    request.on('error', function (e) {
        request.destroy();
        callback(e);
    });
    request.write(postData);
    request.end();
};
exports.decode = decode;
const decodeReCaptcha = function (captchaMethod, captcha, pageUrl, extraData, options, callback) {
    if (!callback) {
        callback = options;
        options = defaultOptions;
    }
    var httpsRequestOptions = url.parse(apiInUrl);
    httpsRequestOptions.method = 'POST';
    var postData = Object.assign({ method: captchaMethod, key: apiKey, soft_id: SOFT_ID, 
        // googlekey: captcha,
        pageurl: pageUrl }, extraData);
    if (captchaMethod === 'userrecaptcha') {
        postData.googlekey = captcha;
    }
    if (captchaMethod === 'hcaptcha') {
        postData.sitekey = captcha;
    }
    postData = querystring.stringify(postData);
    var request = https.request(httpsRequestOptions, function (response) {
        var body = '';
        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on('end', function () {
            var result = body.split('|');
            if (result[0] !== 'OK') {
                return callback(result[0]);
            }
            pollCaptcha(result[1], options, function (error) {
                var callbackToInitialCallback = callback;
                (0, exports.report)(this.captchaId);
                if (error) {
                    return callbackToInitialCallback('CAPTCHA_FAILED');
                }
                if (!this.options.retries) {
                    this.options.retries = defaultOptions.retries;
                }
                if (this.options.retries > 1) {
                    this.options.retries = this.options.retries - 1;
                    (0, exports.decodeReCaptcha)(captchaMethod, captcha, pageUrl, extraData, this.options, callback);
                }
                else {
                    callbackToInitialCallback('CAPTCHA_FAILED_TOO_MANY_TIMES');
                }
            }, callback);
        });
    });
    request.on('error', function (e) {
        request.destroy();
        callback(e);
    });
    request.write(postData);
    request.end();
};
exports.decodeReCaptcha = decodeReCaptcha;
const decodeUrl = function (uri, options, callback) {
    if (!callback) {
        callback = options;
        options = defaultOptions;
    }
    var options = url.parse(uri);
    var request = https.request(options, function (response) {
        var body = '';
        response.setEncoding('base64');
        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on('end', function () {
            (0, exports.decode)(body, options, callback);
        });
    });
    request.on('error', function (e) {
        request.destroy();
        callback(e);
    });
    request.end();
};
exports.decodeUrl = decodeUrl;
const solveRecaptchaFromHtml = function (html, options, callback) {
    if (!callback) {
        callback = options;
        options = defaultOptions;
    }
    var googleUrl = html.split('/challenge?k=');
    if (googleUrl.length < 2)
        return callback('No captcha found in html');
    googleUrl = googleUrl[1];
    googleUrl = googleUrl.split('"')[0];
    googleUrl = googleUrl.split("'")[0];
    googleUrl = 'https://www.google.com/recaptcha/api/challenge?k=' + googleUrl;
    var httpsRequestOptions = url.parse(googleUrl);
    var request = https.request(httpsRequestOptions, function (response) {
        var body = '';
        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on('end', function () {
            var challengeArr = body.split("'");
            if (!challengeArr[1])
                return callback('Parsing captcha failed');
            var challenge = challengeArr[1];
            if (challenge.length === 0)
                return callback('Parsing captcha failed');
            (0, exports.decodeUrl)('https://www.google.com/recaptcha/api/image?c=' + challenge, options, function (error, result, invalid) {
                if (result) {
                    result.challenge = challenge;
                }
                callback(error, result, invalid);
            });
        });
    });
    request.end();
};
exports.solveRecaptchaFromHtml = solveRecaptchaFromHtml;
const report = function (captchaId) {
    var reportUrl = apiResUrl +
        '?action=reportbad&soft_id=' +
        SOFT_ID +
        '&key=' +
        apiKey +
        '&id=' +
        captchaId;
    var options = url.parse(reportUrl);
    var request = https.request(options, function (response) {
        // var body = ''
        // response.on('data', function(chunk) {
        //   body += chunk
        // })
        // response.on('end', function() {})
    });
    request.end();
};
exports.report = report;
//# sourceMappingURL=2captcha-api.js.map