import test, { expect } from "@playwright/test";
import data from "../../Data/servicenowLogin.json"
for (let value of data){
test("Search Product and Add to Cart in Service Now",async({page})=>{
    //1. Launch browser and navigate to Service Now application URL
    await page.goto("https://dev330545.service-now.com/")
    //2. Login using valid admin credentials
    await page.getByLabel('User name',{exact:true}).fill(value.Username);
    await page.getByRole('textbox',{name:'Password',exact:true}).fill(value.Password)
    await page.locator('#sysverb_login').click()
    
    await page.waitForLoadState("domcontentloaded")
    //3. Verify Service Now home page is displayed
    await expect(page.locator('#header-logo-image')).toBeVisible();
    //4. Navigate to All → Service Catalog
    await page.getByRole('menuitem',{name:"All",exact:true}).click();

    await page.getByText('Service Catalog',{exact:true}).click()
    //5. Switch to Service Catalog iframe
   
    const Catalogframe=page.frameLocator("#gsft_main")
    //6. Select Mobiles category
    await Catalogframe.getByLabel("Mobiles. Cell phones to meet your business needs.",{exact:true}).click()
    //7. Choose Apple iPhone 13 
    
    await Catalogframe.getByText("Apple iPhone 13",{exact:true}).click()
    //8. Configure all required options
    
    await Catalogframe.getByText("No",{exact:true}).click()
    await Catalogframe.locator('[id="IO:33494b069747011021983d1e6253af45"]').click();
    await Catalogframe.locator('[id="IO:33494b069747011021983d1e6253af45"]').selectOption('Unlimited');
    await Catalogframe.getByText("Blue",{exact:true}).click()
    await Catalogframe.locator("//label[contains(text(),'512 GB')]").click();
    //9. Click Order Now
    await Catalogframe.getByRole("button",{name:"Order Now",exact:true}).click();
    //10. Verify order confirmation message 
    const confirmmsg=await page.locator('[class="notification notification-success"]').innerText()
    console.log(confirmmsg);
    expect(confirmmsg).toContain('Thank you, your request has been submitted')
    //11. Capture full-page screenshot 
    await page.screenshot({path: "screenshot.png",fullPage: true});
    
})
}