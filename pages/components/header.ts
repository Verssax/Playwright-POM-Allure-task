import { Page, Locator } from '@playwright/test';

export class Header {

    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }
    

    private get headerSignInBtn() : Locator{
        return this.page.getByRole('link', {name:'Sign in'})
    }

    private get headerRegisterBtn() : Locator{
        return this.page.getByRole('link', {name:'Register'})
    }

    public async clickSignIn(){
        await this.headerSignInBtn.click()
    }

    public async clickRegister(){
        await this.headerRegisterBtn.click()
    }

}