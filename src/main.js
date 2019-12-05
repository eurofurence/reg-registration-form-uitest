import {LandingPage, FormPage, SubmitPage} from "./page-model";
import {TestData} from "./data-helper";

var pageUrl = 'http://localhost:63342/reg-registration-form/';
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

// TODO test country-badge auto fill logic

// TODO test deselect flags/options/packages logic

// TODO FIX validation on select drop down occurs only when leaving focus

// TODO FIX email only checks for non-empty field?? Regsys does more, right?

// TODO FIX can deselect Entrance Fee and Stage Ticket, Sponsor is on by default

