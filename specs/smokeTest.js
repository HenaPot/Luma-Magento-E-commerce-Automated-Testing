import HomePage from "../pageobjects/HomePage.js";
import ProductDetailPage from "../pageobjects/ProductDetailPage.js";
import ShippingPage from "../pageobjects/ShippingPage.js";
import PaymentsPage from "../pageobjects/PaymentsPage.js";
import SuccessPurchasePage from "../pageobjects/SuccessPurchasePage.js";
import testData from "../test_data/testData.js";
import AssertionUtil from "../utils/AssertionUtil.js";
import CommonUtil from "../utils/CommonUtil.js";
import AuthUtil from "../utils/AuthUtil.js";
import SearchUtil from "../utils/SearchUtil.js";
import ProductDetailUtil from "../utils/ProductDetailUtil.js";
import CheckoutUtil from "../utils/CheckoutUtil.js";

describe("Smoke Test: Buying Products Full Flow", () => {
  it("should successfully log in user", async () => {
    await HomePage.open();

    await AuthUtil.signIn(
      testData.user_credentials.email,
      testData.user_credentials.password
    );

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

    await SearchUtil.searchAndGetFirstResult(testData.smoke_search_query);

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

    await ProductDetailUtil.selectSizeAndColor(
      testData.smoke_product.size,
      testData.smoke_product.color
    );

    AssertionUtil.assertTextMatches(
      await ProductDetailPage.productQuantityInput.getValue(),
      testData.smoke_product.default_quantity
    );

    await ProductDetailPage.addToCart();
    await AssertionUtil.assertWaitElementTextContain(
      ProductDetailPage.successMessage,
      "You added " + testData.smoke_product.title
    );
  });

  it("should complete checkout with configured product", async () => {
    await HomePage.open();

    await CheckoutUtil.proceedToCheckout();
    await AssertionUtil.assertUrlAndElement(
      testData.shipping.url_parameter,
      testData.shipping.section_title,
      ShippingPage.shippingTitle
    );

    await AssertionUtil.assertJsonContainsInElement(
      ShippingPage.defaultShippingAddress,
      testData.shipping.default_shipping_address
    );

    await CommonUtil.waitAndClick(ShippingPage.nextButton);
    await AssertionUtil.assertUrlAndElement(
      testData.payment.url_parameter,
      testData.payment.section_title,
      PaymentsPage.paymentTitle
    );

    await CommonUtil.waitAndClick(PaymentsPage.placeOrderButton);
    await AssertionUtil.assertUrlAndElement(
      testData.success_page.url_parameter,
      testData.success_page.success_message,
      SuccessPurchasePage.successMessage
    );
  });
});
