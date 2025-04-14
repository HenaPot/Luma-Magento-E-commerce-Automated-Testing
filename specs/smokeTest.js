import HomePage from '../pageobjects/HomePage.js'
import smokeTestData from '../test_data/smokeTestData.js'
import ProductDetailPage from '../pageobjects/ProductDetailPage.js'
import AssertionUtil from '../utils/AssertionUtil.js'

describe('Smoke Test: Buying Products Full Flow', () => {

    it('should yield relevant product search', async () => {
        await HomePage.open()

        await AssertionUtil.assertUrlMatches(smokeTestData.homepage_url);
        await AssertionUtil.assertTitleMatches(smokeTestData.homepage_title);

        await HomePage.searchProducts(smokeTestData.search_query);
        await HomePage.firstSearchResult.waitForDisplayed({ timeout: 5000 });
        await HomePage.firstSearchResult.click();
        await ProductDetailPage.productDetailBody.waitForDisplayed({ timeout: 5000 });

        const productDetailText = await ProductDetailPage.productDetailBody.getText();
        AssertionUtil.assertTextContainedIgnoreCase(productDetailText, smokeTestData.search_query);        
    })
})

