import { $ } from '@wdio/globals'
import Page from './Page.js';

class ProductDetailPage extends Page {

    get productDetailBody () {
        return $('body');
    }

    get successMessage () {
        return $('div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]')
    }

    get productQuantityInput () {
        return $('input[name="qty"][id="qty"][title="Qty"]');
    }

    async selectProductSize (size) {
        const sizeOption = $(`//div[contains(@class, "swatch-option") and @option-label="${size}"]`);
        await sizeOption.click();
    }

    async selectProductColor (color) {
        const colorOption = $(`//div[contains(@class, "swatch-option") and @option-label="${color}"]`);
        await colorOption.click();
    }
    
    async addToCart () {
        const addToCartButton = $('#product-addtocart-button');
        await addToCartButton.waitForClickable({ timeout: 3000 });
        await addToCartButton.click();
    }

    open (product_parameter_url) {
        return super.open(product_parameter_url);
    }
}

export default new ProductDetailPage();
