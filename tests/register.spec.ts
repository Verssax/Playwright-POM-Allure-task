import { test, expect } from '@playwright/test';
import {MainPage} from '../pages/main.page';
import { RegisterationPage } from '../pages/registration.page';
import { generateUser, toInvalidEmailFormat } from '../pages/helpers/user_generator';
import { errMessages } from '../pages/components/testData/errMessageTexts';

test.describe('Register Page test', () => {
  let registrationPage : RegisterationPage;
  let mainPage : MainPage;

    test.beforeEach(async ({page}) => {
        registrationPage = new RegisterationPage(page);
        mainPage = new MainPage(page);

        await mainPage.openPage();
        await mainPage.header.clickRegister();
        await expect(page).toHaveURL(registrationPage.url);
    });

    test("Can't register with empty fields", async ({page}) => {
        await registrationPage.clickSubmitRegForm();

        await expect(registrationPage.errMessage).toBeVisible();
        await expect(registrationPage.errMessage).toContainText(errMessages.registrationFormErrs.emptyEmail);
        await expect(registrationPage.errMessage).toContainText(errMessages.registrationFormErrs.emptyLogin);
        await expect(registrationPage.errMessage).toContainText(errMessages.registrationFormErrs.emptyFirstName);
        await expect(registrationPage.errMessage).toContainText(errMessages.registrationFormErrs.emptyLastName);
        await expect(registrationPage.errMessage).toContainText(errMessages.registrationFormErrs.shortPassword);
    } );

    test('Cant register with 7 char password', async ({ page }) => {
        const userData = generateUser(false);
        await registrationPage.submitRegistration(userData);

        await expect(registrationPage.errMessage).toHaveText(errMessages.registrationFormErrs.shortPassword);
        await expect(registrationPage.userNameInput).toHaveValue(userData.username);
        await expect(registrationPage.firstNameInput).toHaveValue(userData.firstName);
        await expect(registrationPage.lastNameInput).toHaveValue(userData.lastName);
        await expect(registrationPage.emailInput).toHaveValue(userData.email);
    });

    test('Cant register with invalid email format', async ({ page }) => {
        const userData = generateUser(true);
        userData.email = toInvalidEmailFormat(userData.email); 

        await registrationPage.submitRegistration(userData);

        await expect(registrationPage.errMessage).toBeVisible();
        await expect(registrationPage.errMessage).toHaveText(errMessages.registrationFormErrs.invalidEmailFormat);
        await expect(registrationPage.userNameInput).toHaveValue(userData.username);
        await expect(registrationPage.firstNameInput).toHaveValue(userData.firstName);
        await expect(registrationPage.lastNameInput).toHaveValue(userData.lastName);
        await expect(registrationPage.emailInput).toHaveValue(userData.email);
    });


})