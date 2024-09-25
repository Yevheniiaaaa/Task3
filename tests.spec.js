const {By,Builder,until} = require("selenium-webdriver");
const assert = require("assert");

describe("Case #001", () => {
  it("Contact email is visible", async function () {
    this.timeout(10000);
    let driver;
    
    before(async function () {
      driver = await new Builder().forBrowser('chrome').build();
    });
  
    after(async function () {
      if (driver) {
        await driver.quit();
      }
    });

    try {
      await driver.get("https://www.devchallenge.it/");

      //Click on the menu
      await driver.executeScript(() => {
        document.querySelector(".hamburger").click();
      });

      //Click on the "About" button
      await driver.executeScript(() => {
        document.querySelector("#w-node-_65522f71-b15d-686b-9562-934584f3b9a5-84f3b962 > div.container._2 > div.navigation-content > div:nth-child(1) > a:nth-child(2)").click();
      });

      // Scroll to the bottom of the page
      await driver.executeScript(
        "window.scrollTo(0, document.body.scrollHeight);"
      );

      // Find and assert the email element
      const email = await driver.findElement(By.xpath("//a[@class='footer-link-2']"));
      await driver.wait(until.elementIsVisible(email), 5000);

      const emailText = await email.getText();
      const emailOnly = emailText.match(/hello@devchallenge\.it/)[0]; // Match just the email part

      assert.equal(emailOnly, "hello@devchallenge.it");

    } catch (e) {
      console.log(e);
    } finally {
      await driver.quit();
    }
  });
});

describe("Case #002", () => {
  it("Count judges", async function () {
    this.timeout(10000);
    let driver;

    try {
      driver = await new Builder().forBrowser("chrome").build();
      await driver.get("https://www.devchallenge.it/");

      //Click on the menu
      await driver.executeScript(() => {
        document.querySelector(".hamburger").click();
      });

      //Click on the "Judges" button
      await driver.executeScript(() => {
        document.querySelector("#w-node-_65522f71-b15d-686b-9562-934584f3b9a5-84f3b962 > div.container._2 > div.navigation-content > div:nth-child(1) > a:nth-child(3)").click();
      });

      //Check that there are 6 testing judges
      const judges = await driver.findElements(By.css(".testing-judges.w-dyn-list > div > div"));
      const numberOfJudges = judges.length;
      console.log("Number of Judges:", numberOfJudges);
      assert.equal(numberOfJudges, 6);

    } catch (e) {
      console.log(e);
    } finally {
      await driver.quit();
    }
  });
});


describe("Case #003", () => {
  it("No mobile partners", async function () {
    this.timeout(10000);
    let driver;

    try {
        // Initialize the WebDriver for Chrome and set the mobile viewport
        driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new (require('selenium-webdriver/chrome')).Options().windowSize({ width: 360, height: 800 }))
        .build();
        await driver.get("https://www.devchallenge.it/");

        //Click on the menu
        await driver.executeScript(() => {
          document.querySelector(".hamburger").click();
        });
  
        //Click on the "Partners" button
        await driver.executeScript(() => {
          document.querySelector("#w-node-_65522f71-b15d-686b-9562-934584f3b9a5-84f3b962 > div.container._2 > div.navigation-content > div:nth-child(1) > a:nth-child(4)").click();
        });
  
        // Wait until the partners section is loaded
        await driver.wait(until.elementLocated(By.css(".w-dyn-list")), 5000);

        //Check that there is no Apple Inc in the partner's list
        const partnersList = await driver.findElements(By.xpath("//*[contains(@href, '/partner/apple')]"));
        assert.equal(partnersList.length, 0, "There is Apple Inc in the partners’ list");

        //Check that there is no Apple Inc in the info partner's list
        const infoPartnersList = await driver.findElements(By.xpath("//*[contains(@href, 'https://www.apple.com/')]"));
        assert.equal(infoPartnersList.length, 0, "There is Apple Inc in the info partners’ list");
  
      } catch (e) {
        console.log(e);
      } finally {
        await driver.quit();
      }
    });
  });
  