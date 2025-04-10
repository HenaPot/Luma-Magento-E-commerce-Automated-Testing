import { $ } from '@wdio/globals'
import Page from './Page.js';

class HomePage extends Page {

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
