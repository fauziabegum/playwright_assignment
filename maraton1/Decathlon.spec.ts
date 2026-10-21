import {test, expect } from "@playwright/test";


test("Order shoes in Decathlon",async({page})=>{
  await  page.goto("https://www.decathlon.in/");
  //2. Verify URL using Playwright assertions 
  const pageurl= page.url();
  expect(pageurl).toContain("decathlon");
  //3.Verify the Decathlon homepage is displayed
  const homepage=page.getByLabel("Decathlon Home",{exact:true});
  expect(homepage).toBeVisible();
  // 4.Verify if search box is enabled
    await expect(page.getByRole("search",{exact:true})).toBeEnabled();
  // 5.Click on the search Box 
    await page.locator('[enterkeyhint="search"]').click();
  //6. Enter the product name “Shoes” 
    await page.locator('[enterkeyhint="search"]').fill("Shoes");
   //7. Press Enter or select a suggestion from the dropdown
    await page.getByRole('button', { name: 'Shoes', exact: true }).click();
    //8. Verify the product listing page is displayed or Verify search results page title 
    const pagetitle=page.url();
    expect(pagetitle).toContain("shoes");
    //9. Click on the Sport filter dropdown 
    await page.getByRole('button',{name:"Sport",exact:true}).click();
   // 10. Select Running from the Sport dropdown 
   await page.getByText("Running",{exact:true}).click();
   //11. Click on the Gender filter dropdown 
   await page.getByRole('button',{name:"Gender",exact:true}).click();
   //12. Select Men
   await page.locator('[data-test-id="filter-item-gender_id_en-MEN"]').click()
   //13. Click on the Size filter dropdown 
   
   await page.getByRole('button',{name:"Size",exact:true}).click();
   //14. Select size UK 10 
    await page.locator('[data-test-id="filter-checkbox-indian_size-11"]').click()
    //15. Click on most relevant 
    await page.getByText('Most relevant',{exact:true}).click()
    //16 Select price low-high
    await page.getByRole("option",{name:"Price (low → high)",exact:true}).click()
    //17. From the filtered results, click on the first available product 
    await page.locator('[data-test-id="product-card:product-card:title"]').first().click();
    const productname= await page.locator('[data-test-id="product-card:product-card:title"]').first().innerText()
    
    //18. On the product details page, select Size – UK 10 
    await page.getByRole('button',{name:"Select size 11",exact:true}).click()
    //19. Click on Add to cart button and Verify that the product is successfully added to the cart
    
    await page.getByRole('button',{name:"Add to cart",exact:true}).click()
    await page.getByLabel('Cart',{exact:true}).click()
  
    const cartproduct= await page.locator('[data-test-id="text:cart-product-name"]').first().innerText()   
    
    expect (productname).toContain(cartproduct)
})