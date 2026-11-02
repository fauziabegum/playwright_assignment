import {expect, test }from "@playwright/test";
test.use({storageState:'Data/slogin.json'})

test ("create lead in salesforce", async({page})=>{
    //1. Step: Launch the browser (Chrome / Edge / Firefox / Safari). 
    //2. Step: Load the specified URL (https://login.salesforce.com/). 
    test.setTimeout(90000)
    await page.goto("https://orgfarm-b4c075e637-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome");
    //4. Step: Click on the App Launcher toggle button. 
    
   await page.locator('//div[@class="slds-icon-waffle"]').click();
   //5. Step: Click on the View All link. 
   await page.getByRole('button',{name:"View All Applications",exact:true}).click()
   await page.waitForTimeout(5000)
   //6. Step: Type ‘Marketing’ in the search box and click on the Marketing link. 
   await page.locator('[class="slds-input"]').fill('Marketing')
   await page.locator('//div[@class="slds-truncate"]').click()
  // 7. Step: Navigate to the Leads tab from the Marketing dashboard. 
   await page.getByRole("link",{name:"Leads",exact:true}).click()
   //await page.getByRole('button',{name:"List View",exact:true}).click()
   //8. Step: Click on the New button to create a lead. 
   await page.getByRole("button",{name:"New",exact:true}).click()
   //9. Step: Fill in all the mandatory fields (Salutation, First Name, Last Name, Company) with valid data. 
   await page.locator('(//div[@class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right"])[1]').click();
    await page.locator('//span[text()="Dr."]').click()
    await page.locator('[name="firstName"]').fill('Test');
    await page.locator('[name="lastName"]').fill('Kamal'); 
    await page.locator('//input[@name="Company"]').fill("Skylink solution");
    //10. Step: Click on the Save button. 
    await page.locator('//button[text()="Save"]').click();
    const message= page.locator('[class="toastMessage slds-text-heading--small forceActionsText"]')
   //console.log(message.innerText());
    await expect(message).toBeVisible()
    //11. Step: In the newly created Lead page, locate the dropdown near Submit for Approval button and click on the Convert link. 
    await page.getByRole("button",{name:"Show more actions"}).click()
    await page.getByText("Convert",{exact:true}).click()
    //12. Step: Click on the Opportunity Name input field, clear and enter a new opportunity name. 
    await page.locator('(//div[@class="createPanelCollapsed"])[2]').click();
    await page.getByRole('textbox',{name:"Opportunity Name *",exact:true}).fill('Starlink solution');
    //13. Step: Click on the Convert button.
    await page.getByRole('button',{name:"Convert",exact:true}).click()
    const convertmessage= await page.locator('[id="leadConvertedTitle"]').innerText();
    console.log(convertmessage);
    expect(convertmessage).toContain("Your lead has been converted")
    //14. Step: Click on the Go to Leads button. 
    await page.locator('//button[contains(text(),"Go to Leads")]').click()
    //15. Step: Search the verified lead name in the Search box and verify the text ‘No items to display’.
    await page.locator('[placeholder="Search this list..."]').fill('Kamal') 
    await page.locator('[placeholder="Search this list..."]').press('Enter')
    const searchMessage= await page.locator('[class="slds-illustration-title"]').innerText()
    console.log(searchMessage);
    expect(searchMessage).toBe('Nothing to see here')
    //16. Step: Navigate to the Opportunities tab and search for the opportunity linked with the converted lead.
    await page.getByRole('link',{name:"Opportunities",exact:true}).click();
    await page.getByPlaceholder("Search this list...",{exact:true}).fill("Mindtree")
    await page.locator('[placeholder="Search this list..."]').press('Enter')
    //17. Step: Search the opportunity name created and click on the created opportunity name.
    await page.locator('(//tr[@class="slds-hint-parent"])[1]').click()
    

})