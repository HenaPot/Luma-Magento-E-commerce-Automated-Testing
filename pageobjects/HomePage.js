import { $ } from '@wdio/globals'
import Page from './Page.js';

class HomePage extends Page {
    get searchProductsInput () {
        return $('#search');
    }

    get searchBtnSubmit () {
        return $('button[type="submit" and title="Search"]');
    }

    get firstSearchResult () {
        return $('.item.product.product-item');
    }

    async searchProducts (search) {
        await this.searchProductsInput.setValue(search);
        await browser.keys('Enter');
    }
    
    open () {
        return super.open("what-is-new.html");
    }
}

export default new HomePage();
