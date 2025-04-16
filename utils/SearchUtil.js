import CommonUtil from "./CommonUtil";
import HomePage from "../pageobjects/HomePage.js";
import ProductDetailPage from "../pageobjects/ProductDetailPage.js";

class SearchUtil extends CommonUtil {
  static async searchAndGetFirstResult(search_query) {
    await HomePage.searchProducts(search_query);
    await CommonUtil.waitAndClick(HomePage.firstSearchResult);
    await ProductDetailPage.productDetailBody.waitForDisplayed();
  }
}

export default SearchUtil;
