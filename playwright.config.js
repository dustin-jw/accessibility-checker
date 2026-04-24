import { defineConfig } from '@playwright/test';
import { config } from 'dotenv';

config();

export default defineConfig({
	testDir: './e2e-tests',
	timeout: 30 * 1000,
	expect: {
		timeout: 5000,
	},
	fullyParallel: true,
	forbidOnly: true,
	retries: 2,
	workers: 1,
	reporter: 'list',
	use: {
		baseURL: process.env.BASE_URL ?? 'https://example.com',
		actionTimeout: 0,
		trace: 'on-first-retry',
	},
	projects: [
		{
			name: 'Default',
			testMatch: 'accessibility.spec.js',
			retries: 2,
		},
	],
});
