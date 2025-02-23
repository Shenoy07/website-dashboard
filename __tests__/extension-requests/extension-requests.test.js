const puppeteer = require('puppeteer');
const {
  extensionRequestsList,
  extensionRequestsListPending,
  extensionRequestsListApproved,
  extensionRequestResponse,
  extensionRequestsListPendingDescending,
  extensionRequestsListUserSearch,
  extensionRequestListForAuditLogs,
} = require('../../mock-data/extension-requests');
const {
  extensionRequestLogs,
  extensionRequestLogsInSentence,
} = require('../../mock-data/logs');
const {
  userSunny,
  userRandhir,
  allUsersData,
  superUserForAudiLogs,
  searchedUserForAuditLogs,
} = require('../../mock-data/users');
const { usersStatus } = require('../../mock-data/users-status');
const { taskDone, auditLogTasks } = require('../../mock-data/tasks/index');

describe('Tests the Extension Requests Screen', () => {
  let browser;
  let page;
  let title;
  let searchBar;
  let filterButton;
  let extensionRequestsElement;
  jest.setTimeout(60000);

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
      ignoreHTTPSErrors: true,
      args: ['--incognito', '--disable-web-security'],
      devtools: false,
    });
    page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on('request', (interceptedRequest) => {
      const url = interceptedRequest.url();
      if (
        url ===
        'https://api.realdevsquad.com/extension-requests?order=asc&size=5&q=status%3APENDING'
      ) {
        interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          body: JSON.stringify(extensionRequestsListPending),
        });
      } else if (
        url === 'https://api.realdevsquad.com/users/search?role=in_discord'
      ) {
        interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          body: JSON.stringify(allUsersData),
        });
      } else if (url === 'https://api.realdevsquad.com/users/status') {
        interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          body: JSON.stringify(usersStatus),
        });
      } else if (
        url ===
        'https://api.realdevsquad.com/extension-requests?order=desc&size=5&q=status%3APENDING'
      ) {
        interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          body: JSON.stringify(extensionRequestsListPendingDescending),
        });
      } else if (
        url === 'https://api.realdevsquad.com/users?search=sunny&size=1'
      ) {
        interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          body: JSON.stringify(userSunny),
        });
      } else if (
        url ===
        'https://api.realdevsquad.com/tasks/PYj79ki2agB0q5JN3kUf/details'
      ) {
        interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          body: JSON.stringify(taskDone),
        });
      } else if (
        url ===
        'https://api.realdevsquad.com/tasks/GCYGDiU0lw4fwc3qljSY/details'
      ) {
        interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          body: JSON.stringify(taskDone),
        });
      } else if (
        url ===
        'https://api.realdevsquad.com/extension-requests/QISvF7kAmnD9vXHwwIsG/status'
      ) {
        interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          body: JSON.stringify(extensionRequestResponse),
        });
      } else if (
        url ===
        'https://api.realdevsquad.com/extension-requests/lGQ3AjUlgNB6Jd8jXaEC/status'
      ) {
        interceptedRequest.respond({
          status: 400,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          body: JSON.stringify(extensionRequestResponse),
        });
      } else if (
        url ===
        'https://api.realdevsquad.com/extension-requests/lGQ3AjUlgNB6Jd8jXaEC'
      ) {
        interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          body: JSON.stringify({}),
        });
      } else if (
        url ===
        'https://api.realdevsquad.com/extension-requests?order=asc&size=5&q=status%3APENDING%2Cassignee%3AiODXB6gfsjaZB9p0XlBw'
      ) {
        interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          body: JSON.stringify(extensionRequestsListUserSearch),
        });
      } else if (
        url ===
        'https://api.realdevsquad.com/extension-requests?order=asc&size=5&q=status%3APENDING%2Cassignee%3AiODXB6gfsjaZB9p0XlBw%2B7yzVDl8s1ORNCtH9Ps7K'
      ) {
        interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          body: JSON.stringify(extensionRequestsList),
        });
      } else if (
        url ===
        'https://api.realdevsquad.com/tasks/mZB0akqPUa1GQQdrgsx7/details'
      ) {
        interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          body: JSON.stringify(auditLogTasks['mZB0akqPUa1GQQdrgsx7']),
        });
      } else if (
        url ===
        'https://api.realdevsquad.com/tasks/7gZ9E0XTQCEFvUynVqAw/details'
      ) {
        interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          body: JSON.stringify(auditLogTasks['7gZ9E0XTQCEFvUynVqAw']),
        });
      } else if (
        url === 'https://api.realdevsquad.com/users?search=testunity&size=1'
      ) {
        interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          body: JSON.stringify(searchedUserForAuditLogs['testunity']),
        });
      } else if (
        url === 'https://api.realdevsquad.com/users?search=joygupta&size=1'
      ) {
        interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          body: JSON.stringify(searchedUserForAuditLogs['joygupta']),
        });
      } else if (
        url ===
        'https://api.realdevsquad.com/extension-requests?order=asc&size=5&q=status%3AAPPROVED%2BPENDING%2BDENIED'
      ) {
        interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          body: JSON.stringify(extensionRequestListForAuditLogs),
        });
      } else if (url === 'https://api.realdevsquad.com/users/self') {
        interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          body: JSON.stringify(superUserForAudiLogs),
        });
      } else if (
        url ===
        'https://api.realdevsquad.com/logs/extensionRequests/?meta.extensionRequestId=fuQs71a0Y7BX3n4rc5Ii&dev=true'
      ) {
        interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          body: JSON.stringify(extensionRequestLogs['fuQs71a0Y7BX3n4rc5Ii']),
        });
      } else if (
        url ===
        'https://api.realdevsquad.com/extension-requests/fuQs71a0Y7BX3n4rc5Ii?dev=true'
      ) {
        interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        });
      } else if (
        url ===
        'https://api.realdevsquad.com/logs/extensionRequests/?meta.extensionRequestId=lw7dRB0I3a6ivsFR5Izs&dev=true'
      ) {
        interceptedRequest.respond({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
          body: JSON.stringify(extensionRequestLogs['lw7dRB0I3a6ivsFR5Izs']),
        });
      } else {
        interceptedRequest.continue();
      }
    });

    await page.goto('http://localhost:8000/extension-requests');

    await page.waitForNetworkIdle();

    title = await page.$('.header h1');
    searchBar = await page.$('#search');
    filterButton = await page.$('#filter-button');
    extensionRequestsElement = await page.$('.extension-request');
  });

  afterEach(async () => {
    await page.goto('http://localhost:8000/extension-requests');
    await page.waitForNetworkIdle();
  });
  afterAll(async () => {
    await browser.close();
  });
  it('Checks the UI elements on Extension requests listing page', async () => {
    title = await page.$('.header h1');
    searchBar = await page.$('#search');
    filterButton = await page.$('#filter-button');
    extensionCardsList = await page.$$('.extension-card');
    extensionRequestsElement = await page.$('.extension-requests');
    expect(title).toBeTruthy();
    expect(searchBar).toBeTruthy();
    expect(filterButton).toBeTruthy();
    expect(extensionCardsList.length).toBe(4);
    expect(extensionRequestsElement).toBeTruthy();
  });

  it('checks the search functionality', async () => {
    await page.type('#assignee-search', 'sunny');
    await page.keyboard.press('Enter');
    await page.waitForNetworkIdle();

    const cardsList = await page.$$('.extension-card');
    expect(cardsList.length).toBe(1);
    const cardTextContent = await page.evaluate(
      (element) => element.textContent,
      cardsList[0],
    );
    expect(cardTextContent).toContain('Sunny');
  });

  it('clicking on filter button should display filter modal', async () => {
    const modal = await page.$('.filter-modal');
    expect(await modal.evaluate((el) => el.classList.contains('hidden'))).toBe(
      true,
    );
    await page.click('#filter-button');
    expect(modal).not.toBeNull();
    expect(await modal.evaluate((el) => el.classList.contains('hidden'))).toBe(
      false,
    );
    await page.click('#filter-button');
    expect(await modal.evaluate((el) => el.classList.contains('hidden'))).toBe(
      true,
    );
  });

  it('checks if PENDING is checked by default', async () => {
    const filterButton = await page.$('#filter-button');
    await filterButton.click();

    await page.waitForSelector('.filter-modal');

    const activeFilter = await page.$('input[value="PENDING"]');

    const currentState = await activeFilter.getProperty('checked');
    const isChecked = await currentState.jsonValue();
    expect(isChecked).toBe(true);
  });

  it('Selecting filters and clicking on apply should filter extension requests list', async () => {
    await page.click('#filter-button');
    await page.click('input[value="PENDING"]');

    await page.click('input[value="APPROVED"]');

    await page.click('#apply-filter-button');
    await page.waitForNetworkIdle();

    const cardsList = await page.$$('.extension-request');

    expect(cardsList).not.toBeNull();
    expect(cardsList.length).toBeGreaterThanOrEqual(0);
  });

  it('clears the filter when the Clear button is clicked', async () => {
    const filterButton = await page.$('#filter-button');
    await filterButton.click();

    await page.waitForSelector('.filter-modal');

    const activeFilter = await page.$('input[value="APPROVED"]');
    await activeFilter.click();

    const clearButton = await page.$('.filter-modal #clear-button');
    await clearButton.click();

    await page.waitForSelector('.filter-modal', { hidden: true });

    const currentState = await activeFilter.getProperty('checked');
    const isChecked = await currentState.jsonValue();
    expect(isChecked).toBe(false);
  });
  it('should display cards of when multiple usernames are entered', async () => {
    await page.type('#assignee-search', 'sunny,randhir');
    await page.keyboard.press('Enter');
    await page.waitForNetworkIdle();
    const cardsList = await page.$$('.extension-card');
    expect(cardsList.length).toBe(2);
    const userName1 = await cardsList[0].$eval(
      '.assignee-name',
      (el) => el.textContent,
    );
    const userName2 = await cardsList[1].$eval(
      '.assignee-name',
      (el) => el.textContent,
    );
    expect(userName1.toLowerCase()).toContain('sunny');
    expect(userName2.toLowerCase()).toContain('randhir');
  });

  it('Checks details of the first extension card', async () => {
    extensionCardsList = await page.$$('.extension-card');

    const firstExtensionCard = extensionCardsList[0];

    const titleText = await firstExtensionCard.$eval(
      '.card-title',
      (el) => el.textContent,
    );
    expect(titleText).toBe('A title');

    const taskStatusText = await firstExtensionCard.$eval(
      '.task-details-container',
      (el) => el.textContent,
    );
    expect(taskStatusText).toContain('DONE');

    const taskAssigneeName = await firstExtensionCard.$eval(
      '.assignee-name',
      (el) => el.textContent,
    );
    expect(taskAssigneeName).toBe('Sunny');
  });
  test('Checks if the Commited Hours Card is displayed on hover', async () => {
    const trigger = await page.$('.commited-hours-trigger');
    await trigger.hover();

    const isCardVisible = await page.evaluate(() => {
      const hoverCard = document.querySelector('.comitted-hours');
      const style = window.getComputedStyle(hoverCard);

      return style && style.display !== 'none';
    });
    expect(isCardVisible).toBe(true);
  });
  it('Checks that accordion content is hidden by default', async () => {
    const firstAccordionContent = await page.$('.extension-card .panel');
    const firstAccordionIsHidden = await firstAccordionContent.evaluate(
      (el) => el.style.maxHeight === '',
    );

    expect(firstAccordionIsHidden).toBe(true);
  });

  it('Opens and closes accordion content on click', async () => {
    const firstAccordionButton = await page.$(
      '.extension-card:first-child .accordion',
    );

    await firstAccordionButton.click();

    const firstAccordionContent = await page.$(
      '.extension-card:first-child .panel',
    );
    const firstAccordionIsVisible = await firstAccordionContent.evaluate(
      (el) => el.style.maxHeight !== '',
    );
    expect(firstAccordionIsVisible).toBe(true);

    await firstAccordionButton.click();

    const firstAccordionIsHidden = await firstAccordionContent.evaluate(
      (el) => el.style.maxHeight === '',
    );
    expect(firstAccordionIsHidden).toBe(true);
  });

  it('Checks that new items are loaded when scrolled to the bottom', async () => {
    extensionCardsList = await page.$$('.extension-card');

    expect(extensionCardsList.length).toBe(4);

    await page.evaluate(() => {
      const element = document.querySelector('.virtual');
      if (element) {
        element.scrollIntoView({ behavior: 'auto' });
      }
    });

    await page.waitForNetworkIdle();

    extensionCardsList = await page.$$('.extension-card');
    expect(extensionCardsList.length).toBe(8);
  });

  it('Checks that the card is removed from display when api call is successful', async () => {
    const extensionCards = await page.$$('.extension-card');
    await page.setViewport({ width: 1200, height: 300 });

    for (const card of extensionCards) {
      const titleText = await card.$eval(
        '.card-title',
        (title) => title.textContent,
      );

      if (titleText.includes('A new title')) {
        const approveButton = await card.$('.approve-button');
        await approveButton.click();
        break;
      }
    }
    await page.waitForTimeout(1650);

    const extensionCardsAfter = await page.$$('.extension-card');

    expect(extensionCardsAfter.length).toBe(3);
  });

  it('Checks whether the card is not removed from display when api call is unsuccessful', async () => {
    const extensionCards = await page.$$('.extension-card');

    for (const card of extensionCards) {
      const titleText = await card.$eval(
        '.card-title',
        (title) => title.textContent,
      );

      if (titleText.includes('A title')) {
        const approveButton = await card.$('.approve-button');
        await approveButton.click();
        break;
      }
    }
    await page.waitForTimeout(850);

    const extensionCardsAfter = await page.$$('.extension-card');

    expect(extensionCardsAfter.length).toBe(4);
  });

  it('Checks whether the timestamp are sorted', async () => {
    const extensionCards = await page.$$('.extension-card');

    const requestDaysArray = [];
    for (const card of extensionCards) {
      const requestedDays = await card.$eval(
        '.requested-day > .tooltip',
        (requestDays) => requestDays.textContent,
      );
      requestDaysArray.push(requestedDays.slice(5));
    }
    const sortedRequestDaysArray = [...requestDaysArray].sort();
    expect(requestDaysArray).toEqual(sortedRequestDaysArray);
  });

  it('Checks whether the cards displayed in descending order when sort icon is clicked', async () => {
    const sortButton = await page.$('.sort-button');

    await sortButton.click();

    const extensionCards = await page.$$('.extension-card');

    const requestDaysArray = [];
    for (const card of extensionCards) {
      const requestedDays = await card.$eval(
        '.requested-day > .tooltip',
        (requestDays) => requestDays.textContent,
      );
      requestDaysArray.push(requestedDays.slice(5));
    }

    const sortedRequestDaysArray = [...requestDaysArray].sort().reverse();

    expect(requestDaysArray).toEqual(sortedRequestDaysArray);
  });

  test('Checks whether the card can be edited', async () => {
    await page.click('.edit-button');

    const newTitle = 'New Title Text';
    await page.$eval('.title-text-input', (el) => (el.value = ''));
    await page.type('.title-text-input', newTitle);

    const newDate = '2023-09-19T22:20';
    await page.evaluate((newDate) => {
      document.querySelector('.date-input').value = newDate;
    }, newDate);

    await page.$eval('.input-text-area', (el) => (el.innerText = ''));
    const newReason = 'Updated reason text';
    await page.type('.input-text-area', newReason);

    await page.click('.update-button');

    await page.waitForTimeout(1100);

    await page.waitForNetworkIdle();

    const updatedTitle = await page.$eval(
      '.card-title',
      (el) => el.textContent,
    );

    expect(updatedTitle).toBe(newTitle);

    const updatedDateValue = await page.$eval('.date-input', (el) => el.value);
    expect(updatedDateValue).toBe(newDate);

    const updatedReasonValue = await page.$eval(
      '.input-text-area',
      (el) => el.value,
    );
    expect(updatedReasonValue).toBe(newReason);
  });

  test('Checks whether the card will return to initial state if the update is cancelled', async () => {
    await page.click('.edit-button');

    const newTitle = 'New Title Text';
    await page.type('.title-text-input', newTitle);

    const newDate = '2023-09-19T22:20';
    await page.evaluate((newDate) => {
      document.querySelector('.date-input').value = newDate;
    }, newDate);
    const newReason = 'Updated reason text';
    await page.type('.input-text-area', newReason);

    await page.click('.cancel-button');

    await page.waitForNetworkIdle();

    const originalTitle = await page.$eval(
      '.card-title',
      (el) => el.textContent,
    );

    expect(originalTitle).toBe('A title');

    const originalReasonValue = await page.$eval(
      '.reason-text',
      (el) => el.textContent,
    );

    expect(originalReasonValue).toBe('test reason');
  });

  test('Checks whether tooltip is visible on hover', async () => {
    const element = await page.$('.tooltip-container');

    await element.hover();

    await page.waitForTimeout(500);
    const isTooltipVisible = await page.evaluate(() => {
      const tooltip = document.querySelector('.tooltip');
      const style = window.getComputedStyle(tooltip);

      return (
        style &&
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        style.opacity !== '0'
      );
    });

    expect(isTooltipVisible).toBe(true);
  });
  it('Validating audit logs for extension request', async () => {
    // Visit extension request under dev flag
    await page.goto('http://localhost:8000/extension-requests/?dev=true');
    const extensionRequestIds = [
      'log-container-fuQs71a0Y7BX3n4rc5Ii',
      'log-container-lw7dRB0I3a6ivsFR5Izs',
    ];

    // Select all types of status of extension requests
    await page.click('#filter-button');
    await page.click('input[value="APPROVED"]');
    await page.click('input[value="DENIED"]');
    await page.click('#apply-filter-button');
    await page.waitForNetworkIdle();

    // Checking if both the extension request cards are renedered or not
    const cardsList = await page.$$('.extension-card');
    expect(cardsList.length).toBe(2);

    const accordionButton = await page.$$('.accordion');
    // Validate first extension card which is based on updated logs
    accordionButton[0].click();
    await page.waitForNetworkIdle();
    let extensionLogsForFirstER = await page.$(`#${extensionRequestIds[0]}`);
    let logs = await extensionLogsForFirstER.$$('.log-div');
    expect(Array.from(logs).length).toBe(6);
    // Array.from(logs).forEach(async (log) => {
    //   const innerText = await log.evaluate((element) => element.innerText);
    //   expect(extensionRequestLogsInSentence[extensionRequestIds[0]]).toContain(
    //     innerText,
    //   );
    // });

    // Validating if it is backward compatible or not
    accordionButton[1].click();
    await page.waitForNetworkIdle();
    extensionLogsForFirstER = await page.$(`#${extensionRequestIds[1]}`);
    logs = await extensionLogsForFirstER.$$('.log-div');
    expect(Array.from(logs).length).toBe(1);
    // Array.from(logs).forEach(async (log) => {
    //   const innerText = await log.evaluate((element) => element.innerText);
    //   expect(extensionRequestLogsInSentence[extensionRequestIds[1]]).toContain(
    //     innerText,
    //   );
    // });
  });

  test('Checks the Request Number and request value element on Extension requests listing page', async () => {
    const url = 'http://localhost:8000/extension-requests/?dev=true'; // Include the dev parameter in the URL
    await page.goto(url);

    const extensionRequestNumberContainer = await page.$$(
      '.extension-request-number',
    );
    const extensionRequestNumberText = extensionRequestNumberContainer[0];
    expect(extensionRequestNumberText).toBeTruthy();

    const cardNumber1Value = await extensionRequestNumberContainer[1].evaluate(
      (node) => node.textContent,
    );
    expect(cardNumber1Value).toBe('5');
  });

  test('Default Request Number to 1 if requestNumber field is missing in API Response', async () => {
    const url = 'http://localhost:8000/extension-requests/?dev=true'; // Include the dev parameter in the URL
    await page.goto(url);

    const extensionRequestNumberContainer = await page.$$(
      '.extension-request-number',
    );

    const extensionRequestNumberText = extensionRequestNumberContainer[2];
    expect(extensionRequestNumberText).toBeTruthy();

    const cardNumber2Value = await extensionRequestNumberContainer[3].evaluate(
      (node) => node.textContent,
    );
    expect(cardNumber2Value).toBe('1');
  });

  it('Validating if audit logs are being generated in realtime', async () => {
    // Visit extension request under dev flag
    await page.goto('http://localhost:8000/extension-requests/?dev=true');
    const extensionRequestIds = [
      'log-container-fuQs71a0Y7BX3n4rc5Ii',
      'log-container-lw7dRB0I3a6ivsFR5Izs',
    ];

    // Select all types of status of extension requests
    await page.click('#filter-button');
    await page.click('input[value="APPROVED"]');
    await page.click('input[value="DENIED"]');
    await page.click('#apply-filter-button');
    await page.waitForNetworkIdle();

    // Checking if both the extension request cards are renedered or not
    const cardsList = await page.$$('.extension-card');
    expect(cardsList.length).toBe(2);

    const accordionButton = await page.$$('.accordion');
    // Validate first extension card which is based on updated logs
    accordionButton[0].click();
    await page.waitForNetworkIdle();
    let extensionLogsForFirstER = await page.$(`#${extensionRequestIds[0]}`);
    let logs = await extensionLogsForFirstER.$$('.log-div');

    // Click the first element with class '.edit-button'
    await page.$$eval('.edit-button', (buttons) => buttons[0].click());
    const newTitle = 'This is a new title test case';
    const newDate = '2024-09-19T22:20';
    const newReason = 'This is the new reason';

    // Updating all the input fields
    await page.$$eval(
      '.title-text-input',
      (inputFields, newTitle) => (inputFields[0].value = newTitle),
      newTitle,
    );
    await page.$$eval(
      '.date-input',
      (inputFields, newDate) => (inputFields[0].value = newDate),
      newDate,
    );
    await page.$$eval(
      '.input-text-area',
      (inputFields, newReason) => (inputFields[0].value = newReason),
      newReason,
    );

    await page.$$eval('.update-button', (buttons) => buttons[0].click());
    await page.waitForTimeout(1100);
    await page.waitForNetworkIdle();
    logs = await extensionLogsForFirstER.$$('.log-div');
    expect(Array.from(logs).length).toBe(9);
  });
});
