import {LandingPage, FormPage, SubmitPage} from "./page-model";
import {TestData} from "./data-helper";

var pageUrl = 'http://localhost:63343/reg-registration-form/';
var pageUrlShortBefore = pageUrl + '?currentTime=2019-11-28T17:30:00-01:00';
var pageUrlLongBefore = pageUrl + '?currentTime=2019-11-28T16:30:00-01:00';

fixture `Getting Started`
    .page('about:blank');

// tests for the landing page

test('L1: main URL shows landing page with long countdown', async t => {
    const p = new LandingPage(t);
    await p.visit(pageUrlLongBefore);
    await p.checkContentsBeforeLong();
});

test('L2: main URL shows landing page with short countdown', async t => {
    const p = new LandingPage(t);
    await p.visit(pageUrlShortBefore);
    await p.checkContentsBeforeShort();
});

test('L3: main URL shows landing page after go-live', async t => {
    const p = new LandingPage(t);
    await p.visit(pageUrl);
    await p.checkContentsAfter();
});

test('L4: can navigate to form page before go-live', async t => {
    const p = new LandingPage(t);
    await p.visit(pageUrlShortBefore);
    await p.submit();
    const f = p.toFormPage();
});

test('L5: can navigate to form after go-live', async t => {
    const p = new LandingPage(t);
    await p.visit(pageUrl);
    await p.submit();
    const f = p.toFormPage();
});

// tests for the form page

test('F1: can fill in a valid registration', async t => {
    const p = new LandingPage(t);
    await p.visit(pageUrl);
    await p.submit();
    const f = p.toFormPage();

    await TestData.fillValidRegistration(f);
    await f.verifyValidationStateAllValid();
});

test('F2: validation flags all invalid data', async t => {
    const p = new LandingPage(t);
    await p.visit(pageUrl);
    await p.submit();
    const f = p.toFormPage();

    await TestData.fillInvalidRegistration(f);
    await f.verifyValidationStateAllInvalid();
});

test('F3: can move on to submit page with valid data', async t => {
    const p = new LandingPage(t);
    await p.visit(pageUrl);
    await p.submit();
    const f = p.toFormPage();

    await TestData.fillValidRegistration(f);
    await f.verifyValidationStateAllValid();
    await f.submit();
    const s = f.toSubmitPage();
});

// tests for submit page

test('S1: submit page shows long countdown when appropriate', async t => {
    const p = new LandingPage(t);
    await p.visit(pageUrlLongBefore);
    await p.submit();
    const f = p.toFormPage();

    await TestData.fillValidRegistration(f);
    await f.verifyValidationStateAllValid();
    await f.submit();
    const s = f.toSubmitPage();

    await TestData.verifyValidRegistration(s);
    await s.acceptDisclaimer();
    await s.verifyLongCountdown();
    await s.verifySubmitDisabled();
});

test('S2: submit page shows short countdown when appropriate', async t => {
    const p = new LandingPage(t);
    await p.visit(pageUrlShortBefore);
    await p.submit();
    const f = p.toFormPage();

    await TestData.fillValidRegistration(f);
    await f.verifyValidationStateAllValid();
    await f.submit();
    const s = f.toSubmitPage();

    await TestData.verifyValidRegistration(s);
    await s.acceptDisclaimer();
    await s.verifyShortCountdown();
    await s.verifySubmitDisabled();
});

test('S3: submit page works and allows submit after go-live', async t => {
    const p = new LandingPage(t);
    await p.visit(pageUrl);
    await p.submit();
    const f = p.toFormPage();

    await TestData.fillValidRegistration(f);
    await f.verifyValidationStateAllValid();
    await f.submit();
    const s = f.toSubmitPage();

    await TestData.verifyValidRegistration(s);
    await s.acceptDisclaimer();
    await s.verifyNoCountdown();
    await s.verifySubmitEnabled();
});

