import CommonUtil from "./CommonUtil";
import HomePage from "../pageobjects/HomePage.js";
import LoginPage from "../pageobjects/LoginPage.js";

class AuthUtil extends CommonUtil {
  static async signIn(email, password) {
    await super.waitAndClick(HomePage.signInBtn);
    await LoginPage.enterSignInData(email, password);
    await super.waitAndClick(LoginPage.signInBtn);
    await HomePage.welcomeText.waitForDisplayed();
  }
}

export default AuthUtil;
