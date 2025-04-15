import { $ } from "@wdio/globals";
import Page from "./Page.js";

class LoginPage extends Page {
  get inputEmail() {
    return $("#email");
  }

  get inputPassword() {
    return $("#pass");
  }
  get inputPassword() {
    return $("#pass");
  }

  get signInBtn() {
    return $("#send2");
  }
  get signInBtn() {
    return $("#send2");
  }

  async login(username, password) {
    await this.inputEmail.setValue(username);
    await this.inputPassword.setValue(password);
    await this.signInBtn.click();
  }
}

export default new LoginPage();
