import { $ } from "@wdio/globals";
import Page from "./Page.js";

class HomePage extends Page {
  get proceedToCheckoutButton() {
    return $("#top-cart-btn-checkout");
  }

  get signInButton() {
    return $(
      'a[href="https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS93aGF0LWlzLW5ldy5odG1s/"]'
    );
  }

  get welcomeText() {
    return $("span[class=logged-in]");
  }

  get searchProductsInput() {
    return $("#search");
  }

  get searchBtnSubmit() {
    return $('button[type="submit" and title="Search"]');
  }

  get firstSearchResult() {
    return $(".product-item-link");
  }

  async searchProducts(search) {
    await this.searchProductsInput.setValue(search);
    await browser.keys("Enter");
  }

  async shoppingCartIcon() {
    const cartIcon = $("span.counter-number");
    await cartIcon.waitForClickable({ timeout: 8000 });
    return cartIcon;
  }

  open() {
    return super.open("what-is-new.html");
  }
}

export default new HomePage();
