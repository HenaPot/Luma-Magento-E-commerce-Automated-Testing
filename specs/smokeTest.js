import { browser, expect } from '@wdio/globals'
import SmokeTestUtil from '../utils/SmokeTestUtil.js'
import HomePage from '../pageobjects/HomePage.js'
import CheckoutPage from '../pageobjects/CheckoutPage.js'
import SuccessPurchasePage from '../pageobjects/SuccessPurchasePage.js'

describe('Smoke Test: Buying Products Full Flow', () => {

    it('should complete checkout with configured product', async () => {
        await SmokeTestUtil.userLoginTestFixture();
        await SmokeTestUtil.productInCartTestFixture();

        await HomePage.open();

        const cartIcon = await HomePage.shoppingCartIcon();
        await cartIcon.click();

        await HomePage.proceedToCheckoutButton.waitForClickable();
        await HomePage.proceedToCheckoutButton.click();

        await CheckoutPage.getNextButton.waitForClickable();
        await CheckoutPage.getNextButton.click();

        await CheckoutPage.placeOrderButton.waitForClickable();
        await CheckoutPage.placeOrderButton.click();

        await browser.waitUntil(async () => (await browser.getUrl()) === 'https://magento.softwaretestingboard.com/checkout/onepage/success/');

        await SuccessPurchasePage.getSuccessText.waitForDisplayed();
        expect(SuccessPurchasePage.getSuccessText).toHaveText('Thank you for your purchase!');

    })
})