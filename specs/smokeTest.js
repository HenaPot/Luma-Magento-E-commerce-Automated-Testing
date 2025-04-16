import HomePage from "../pageobjects/HomePage.js";
import LoginPage from "../pageobjects/LoginPage.js";
import ProductDetailPage from "../pageobjects/ProductDetailPage.js";
import ShippingPage from "../pageobjects/ShippingPage.js";
import PaymentsPage from "../pageobjects/PaymentsPage.js";
import SuccessPurchasePage from "../pageobjects/SuccessPurchasePage.js";
import testData from "../test_data/testData.js";
import AssertionUtil from "../utils/AssertionUtil.js";
import ElementUtil from "../utils/ElementUtil.js";

describe("Smoke Test: Buying Products Full Flow", () => {
  it("should successfully log in user", async () => {
    await HomePage.open();
    await ElementUtil.waitAndClick(HomePage.signInButton);

    await LoginPage.inputEmail.waitForDisplayed();
    await LoginPage.inputEmail.setValue(testData.user_credentials.email);
    await LoginPage.inputPassword.setValue(testData.user_credentials.password);
    await ElementUtil.waitAndClick(LoginPage.signInBtn);

    await HomePage.welcomeText.waitForDisplayed();

    AssertionUtil.assertTextMatches(
      await HomePage.welcomeText.getText(),
      `Welcome, ${testData.user_credentials.full_name}!`
    );
  });

  it("should yield relevant product search", async () => {
    await HomePage.open();

    await AssertionUtil.assertUrlAndElement(
      testData.homepage.url_parameter,
      testData.homepage.title
    );

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

    await AssertionUtil.assertUrlAndElement(
      testData.smoke_product.url_parameter,
      testData.smoke_product.title
    );

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
        AssertionUtil.assertTextContain(
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

    await AssertionUtil.assertUrlAndElement(
      testData.shipping.url_parameter,
      testData.shipping.section_title,
      ShippingPage.shippingTitle
    );
    await AssertionUtil.assertJsonContainsInElement(
      ShippingPage.defaultShippingAddress,
      testData.shipping.default_shipping_address
    );

    await ElementUtil.waitAndClick(ShippingPage.nextButton);
    await AssertionUtil.assertUrlAndElement(
      testData.payment.url_parameter,
      testData.payment.section_title,
      PaymentsPage.paymentTitle
    );

    await ElementUtil.waitAndClick(PaymentsPage.placeOrderButton);
    await AssertionUtil.assertUrlAndElement(
      testData.success_page.url_parameter,
      testData.success_page.success_message,
      SuccessPurchasePage.successMessage
    );
  });
});
