import { browser, expect } from '@wdio/globals'
import HomePage from '../pageobjects/HomePage.js'
import smokeTestData from '../test_data/smokeTestData.js'
import ProductDetailPage from '../pageobjects/ProductDetailPage.js'

describe('Smoke Test: Buying Products Full Flow', () => {

    it('should yield relevant product search', async () => {
        await HomePage.open()
        await HomePage.searchProducts(smokeTestData.search_query);
        await HomePage.firstSearchResult.waitForDisplayed({ timeout: 5000 });
        await HomePage.firstSearchResult.click();
        await ProductDetailPage.productDetailBody.waitForDisplayed({ timeout: 5000 });

        const productDetailText = await ProductDetailPage.productDetailBody.getText();
        expect(productDetailText.toLowerCase()).toContain(smokeTestData.search_query.toLowerCase());
    })
})

