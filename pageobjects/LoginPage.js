import { $ } from "@wdio/globals";
import Page from "./Page.js";

class LoginPage extends Page {
  get inputEmail() {
    return $("#email");
  }

  get inputPassword() {
    return $("#pass");
  }

  get signInBtn() {
    return $("#send2");
  }

  async enterSignInData(username, password) {
    await this.inputEmail.waitForDisplayed();
    await this.inputEmail.setValue(username);
    await this.inputPassword.setValue(password);
  }
}

export default new LoginPage();
