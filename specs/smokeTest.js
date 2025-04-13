import { expect } from '@wdio/globals'
import smokeTestData from '../test_data/smokeTestData.js'
import ProductDetailPage from '../pageobjects/ProductDetailPage.js'
import AssertionUtil from '../utils/AssertionUtil.js'

describe('Smoke Test: Buying Products Full Flow', () => {

    it('should select product details and add it to cart', async () => {
        await ProductDetailPage.open(smokeTestData.product.url_parameter);
        await AssertionUtil.assertUrlMatches(smokeTestData.product_url);
        await AssertionUtil.assertTitleContains(smokeTestData.product_title);

        await ProductDetailPage.selectProductSize(smokeTestData.product.size); 
        await ProductDetailPage.selectProductColor(smokeTestData.product.color);

        const productQuantityText = await ProductDetailPage.productQuantityInput.getValue();
        AssertionUtil.assertTextMatches(productQuantityText, smokeTestData.product.default_quantity);

        await ProductDetailPage.addToCart();
        await browser.pause(2000); 

        const productDetailText = await ProductDetailPage.productDetailBody.getText();
        AssertionUtil.assertTextContains(productDetailText, "You added " + smokeTestData.product.name);

    })
})