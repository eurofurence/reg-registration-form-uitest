export class TestData {
    static async fillValidRegistration(fp) {
        await fp.setNickname('AngelServal');
        await fp.setFirstName('Katrina');
        await fp.setLastName('Müller');
        await fp.setStreet('Automatisierte Teststraße 42 äöüÄÖÜ');
        await fp.setZip('4LK-8N0');
        await fp.setCity('München');
        await fp.setCountry('Germany', 'DE');
        await fp.setCountryBadge('Germany','DE');
        await fp.setState('Mecklenburg-Vorpommern');
        await fp.setEmail('jsquirrel_github_9a6d@packetloss.de');
        await fp.setEmailRepeat('jsquirrel_github_9a6d@packetloss.de');
        await fp.setPhone('+49 12345 123456789');
        await fp.setBirthday('2002-08-19');
        await fp.setGender('female', 'female');
        await fp.clickFlag('anon', true);
        await fp.clickFlag('ev', true);
        await fp.clickFlag('hc', true);
        await fp.setTelegram('@Stickers');
        await fp.clickPackage('sponsor', true);
        await fp.setTshirtSize('3XL (Narrow Cut)','w3XL');
        await fp.clickOption('art', true);
        await fp.clickOption('anim', true);
        await fp.clickOption('music', true);
        await fp.clickOption('suit', true);
        await fp.setComments('This is a comment. Yay!');
    }

    static async verifyValidRegistration(sp) {
        await sp.verifyNickname('AngelServal');
        await sp.verifyFirstName('Katrina');
        await sp.verifyLastName('Müller');
        await sp.verifyStreet('Automatisierte Teststraße 42 äöüÄÖÜ');
        await sp.verifyZip('4LK-8N0');
        await sp.verifyCity('München');
        await sp.verifyCountry('Germany');
        await sp.verifyCountryBadge('Germany');
        await sp.verifyState('Mecklenburg-Vorpommern');
        await sp.verifyEmail('jsquirrel_github_9a6d@packetloss.de');
        await sp.verifyPhone('+49 12345 123456789');
        await sp.verifyBirthday('08/19/2002');
        await sp.verifyGender('female');
        await sp.verifyTelegram('@Stickers');
        await sp.verifyPackages(["Entrance Fee", "Stage Ticket", "Sponsor Upgrade"], ["Supersponsor Upgrade"]);
        await sp.verifyOptions([
            "Legal Name is Confidential",
            "Member of Eurofurence e.V.",
            "Wheelchair",
            "Artist",
            "Animator",
            "Musician",
            "Fursuiter"
        ], []);
        await sp.verifyTshirtSize('3XL (Narrow Cut)');
        await sp.verifyComments('This is a comment. Yay!');
    }

    static async fillInvalidRegistration(fp) {
        await fp.setNickname(TestData.invalidNickname('default'));
        await fp.setFirstName('');
        await fp.setLastName('');
        await fp.setStreet('');
        await fp.setZip('');
        await fp.setCity('');
        await fp.setCountry('- Please Select -', 'none');
        await fp.setCountryBadge('- Please Select -','none');
        await fp.setState('');
        await fp.setEmail('');
        await fp.setEmailRepeat('');
        await fp.setPhone('');
        await fp.setBirthday('2002-08-20');
        await fp.setGender("Don't wish to say", 'notprovided');
        await fp.setTelegram("NoAtStickers");
        // await fp.clickPackage("attendance", false);
        // await fp.clickPackage("stage", false);
        await fp.clickPackage("sponsor", true);
        await fp.clickPackage("sponsor2", true);

        // TODO validation only occurs when leaving field focus right now - remove me when fixed
        await fp.setZip('');
    }

    static invalidNickname(desc) {
        switch(desc) {
            case 'too long':
                return "this is a long nick should be flagged because it is simply too long to be printable";
            case 'too cryptic':
                return "%$@#";
            case 'too many specials':
                return "are ジ we ン there ル yet?";
            case 'too many symbols':
                return "are _ we % yet?";
            default:
                return '].-o-.[ エンジェル サーバル';
        }
    }

    static validNickname(desc) {
        switch (desc) {
            case 'long':
                return 'The quick red Squirrel w1th 33 many Spaces and Numbers 87 so l33t';
            case 'minimal':
                return 'i';
            case '..cc':
                return '栗鼠io';
            case '.c.c':
                return '栗i鼠o';
            case 'c..c':
                return 'i栗鼠o';
            case 'c.c.':
                return 'i栗o鼠';
            case 'cc..':
                return 'io栗鼠';
            case '.cc':
                return '栗io';
            case 'c.c':
                return 'i栗o';
            case 'cc.':
                return 'io栗';
            case '..c':
                return '栗鼠i';
            case '.c.':
                return '栗i鼠';
            case 'c..':
                return 'i栗鼠';
            default:
                return 'AngelServal';
        }
    }
}
