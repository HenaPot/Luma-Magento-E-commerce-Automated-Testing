import CommonUtil from "./CommonUtil";
import HomePage from "../pageobjects/HomePage.js";
import ProductDetailPage from "../pageobjects/ProductDetailPage.js";

class SearchUtil extends CommonUtil {
  static async selectSizeAndColor(size, color) {
    await ProductDetailPage.selectProductSize(size);
    await ProductDetailPage.selectProductColor(color);
  }
}

export default SearchUtil;
