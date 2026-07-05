import { Page } from '@playwright/test';
import { Header } from './components/header';



export abstract class BasePage {
    protected readonly page: Page;
    protected abstract readonly url: string;
    readonly header: Header;

    constructor(page: Page) {          
        this.page = page;
        this.header = new Header(this.page)
    }

    async openPage(): Promise<void>{
        await this.page.goto(this.url)
    }

}