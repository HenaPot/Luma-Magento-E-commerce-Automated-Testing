import { browser } from "@wdio/globals";

class WaitUtil {
  /**
   * Waits until a given condition function returns true.
   * @param {Function} conditionFn - An async function that returns a boolean.
   * @param {number} timeout - Timeout in milliseconds (default is 5000ms).
   * @param {string} timeoutMsg - Custom timeout message.
   */
  static async waitUntilCondition(
    conditionFn,
    timeout = 5000,
    timeoutMsg = "Condition was not met in time"
  ) {
    await browser.waitUntil(conditionFn, {
      timeout,
      timeoutMsg,
    });
  }
}

export default WaitUtil;
