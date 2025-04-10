import { browser, expect } from '@wdio/globals'
import LoginPage from '../pageobjects/LoginPage.js'
import HomePage from '../pageobjects/HomePage.js'
import smokeTestData from '../test_data/smokeTestData.js'

describe('Smoke Test: Buying Products Full Flow', () => {

    it('should successfully log in user', async () => {
        await HomePage.open()
        await HomePage.loginBtn.waitForClickable({ timeout: 5000 });
        await HomePage.loginBtn.click();

        await LoginPage.inputEmail.waitForDisplayed({ timeout: 5000 });
        await LoginPage.inputEmail.setValue(smokeTestData.user_credentials.email);
        await LoginPage.inputPassword.setValue(smokeTestData.user_credentials.password);

        await LoginPage.signInBtn.click();

        await expect(HomePage.welcomeText).toHaveText(`Welcome, ${smokeTestData.user_credentials.full_name}!`, { wait: 5000 });
    })
})