import { browser, expect } from "@wdio/globals";

class AssertionUtil {
  static assertTextContainedIgnoreCase(actualText, expectedText) {
    expect(actualText.toLowerCase()).toContain(
      expectedText.toLowerCase(),
      `Expected text "${expectedText}" not found in "${actualText}"`
    );
  }

  static async assertUrlAndElement(
    expectedUrlParameter,
    expectedElementText,
    element = null
  ) {
    const expectedUrl = `https://magento.softwaretestingboard.com/${expectedUrlParameter}`;
    await browser.waitUntil(
      async () => {
        const url = await browser.getUrl();
        return url.includes(expectedUrlParameter);
      },
      {
        timeout: 7000,
        timeoutMsg: `URL did not load with the correct parameter. Expected URL to include: ${expectedUrlParameter}`,
      }
    );
    expect(await browser.getUrl()).toBe(expectedUrl);

    if (element) {
      await element.waitForDisplayed({ timeout: 10000 });
      const elementText = await element.getText();
      expect(elementText).toContain(expectedElementText);
    } else {
      const title = await browser.getTitle();
      expect(title).toContain(expectedElementText);
    }
  }

  static async assertJsonContainsInElement(element, expectedJson) {
    const elementText = await element.getText();
    for (const value of Object.values(expectedJson)) {
      expect(elementText).toContain(
        value,
        `Expected element text to contain "${value}", but found "${elementText}".`
      );
    }
  }

  static assertTextMatches(actualText, expectedText) {
    expect(actualText).toBe(
      expectedText,
      `Expected text "${expectedText}" not found in "${actualText}"`
    );
  }

  static assertTextContain(actualText, expectedText) {
    expect(actualText).toContain(
      expectedText,
      `Expected text "${expectedText}" not found in "${actualText}"`
    );
  }
}

export default AssertionUtil;
