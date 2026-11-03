import test, { expect } from "@playwright/test";
test.use({storageState:'Data/slogin.json'})

test(" Create and verify a New Case in Chatter",async({page})=>{
    test.setTimeout(90000)
    //1. Step: Launch the browser (Chrome / Edge / Firefox / Safari). 
    //2. Step: Load the specified URL
    //3. Step: Enter the Username, Password and click on the Login button. 
    await page.goto("https://orgfarm-b4c075e637-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome");
    //4. Step: Click on the App Launcher toggle button. 
    await page.locator('//div[@class="slds-icon-waffle"]').click();
    //5. Step: Click on the View All link. 
    await page.getByRole('button',{name:"View All Applications",exact:true}).click();
    await page.waitForTimeout(5000);
    //6. Step: Type ‘Service’ in the search box and click on the Service link. 
    await page.locator('[class="slds-input"]').fill('Service');
    await page.locator('//div[@data-name="Service"]').click();
    //7. Step: Navigate to the Cases tab from the Service dashboard. 
    await page.getByRole('link',{name:"Cases",exact:true}).click();
    //8. Step: Click on the New button to create a new case. 
    await page.getByRole('button',{name:"New",exact:true}).click();
    //9. Step: Click on the Search Contacts input field in Contact Name 
    await page.getByRole('combobox',{name:"Contact Name",exact:true}).click();
    //10. Step: Click on the New Contact link 
    await page.locator('//span[text()="New Contact"]').click();
    //11. Step: Fill in all the mandatory fields (Salutation, First Name, Last Name) with a valid data. 
    await page.locator('[name="salutation"]').click();
    await page.locator('//span[text()="Mr."]').click();
    await page.locator('[name="firstName"]').fill('Test');
    await page.locator('[name="lastName"]').fill('Hasam');
    //12. Step: Click on the Save button. 
    await page.getByRole('button',{name:"Save",exact:true}).click();
    const contactmessage= page.locator('[class="toastMessage slds-text-heading--small forceActionsText"]');
    await expect(contactmessage).toBeVisible();

    //13. Step: Click Search Accounts input field in Account Name and click on the New Account link 
    await page.getByRole('combobox',{name:"Account Name",exact:true}).click();
    await page.locator('//span[text()="New Account"]').click();
    //14. Step: Fill in all the mandatory fields (Account Name, Account Number) with a valid data. 
    await page.getByRole('textbox',{name:"Account Name", exact:true}).fill("Sigma");
    await page.getByRole('textbox',{name:"Account Number", exact:true}).fill("152482");
    //15. Step: Select the Rating dropdown and choose the option ‘Hot’
    await page.getByRole('combobox',{name:"Rating",exact:true}).click();
    await page.locator('//span[text()="Hot"]').click();
    //16. Step: Click on the Save button. 
    await page.getByRole('button',{name:"Save",exact:true}).click();
    const accountmessage= page.locator('[class="toastMessage slds-text-heading--small forceActionsText"]');
    await expect(accountmessage).toBeVisible();
    //17. Step: Select the Status dropdown icon and choose the value as New.
    await page.getByRole('combobox',{name:"Status",exact:true}).click();
    await page.locator('//span[@class="slds-media__body"]/span[text()="New"]').click();
    //18. Step: Select the Priority dropdown icon and choose the value as ‘High’. 
    await page.getByRole('combobox',{name:"Priority",exact:true}).click();
    await page.locator('//span[@class="slds-media__body"]/span[text()="High"]').click();
    //19. Step: Select the Case Origin dropdown icon and choose the value as ‘Email’. 
    await page.getByRole('combobox',{name:"Case Origin",exact:true}).click();
    await page.locator('//span[@class="slds-media__body"]/span[text()="Email"]').click();
    //20. Step: Fill in the Subject input field as ‘Product Return Request’ and Description input field as ‘Requesting a return for a defective product’ 
    await page.getByRole('textbox',{name:"Subject", exact:true}).fill("Product Return Request");
    await page.getByRole('textbox',{name:"Description", exact:true}).fill("Requesting a return for a defective product");
    //21. Step: Click on the Save button.
    await page.getByRole('button',{name:"Save", exact:true}).click();
    const confirmmessage= page.locator('[class="toastMessage slds-text-heading--small forceActionsText"]');
    await expect(confirmmessage).toBeVisible();
    
    //22. Step: Edit the Status under Details category and choose the ‘Escalated’ option from the dropdown. 

    await page.locator('[title="Edit Status"]').click();
    await page.getByRole('combobox',{name:"Status",exact:true}).click();
    await page.locator('//span[@class="slds-media__body"]/span[text()="Escalated"]').click();
    //23. Step: Click on the Save button.  
    await page.getByRole('button',{name:"Save", exact:true}).click();  
    //24. Step: Enter a valid data in the Share an Update input field and click on the Share button.  
    await page.getByRole('button',{name:"Share an update...", exact:true}).click();
    const updatemessage="New test Created";
    await page.getByRole('textbox',{name:"Share an update...", exact:true}).fill(updatemessage);
    await page.getByRole('button',{name:"Share", exact:true}).click();
    await page.waitForTimeout(5000);
    //25. Step: Click on the dropdown icon and choose the Like on Chatter option. 
    await page.locator('[class="cuf-media-right forceChatterOverflowActionMenu uiMenu"]').first().click();
    await page.locator('//span[text()="Like on Chatter"]').click();
    const postmessage= page.locator('[class="toastMessage slds-text-heading--small forceActionsText"]');
    await expect(postmessage).toBeVisible();
    //26. Step: Navigate to the Chatter tab and verify the post liked by the user. 
    await page.getByRole('link',{name:"Chatter",exact:true}).click();
    const likemessage=await page.locator('//div[@class="feedBodyInner Desktop oneApp"]/p').first().innerText();
    expect (likemessage).toBe(updatemessage)
    

})