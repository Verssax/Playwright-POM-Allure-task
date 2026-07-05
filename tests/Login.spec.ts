import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/login.page';
import {MainPage} from '../pages/main.page';
import { errMessages } from '../pages/components/testData/errMessageTexts';
import { generateUser } from '../pages/helpers/user_generator';

test.describe('Login Page test', () => {
  let loginPage : LoginPage;
  let mainPage : MainPage;

  test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);

    await mainPage.openPage();
    await mainPage.header.clickSignIn();

    await expect(page).toHaveURL(loginPage.url)
    await expect(loginPage.loginInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();

  });

  test("Can't Login with Unregistered account", async ({page}) => {
    const userData = generateUser(true);
    await loginPage.loginWithUnregisteredAcc(userData);
    await expect(loginPage.errContainer).toBeVisible();
    await expect(loginPage.errContainer).toHaveText(errMessages.loginPageErrs.wrongPassword);
  } );

  test('Lost password shows err for unregistered account', async ({page}) => {
    await loginPage.clickForgotPass();
    await expect(page).toHaveURL(loginPage.wrongPassUrl);
    await expect(loginPage.forgotEmailInput).toBeVisible();
    await expect(loginPage.forgotEmailSubmitBtn).toBeVisible();

    const userData = generateUser(true);
    await loginPage.submitEmailForPassRecovery(userData);
    await expect(loginPage.errContainer).toBeVisible();
    await expect(loginPage.errContainer).toHaveText(errMessages.loginPageErrs.unknownUser);
  });


})




