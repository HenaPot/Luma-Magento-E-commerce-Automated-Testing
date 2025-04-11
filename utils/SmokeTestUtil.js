import { browser } from '@wdio/globals'
import smokeTestData from '../test_data/smokeTestData.js'
import ProductDetailPage from '../pageobjects/ProductDetailPage.js'
import HomePage from '../pageobjects/HomePage.js'
import LoginPage from '../pageobjects/LoginPage.js'

class SmokeTestUtil {   
    static async productInCartTestFixture() {
        await ProductDetailPage.open(smokeTestData.product.url_parameter);
        await ProductDetailPage.selectProductSize(smokeTestData.product.size); 
        await ProductDetailPage.selectProductColor(smokeTestData.product.color);

        await ProductDetailPage.addToCart();
        await browser.pause(2000); 
    } 

    static async userLoginTestFixture() {
        await HomePage.open()
        await HomePage.loginBtn.waitForClickable({ timeout: 5000 });
        await HomePage.loginBtn.click();

        await LoginPage.inputEmail.waitForDisplayed({ timeout: 5000 });
        await LoginPage.inputEmail.setValue(smokeTestData.user_credentials.email);
        await LoginPage.inputPassword.setValue(smokeTestData.user_credentials.password);

        await LoginPage.signInBtn.click();
        await browser.pause(2000); 
    }
}

export default SmokeTestUtil;