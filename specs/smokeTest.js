import HomePage from "../pageobjects/HomePage.js";
import LoginPage from "../pageobjects/LoginPage.js";
import ProductDetailPage from "../pageobjects/ProductDetailPage.js";
import CheckoutPage from "../pageobjects/CheckoutPage.js";
import SuccessPurchasePage from "../pageobjects/SuccessPurchasePage.js";
import testData from "../test_data/testData.js";
import AssertionUtil from "../utils/AssertionUtil.js";
import ElementUtil from "../utils/ElementUtil.js";

describe("Smoke Test: Buying Products Full Flow", () => {
  it("should successfully log in user", async () => {
    await HomePage.open();
    await ElementUtil.waitAndClick(HomePage.loginBtn);

    await LoginPage.inputEmail.waitForDisplayed();
    await LoginPage.inputEmail.setValue(testData.user_credentials.email);
    await LoginPage.inputPassword.setValue(testData.user_credentials.password);
    await ElementUtil.waitAndClick(LoginPage.signInBtn);

    AssertionUtil.assertTextMatches(
      await HomePage.welcomeText.getText(),
      `Welcome, ${testData.user_credentials.full_name}!`
    );
  });

  it("should yield relevant product search", async () => {
    await HomePage.open();

    await AssertionUtil.assertUrlMatches(testData.homepage.url);
    await AssertionUtil.assertTitleMatches(testData.homepage.title);

    await HomePage.searchProducts(testData.smoke_search_query);
    await ElementUtil.waitAndClick(HomePage.firstSearchResult);

    await ProductDetailPage.productDetailBody.waitForDisplayed();
    AssertionUtil.assertTextContainedIgnoreCase(
      await ProductDetailPage.productDetailBody.getText(),
      testData.smoke_search_query
    );
  });

  it("should select product details and add it to cart", async () => {
    await ProductDetailPage.open(testData.smoke_product.url_parameter);
    await AssertionUtil.assertUrlMatches(
      `https://magento.softwaretestingboard.com/${testData.smoke_product.url_parameter}`
    );
    await AssertionUtil.assertTitleContains(testData.smoke_product.title);

    await ProductDetailPage.selectProductSize(testData.smoke_product.size);
    await ProductDetailPage.selectProductColor(testData.smoke_product.color);

    AssertionUtil.assertTextMatches(
      await ProductDetailPage.productQuantityInput.getValue(),
      testData.smoke_product.default_quantity
    );

    await ProductDetailPage.addToCart();
    await browser.waitUntil(async () => {
      await ProductDetailPage.successMessage.waitForDisplayed();
      try {
        AssertionUtil.assertTextContains(
          await ProductDetailPage.successMessage.getText(),
          "You added " + testData.smoke_product.title
        );
        return true;
      } catch {
        return false;
      }
    });
  });

  it("should complete checkout with configured product", async () => {
    await HomePage.open();

    const cartIcon = await HomePage.shoppingCartIcon();
    await ElementUtil.waitAndClick(cartIcon);

    await ElementUtil.waitAndClick(HomePage.proceedToCheckoutButton);

    await ElementUtil.waitAndClick(CheckoutPage.getNextButton);

    await ElementUtil.waitAndClick(CheckoutPage.placeOrderButton);

    await browser.waitUntil(
      async () =>
        (await browser.getUrl()) ===
        "https://magento.softwaretestingboard.com/checkout/onepage/success/"
    );

    await SuccessPurchasePage.getSuccessText.waitForDisplayed();
    AssertionUtil.assertTextMatches(
      await SuccessPurchasePage.getSuccessText.getText(),
      testData.order_success
    );
  });
});
