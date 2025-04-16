import { $ } from "@wdio/globals";
import Page from "./Page.js";

class ShippingPage extends Page {
  get shippingTitle() {
    return $('div[data-role="title"]');
  }
  get nextButton() {
    return $('button[data-role="opc-continue"]');
  }

  get defaultShippingAddress() {
    return $("div.shipping-address-item.selected-item");
  }
}
export default new ShippingPage();
