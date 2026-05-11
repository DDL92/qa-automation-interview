import dotenv from "dotenv";

dotenv.config();

const parsePositiveInteger = (
  value: string | undefined,
  fallback: number | undefined,
): number | undefined => {
  if (!value) {
    return fallback;
  }

  const parsedValue = Number(value);
  return Number.isInteger(parsedValue) && parsedValue > 0
    ? parsedValue
    : fallback;
};

export const env = {
  apiBaseUrl:
    process.env.API_BASE_URL ?? "https://jsonplaceholder.typicode.com",
  baseUrl: process.env.BASE_URL ?? "https://www.saucedemo.com",
  ci: process.env.CI === "true" || process.env.CI === "1",
  enableAllure: process.env.ENABLE_ALLURE === "true",
  workers: parsePositiveInteger(process.env.PLAYWRIGHT_WORKERS, undefined),
};
