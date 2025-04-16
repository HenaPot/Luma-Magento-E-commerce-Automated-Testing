import { $ } from "@wdio/globals";
import Page from "./Page.js";
import CommonUtil from "../utils/CommonUtil.js";

class ProductDetailPage extends Page {
  get productDetailBody() {
    return $("body");
  }

  get successMessage() {
    return $(
      'div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]'
    );
  }

  get productQuantityInput() {
    return $('input[name="qty"][id="qty"][title="Qty"]');
  }

  async selectProductSize(size) {
    const sizeOption = $(`div.swatch-option[option-label="${size}"]`);
    await CommonUtil.waitAndClick(sizeOption);
  }

  async selectProductColor(color) {
    const colorOption = $(`div.swatch-option[option-label="${color}"]`);
    await CommonUtil.waitAndClick(colorOption);
  }

  async addToCart() {
    const addToCartButton = $("#product-addtocart-button");
    await CommonUtil.waitAndClick(addToCartButton);
  }

  open(product_parameter_url) {
    return super.open(product_parameter_url);
  }
}

export default new ProductDetailPage();
