import { $ } from "@wdio/globals";
import Page from "./Page.js";

class SuccessPurchasePage extends Page {
  get getSuccessText() {
    return $("//span[@class='base' and @data-ui-id='page-title-wrapper']");
  }
}

export default new SuccessPurchasePage();
