import { test,  expect } from "@playwright/test";


test("Book ticket in PVR", async({page})=>{
    //1. Launch the browser and open https://www.pvrcinemas.com/
    await page.goto('https://www.pvrcinemas.com/');
    //2. Select the city as “Chennai” 
    await page.locator('//div[@class="p-dropdown p-component p-inputwrapper custom-icon"]').click();
    await page.locator('//span[text()="Chennai"]').click();
    //3. Choose cinema from the available list
    await page.locator('//span[text()="Cinema"]').click();
    await page.locator('#cinema').click();//select cinema
    await page.getByText('INOX The Marina Mall, OMR, Chennai',{exact:true}).click();
    //4. Select movie date 
    await page.locator('//span[text()="Wed"]').click();
    await page.waitForLoadState("domcontentloaded")
    //5. Choose any available movie 
    await page.locator('(//span[text()="JAILER 2"])[2]').click();
    //6. Select available show time 
    await page.locator('//span[text()="10:50 PM"]').click();
    //7. Click on Book button 
    await page.getByLabel('Submit',{exact:true}).click();
   // 8. Click on Accept for Terms & Conditions 
    await page.getByText('Accept',{exact:true}).click();
    //9. Select the available seat 
    await page.locator('[id="CL.CLUB|D:16"]').click();
    //10. Verify seat information and total ticket amount using assertions 
    const seatselected=await page.locator('[id="CL.CLUB|D:16"]').innerText();
     const seatnumber=await page.locator('.seat-number').innerText();
     expect(seatnumber).toContain(seatselected);  
     const totalprice=  page.locator('.grand-prices'); 
    await  expect(totalprice).toHaveText('218.02');
    //11. Verify the Title of the page 
    const pageurl=await page.title();
    expect(pageurl).toBe('PVR Cinemas')
    console.log(pageurl);
    //12. Proceed to booking
     await page.getByText('Proceed',{exact:true}).click()
    
  
})