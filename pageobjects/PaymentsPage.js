import { $ } from "@wdio/globals";
import Page from "./Page.js";

class PaymentsPage extends Page {
  get paymentTitle() {
    return $("//div[text()='Payment Method']");
  }

  get placeOrderButton() {
    return $("button.action.primary.checkout");
  }
}

export default new PaymentsPage();
