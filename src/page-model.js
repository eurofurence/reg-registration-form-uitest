import {ClientFunction, Selector} from 'testcafe';

export class LandingPage {
    constructor(t) {
        this.t = t;

        this.getLocation = ClientFunction(() => document.location.href);

        this.navs = {
            startButton: Selector('#start-button')
        };
        this.labels = {
            textHeadline: Selector('#landing-welcome-header'),
            textCountdownLong: Selector( '#countdown-text-long'),
            textCountdownShort: Selector( '#countdown-text-short'),
        };
    }

    async visit(url) {
        await this.t.navigateTo(url);
    }

    async checkContentsAfter() {
        var expectedHeadline = 'Welcome to Eurofurence!';

        await this.t
            .expect(this.labels.textHeadline.innerText).contains(expectedHeadline)
            .expect(this.labels.textCountdownLong.exists).notOk()
            .expect(this.labels.textCountdownShort.exists).notOk();
    }

    async checkContentsBeforeShort() {
        var expectedHeadline = 'Welcome to Eurofurence!';
        var expectedShortMsg = 'Registration starts soon!';

        await this.t
            .expect(this.labels.textHeadline.innerText).contains(expectedHeadline)
            .expect(this.labels.textCountdownLong.visible).notOk()
            .expect(this.labels.textCountdownShort.visible).ok()
            .expect(this.labels.textCountdownShort.innerText).contains(expectedShortMsg);
    }

    async checkContentsBeforeLong() {
        var expectedHeadline = 'Welcome to Eurofurence!';
        var expectedLongMsg = 'Registration has not started yet';

        await this.t
            .expect(this.labels.textHeadline.innerText).contains(expectedHeadline)
            .expect(this.labels.textCountdownLong.visible).ok()
            .expect(this.labels.textCountdownShort.visible).notOk()
            .expect(this.labels.textCountdownLong.innerText).contains(expectedLongMsg);
    }

    async submit() {
        await this.t
            .expect(this.navs.startButton.visible).ok()
            .click(this.navs.startButton)
            .expect(this.getLocation()).contains('/form.html');
    }

    toFormPage() {
        return new FormPage(this.t);
    }
}

export class FormPage {
    constructor(t) {
        this.t = t;

        this.getLocation = ClientFunction(() => document.location.href);

        this.navs = {
            submitButton: Selector('#submitbutton'),
        };
        this.fields = {
            nickname: Selector('#nickname-field'),
            firstname: Selector('#first-name-field'),
            lastname: Selector('#last-name-field'),
            street: Selector('#street-field'),
            zip: Selector('#zip-field'),
            city: Selector('#city-field'),
            country: Selector('#country-field'),
            countryBadge: Selector('#country-badge-field'),
            state: Selector('#state-field'),
            email: Selector('#email-field'),
            emailRepeat: Selector('#email-repeat-field'),
            phone: Selector('#phone-field'),
            birthday: Selector('#birthday-field'),
            gender: Selector('#gender-field'),
            flags: {
                "anon": Selector('#flags-anon-field'),
                "ev": Selector('#flags-ev-field'),
                "hc": Selector('#flags-hc-field'),
            },
            telegram: Selector('#telegram-field'),
            packages: {
                "attendance": Selector('#packages-attendance-field'),
                "stage": Selector('#packages-stage-field'),
                "sponsor": Selector('#packages-sponsor-field'),
                "sponsor2": Selector('#packages-sponsor2-field'),
            },
            tshirtsize: Selector('#tshirt-size-field'),
            options: {
                "art": Selector('#options-art-field'),
                "anim": Selector('#options-anim-field'),
                "music": Selector('#options-music-field'),
                "suit": Selector('#options-suit-field'),
            },
            usercomments: Selector('#user-comments-field'),
        };
        this.validatedFields = [
            "nickname",
            "firstname",
            "lastname",
            "street",
            "zip",
            "city",
            "country",
            "countryBadge",
            "email",
            "emailRepeat",
            "phone",
            "telegram",
        ];
    }

    // field accessors

    async _setTextValue(field, value) {
        if (value) {
            await this.t.typeText(field, value, {paste: true});
        } else {
            await this.t
                .click(field)
                .pressKey('ctrl+a delete')
        }
    }

    async setNickname(value) {
        await this._setTextValue(this.fields.nickname, value);
    }

    async setFirstName(value) {
        await this._setTextValue(this.fields.firstname, value);
    }

    async setLastName(value) {
        await this._setTextValue(this.fields.lastname, value);
    }

    async setStreet(value) {
        await this._setTextValue(this.fields.street, value);
    }

    async setZip(value) {
        await this._setTextValue(this.fields.zip, value);
    }

    async setCity(value) {
        await this._setTextValue(this.fields.city, value);
    }

    async setCountry(textValue, codeValue) {
        const countryOptions = this.fields.country.find('option');

        await this.t
            .click(this.fields.country)
            .click(countryOptions.withText(textValue));
        await this.verifyCountry(codeValue);
    }

    async verifyCountry(codeValue) {
        await this.t.expect(this.fields.country.value).eql(codeValue);
    }

    async setCountryBadge(textValue, codeValue) {
        const countryBadgeOptions = this.fields.countryBadge.find('option');

        await this.t
            .click(this.fields.countryBadge)
            .click(countryBadgeOptions.withText(textValue));
        await this.verifyCountryBadge(codeValue);
    }

    async verifyCountryBadge(codeValue) {
        await this.t.expect(this.fields.countryBadge.value).eql(codeValue);
    }

    async setState(value) {
        await this._setTextValue(this.fields.state, value);
    }

    async setEmail(value) {
        await this._setTextValue(this.fields.email, value);
    }

    async setEmailRepeat(value) {
        await this._setTextValue(this.fields.emailRepeat, value);
    }

    async setPhone(value) {
        await this._setTextValue(this.fields.phone, value);
    }

    async setBirthday(valueIso) {
        await this.t.typeText(this.fields.birthday, valueIso);
    }

    async setGender(textValue, codeValue) {
        const genderOptions = this.fields.gender.find('option');

        await this.t
            .click(this.fields.gender)
            .click(genderOptions.withText(textValue));
        await this.verifyGender(codeValue);
    }

    async verifyGender(codeValue) {
        await this.t.expect(this.fields.gender.value).eql(codeValue);
    }

    async clickFlag(flag, expectedTargetState) {
        await this.t
            .click(this.fields.flags[flag])
            .expect(this.fields.flags[flag].checked).eql(expectedTargetState);
    }

    async setTelegram(value) {
        await this._setTextValue(this.fields.telegram, value);
    }

    async clickPackage(pkg, expectedTargetState) {
        await this.t
            .click(this.fields.packages[pkg])
            .expect(this.fields.packages[pkg].checked).eql(expectedTargetState);
    }

    async setTshirtSize(textValue, codeValue) {
        const shirtOptions = this.fields.tshirtsize.find('option');

        await this.t
            .click(this.fields.tshirtsize)
            .click(shirtOptions.withText(textValue));
        await this.verifyTshirtSize(codeValue);
    }

    async verifyTshirtSize(codeValue) {
        await this.t.expect(this.fields.tshirtsize.value).eql(codeValue);
    }

    async clickOption(opt, expectedTargetState) {
        await this.t
            .click(this.fields.options[opt])
            .expect(this.fields.options[opt].checked).eql(expectedTargetState);
    }

    async setComments(value) {
        await this._setTextValue(this.fields.usercomments, value);
    }

    // validation state

    async verifyValidationStateAllValid() {
        await this.verifyValidationState([]);
    }

    async verifyValidationStateAllInvalid() {
        await this.verifyValidationState(this.validatedFields);
    }

    async verifyValidationState(invalidFieldsList) {
        for (var i = 0; i < this.validatedFields; i++) {
            let key = this.validatedFields[i];
            await this._verifyValidationState(this.fields[key], !invalidFieldsList.includes(key))
        }
    }

    async _verifyValidationState(field, isValid) {
        var errorColor = 'rgb(255';
        if (isValid) {
            await this.t.expect(field.getStyleProperty('border-bottom-color')).notContains(errorColor);
        } else {
            await this.t.expect(field.getStyleProperty('border-bottom-color')).contains(errorColor);
        }
    }

    // navigation

    async submit() {
        await this.t
            .expect(this.navs.submitButton.getAttribute('class')).contains('active')
            .click(this.navs.submitButton)
            .expect(this.getLocation()).contains('/submit.html');
    }

    toSubmitPage() {
        return new SubmitPage(this.t);
    }
}

export class SubmitPage {
    constructor(t) {
        this.t = t;
    }

    /*

    async acceptDisclaimer() {
        await this.t
            .click(this.fields.disclaimer)
            .expect(this.fields.disclaimer.checked).eql(true);
    }
     */
}
