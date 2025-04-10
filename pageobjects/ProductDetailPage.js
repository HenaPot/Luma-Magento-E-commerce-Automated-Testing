import { $ } from '@wdio/globals'
import Page from './Page.js';

class ProductDetailPage extends Page {

    get productDetailBody () {
        return $('body');
    }

    open (product_parameter_url) {
        return super.open(product_parameter_url);
    }

    async selectProductSize (size) {
        const sizeOption = $(`//div[contains(@class, "swatch-option") and @option-label="${size}"]`);
        await sizeOption.click();
    }

    async selectProductColor (color) {
        const colorOption = $(`//div[contains(@class, "swatch-option") and @option-label="${color}"]`);
        await colorOption.click();
    }
    
    get productQuantityInput () {
        return $('input[name="qty"][id="qty"][title="Qty"]');
    }
    
    async addToCart () {
        const addToCartButton = $('#product-addtocart-button');
        await addToCartButton.waitForClickable({ timeout: 3000 });
        await addToCartButton.click();
    }
}

export default new ProductDetailPage();
