import HomePage from "../pageobjects/HomePage.js";
import LoginPage from "../pageobjects/LoginPage.js";
import testData from "../test_data/testData.js";
import ProductDetailPage from "../pageobjects/ProductDetailPage.js";
import AssertionUtil from "../utils/AssertionUtil.js";
import WaitUtil from "../utils/WaitUtil.js";

describe("Smoke Test: Buying Products Full Flow", () => {
  it("should successfully log in user", async () => {
    await HomePage.open();
    await HomePage.loginBtn.waitForClickable();
    await HomePage.loginBtn.click();

    await LoginPage.inputEmail.waitForDisplayed();
    await LoginPage.inputEmail.setValue(testData.user_credentials.email);
    await LoginPage.inputPassword.setValue(testData.user_credentials.password);
    await LoginPage.signInBtn.click();

    const welcomeText = await HomePage.welcomeText.getText();
    AssertionUtil.assertTextMatches(
      welcomeText,
      `Welcome, ${testData.user_credentials.full_name}!`
    );
  });

  it("should yield relevant product search", async () => {
    await HomePage.open();

    await AssertionUtil.assertUrlMatches(testData.homepage.url);
    await AssertionUtil.assertTitleMatches(testData.homepage.title);

    await HomePage.searchProducts(testData.smoke_search_query);
    await HomePage.firstSearchResult.waitForClickable();
    await HomePage.firstSearchResult.click();

    await ProductDetailPage.productDetailBody.waitForDisplayed();
    const productDetailText =
      await ProductDetailPage.productDetailBody.getText();
    AssertionUtil.assertTextContainedIgnoreCase(
      productDetailText,
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
    const productQuantityText =
      await ProductDetailPage.productQuantityInput.getValue();
    AssertionUtil.assertTextMatches(
      productQuantityText,
      testData.smoke_product.default_quantity
    );

    await ProductDetailPage.addToCart();
    await WaitUtil.waitUntilCondition(async () => {
      const successMessage = await ProductDetailPage.successMessage.getText();
      try {
        AssertionUtil.assertTextContains(
          successMessage,
          "You added " + testData.smoke_product.title
        );
        return true;
      } catch {
        return false;
      }
    });
  });
});
