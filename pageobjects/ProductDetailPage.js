import { $ } from "@wdio/globals";
import Page from "./Page.js";
import ElementUtil from "../utils/ElementUtil.js";

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
    await ElementUtil.waitAndClick(sizeOption);
  }

  async selectProductColor(color) {
    const colorOption = $(`div.swatch-option[option-label="${color}"]`);
    await ElementUtil.waitAndClick(colorOption);
  }

  async addToCart() {
    const addToCartButton = $("#product-addtocart-button");
    await ElementUtil.waitAndClick(addToCartButton);
  }

  open(product_parameter_url) {
    return super.open(product_parameter_url);
  }
}

export default new ProductDetailPage();
