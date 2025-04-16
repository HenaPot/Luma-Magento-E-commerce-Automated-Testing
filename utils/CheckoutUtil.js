import CommonUtil from "./CommonUtil";
import HomePage from "../pageobjects/HomePage.js";

class CheckoutUtil extends CommonUtil {
  static async proceedToCheckout() {
    const cartIcon = await HomePage.shoppingCartIcon();
    await CommonUtil.waitAndClick(cartIcon);
    await CommonUtil.waitAndClick(HomePage.proceedToCheckoutButton);
  }
}

export default CheckoutUtil;
