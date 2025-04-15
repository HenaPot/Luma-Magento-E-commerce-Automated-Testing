import { $ } from "@wdio/globals";
import Page from "./Page.js";

class CheckoutPage extends Page {
  get getNextButton() {
    return $('button[data-role="opc-continue"]');
  }

  get placeOrderButton() {
    return $("button.action.primary.checkout");
  }
}

export default new CheckoutPage();
