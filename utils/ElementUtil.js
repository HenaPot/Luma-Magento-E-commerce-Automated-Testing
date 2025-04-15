import { browser, expect } from "@wdio/globals";

class ElementUtil {
  static async waitAndClick(element) {
    await element.waitForClickable({ timeout: 5000 });
    await element.click();
  }
}

export default ElementUtil;
