import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { UserData } from './helpers/user_generator';


export class RegisterationPage extends BasePage{
    public readonly url = "account/register";
    public readonly shortPassErr = 'Password is too short (minimum is 8 characters)';

    constructor(page: Page ){
        super(page)
    }

    public get userNameInput() : Locator {
        return this.page.getByLabel('Login')
    }

    public get passwordInput() : Locator {
        return this.page.getByLabel('Password')
    }

    public get confirmationInput() : Locator {
        return this.page.getByLabel('Confirmation')
    }

    public get firstNameInput() : Locator {
        return this.page.getByLabel('First name')
    }

    public get lastNameInput() : Locator {
        return this.page.getByLabel('Last name')
    }

    public get emailInput() : Locator {
        return this.page.getByRole('textbox', { name: 'Email' })
    }

    private get submitBtn() : Locator {
        return this.page.getByRole('button', {name: 'Submit'})
    }

    public get errMessage() : Locator {
        return this.page.locator('#errorExplanation')
    }


    public async clickSubmitRegForm() {
        await this.submitBtn.click()
    }


    public async submitRegistration(userData: UserData): Promise<void> {
        await this.userNameInput.fill(userData.username);
        await this.passwordInput.fill(userData.password);
        await this.confirmationInput.fill(userData.password);
        await this.firstNameInput.fill(userData.firstName);
        await this.lastNameInput.fill(userData.lastName);
        await this.emailInput.fill(userData.email);
        await this.submitBtn.click();
    }


   


}
