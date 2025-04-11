import { $ } from '@wdio/globals'
import Page from './Page.js';

class HomePage extends Page {

    async shoppingCartIcon() {
        const cartIcon = await $('span.counter-number');
        await cartIcon.waitForClickable({ timeout: 5000 });
        return cartIcon;
    }
    
    get proceedToCheckoutButton () {
        return $('#top-cart-btn-checkout');
    }

    get loginBtn () {
        return $('a[href="https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS93aGF0LWlzLW5ldy5odG1s/"]');
    }

    get welcomeText() {
        return $('span[class=logged-in]')
    }

    open () {
        return super.open("what-is-new.html");
    }
}

export default new HomePage();
