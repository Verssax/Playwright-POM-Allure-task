import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class MainPage extends BasePage{
    protected readonly url = "/"

    constructor(page: Page ){
        super(page)

    }

    
}
