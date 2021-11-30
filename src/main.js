import {LandingPage, FormPage, SubmitPage} from "./page-model";
import {TestData} from "./data-helper";

// ----------------------------------------------------------------------------------------------------
//  ui tests for initial registration ui
// ----------------------------------------------------------------------------------------------------
//   these tests do not actually submit registrations, so they can be safely run against production

// (you will need to configure the pageUrl and the timestamps in the next few lines)

var pageUrl = 'http://localhost:63343/reg-registration-form/';

// adjust this to the configured go live time. Note that we are using timezone -1 so we don't have to urlencode
// the + sign, so these times are relative to 2 hours BEFORE the configured go live time.
var pageUrlAfter = pageUrl + '?currentTime=2020-01-04T18:00:00-01:00';
var pageUrlShortBefore = pageUrl + '?currentTime=2020-01-04T17:30:00-01:00';
var pageUrlLongBefore = pageUrl + '?currentTime=2020-01-04T16:30:00-01:00';

fixture `Registration Form Tests`
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
    await p.visit(pageUrlAfter);
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
    await p.visit(pageUrlAfter);
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

test('F4: validation flags nicknames correctly', async t => {
    const p = new LandingPage(t);
    await p.visit(pageUrl);
    await p.submit();
    const f = p.toFormPage();

    await f.setNickname('');
    await f.setNickname(TestData.invalidNickname('too long'));
    await f.verifyNicknameValidationState(false);

    await f.setNickname('');
    await f.setNickname(TestData.invalidNickname('too cryptic'));
    await f.verifyNicknameValidationState(false);

    await f.setNickname('');
    await f.setNickname(TestData.invalidNickname('too many specials'));
    await f.verifyNicknameValidationState(false);

    await f.setNickname('');
    await f.setNickname(TestData.invalidNickname('too many symbols'));
    await f.verifyNicknameValidationState(false);

    await f.setNickname('');
    await f.setNickname(TestData.validNickname('long'));
    await f.verifyNicknameValidationState(true);

    await f.setNickname('');
    await f.setNickname(TestData.validNickname('minimal'));
    await f.verifyNicknameValidationState(true);

    await f.setNickname('');
    await f.setNickname(TestData.validNickname('..cc'));
    await f.verifyNicknameValidationState(true);

    await f.setNickname('');
    await f.setNickname(TestData.validNickname('.c.c'));
    await f.verifyNicknameValidationState(true);

    await f.setNickname('');
    await f.setNickname(TestData.validNickname('c..c'));
    await f.verifyNicknameValidationState(true);

    await f.setNickname('');
    await f.setNickname(TestData.validNickname('c.c.'));
    await f.verifyNicknameValidationState(true);

    await f.setNickname('');
    await f.setNickname(TestData.validNickname('cc..'));
    await f.verifyNicknameValidationState(true);

    await f.setNickname('');
    await f.setNickname(TestData.validNickname('.cc'));
    await f.verifyNicknameValidationState(true);

    await f.setNickname('');
    await f.setNickname(TestData.validNickname('c.c'));
    await f.verifyNicknameValidationState(true);

    await f.setNickname('');
    await f.setNickname(TestData.validNickname('cc.'));
    await f.verifyNicknameValidationState(true);

    await f.setNickname('');
    await f.setNickname(TestData.validNickname('..c'));
    await f.verifyNicknameValidationState(true);

    await f.setNickname('');
    await f.setNickname(TestData.validNickname('.c.'));
    await f.verifyNicknameValidationState(true);

    await f.setNickname('');
    await f.setNickname(TestData.validNickname('c..'));
    await f.verifyNicknameValidationState(true);
});

test('F5: validation flags birthday correctly', async t => {
    const p = new LandingPage(t);
    await p.visit(pageUrl);
    await p.submit();
    const f = p.toFormPage();

    await f.setBirthday('')
    await f.setBirthday('1972-03-20')
    await f.verifyBirthdayValidationState(true);

    await f.setBirthday('')
    await f.setBirthday('2002-08-19')
    await f.verifyBirthdayValidationState(true);


    await f.setBirthday('')
    await f.setBirthday('2002-08-20')
    await f.verifyBirthdayValidationState(false);

    await f.setBirthday('')
    await f.setBirthday('2000-06-31')
    await f.verifyBirthdayValidationState(false);

    await f.setBirthday('')
    await f.setBirthday('08/16/2000')
    await f.verifyBirthdayValidationState(false);

    await f.setBirthday('')
    await f.setBirthday('1860-01-14')
    await f.verifyBirthdayValidationState(false);

    await f.setBirthday('')
    await f.setBirthday('2009-04-20')
    await f.verifyBirthdayValidationState(false);
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
    await p.visit(pageUrlAfter);
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

