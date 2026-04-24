import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { config } from 'dotenv';

config();

const pages = process.env.TEST_PAGES?.split(',') ?? ['/'];
const baseUrl = process.env.BASE_URL ?? 'http://example.com';

test.describe('automated accessibility checks', () => {
	pages.forEach((route) => {
		test.describe(`${baseUrl}${route}`, () => {
			test('should not have any automatically detectable accessibility issues', async ({ page }) => {
				await page.goto(route);

				const accessibilityScanResults = await new AxeBuilder({
					page,
				}).analyze();

				console.log('******** Violations ********');
				console.log(JSON.stringify(accessibilityScanResults.violations, null, 2));

				expect(accessibilityScanResults.violations.length).toEqual(0);
			});
		});
	});
});
