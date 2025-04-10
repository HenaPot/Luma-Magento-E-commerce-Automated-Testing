import { expect } from '@wdio/globals'
import smokeTestData from '../test_data/smokeTestData.js'
import ProductDetailPage from '../pageobjects/ProductDetailPage.js'

describe('Smoke Test: Buying Products Full Flow', () => {

    it('should select product details and add it to cart', async () => {
        await ProductDetailPage.open(smokeTestData.product.url_parameter);
        await ProductDetailPage.selectProductSize(smokeTestData.product.size); 
        await ProductDetailPage.selectProductColor(smokeTestData.product.color);

        const productQuantityText = await ProductDetailPage.productQuantityInput.getValue();
        expect(productQuantityText).toEqual(smokeTestData.product.default_quantity);

        await ProductDetailPage.addToCart();
        await browser.pause(2000); 

        const productDetailText = await ProductDetailPage.productDetailBody.getText();
        expect(productDetailText).toContain("You added " + smokeTestData.product.name);

    })
})