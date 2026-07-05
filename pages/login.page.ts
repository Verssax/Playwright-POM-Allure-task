import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { UserData } from './helpers/user_generator';


export class LoginPage extends BasePage{
    public readonly url = "login"
    public readonly wrongPassUrl = '/account/lost_password'

    constructor(page: Page ){
        super(page)
        
    }
    public get loginInput() : Locator{
        return this.page.getByLabel('Login')
    }

    public get passwordInput() : Locator{
        return this.page.getByLabel('Password') 
    }

    public  get loginBtn() : Locator {
        return this.page.getByRole('button', {name: 'login'})
    }

    public  get forgotPassBtn() : Locator {
        return this.page.getByRole('link', {name: 'Lost password'})
    }

    public  get forgotEmailInput() : Locator {
        return this.page.getByLabel ('Email')
    }

    public get forgotEmailSubmitBtn() : Locator {
        return this.page.getByRole('button', {name: 'Submit'})
    }

    public get errContainer() : Locator {
        return this.page.locator('#flash_error')
    }

  
    
    public async loginWithUnregisteredAcc( userData: UserData){      
        await this.loginInput.fill(userData.username);
        await this.passwordInput.fill(userData.password);
        await this.loginBtn.click();
    }

    public async clickForgotPass() {
        await this.forgotPassBtn.click();
    }

    public async submitEmailForPassRecovery(userData:UserData)  {        
        await this.forgotEmailInput.fill(userData.email);
        await this.forgotEmailSubmitBtn.click();
    }

    

}
