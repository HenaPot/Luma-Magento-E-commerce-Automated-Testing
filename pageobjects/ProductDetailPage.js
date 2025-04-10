import { $ } from '@wdio/globals'
import Page from './Page.js';

class ProductDetailPage extends Page {

    get productDetailBody () {
        return $('body');
    }

}

export default new ProductDetailPage();
