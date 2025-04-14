import { browser, expect } from '@wdio/globals'

class AssertionUtil {   
    static assertTextContainedIgnoreCase(actualText, expectedText) {
        expect(actualText.toLowerCase()).toContain(expectedText.toLowerCase(), `Expected text "${expectedText}" not found in "${actualText}"`);
    } 

    static async assertUrlMatches(expectedUrl) {
        const currentUrl = await browser.getUrl();
        expect(currentUrl).toBe(expectedUrl, `Expected URL "${expectedUrl}" does not match "${currentUrl}"`);
    }

    static async assertTitleMatches(expectedTitle) {
        const currentTitle = await browser.getTitle();
        expect(currentTitle).toBe(expectedTitle, `Expected title "${expectedTitle}" does not match "${currentTitle}"`);
    }
}

export default AssertionUtil;