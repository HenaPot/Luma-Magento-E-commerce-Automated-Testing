class CommonUtil {
  static async waitAndClick(element) {
    await element.waitForClickable();
    await element.click();
  }
}

export default CommonUtil;
