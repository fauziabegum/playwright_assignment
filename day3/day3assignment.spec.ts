import { chromium , test, webkit } from "@playwright/test";
test ("Print the title ", async()=>{
    const edgeBrowser= await chromium.launch({ headless: false, channel:"msedge"})
    const edgeContext= await edgeBrowser.newContext()
    const edgepage= await edgeContext.newPage()
    await edgepage.goto("https://www.redbus.in/");
   console.log(await edgepage.title());
   console.log(await edgepage.url());

    const webkitInstance= await webkit.launch({ headless: false, channel:"webkit"})
    const webkitContext= await webkitInstance.newContext()
    const webkitpage= await webkitContext.newPage()
    await webkitpage.goto("https://www.flipkart.com/");
   console.log(await webkitpage.title());
   console.log(await webkitpage.url());

})



