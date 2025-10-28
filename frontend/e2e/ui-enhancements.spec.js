import { test, expect } from "@playwright/test";

const mockFoodItems = [
  {
    _id: "demo-food-id",
    name: "Demo Dish",
    category: "Pizza",
    price: 12,
    description: "Tasty demo dish",
    image: "demo.jpg",
  },
];

test.describe("UI Enhancements", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/api/food/list", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, data: mockFoodItems }),
      });
    });

    await page.route("**/images/**", async (route) => {
      await route.fulfill({ status: 200, body: "" });
    });

    await page.goto("/");
    await page.waitForSelector(".food-item", { timeout: 10000 });
  });

  test("menu image has hover zoom effect", async ({ page }) => {
    const foodItem = page.locator(".food-item").first();
    const foodImage = foodItem.locator(".food-item-image");

    // Get initial transform
    const initialTransform = await foodImage.evaluate(
      (el) => window.getComputedStyle(el).transform,
    );

    // Hover over the container
    await foodItem.locator(".food-item-img-container").hover();

    // Wait for the transform to change after hover
    await page.waitForFunction(
      (selector, initialTransform) => {
        const el = document.querySelector(selector);
        return el && window.getComputedStyle(el).transform !== initialTransform;
      },
      ".food-item-image",
      initialTransform,
    );

    // Get transform after hover
    const hoverTransform = await foodImage.evaluate(
      (el) => window.getComputedStyle(el).transform,
    );

    // Verify transform changed (scale applied)
    expect(hoverTransform).not.toBe(initialTransform);
    expect(hoverTransform).toContain("matrix");
  });

  test("minus icon stays in consistent position when quantity changes", async ({
    page,
  }) => {
    const foodItem = page.locator(".food-item").first();
    const addButton = foodItem.locator(".add");

    // Add item to cart to show counter
    await addButton.click();
    await page.waitForTimeout(500);

    const counter = foodItem.locator(".food-item-counter");
    const minusIcon = counter.locator("img").first();

    // Get initial position of minus icon
    const initialBox = await minusIcon.boundingBox();
    expect(initialBox).not.toBeNull();

    // Add more items to increase quantity
    const plusIcon = counter.locator("img").last();
    await plusIcon.click({ force: true });
    await page.waitForTimeout(500);
    await plusIcon.click({ force: true });
    await page.waitForTimeout(500);

    // Get new position of minus icon
    const newBox = await minusIcon.boundingBox();
    expect(newBox).not.toBeNull();

    // Verify X position hasn't shifted (allowing small rounding differences)
    expect(Math.abs(newBox.x - initialBox.x)).toBeLessThan(2);
  });

  test("image container prevents overflow during zoom", async ({ page }) => {
    const container = page.locator(".food-item-img-container").first();

    const overflow = await container.evaluate(
      (el) => window.getComputedStyle(el).overflow,
    );

    expect(overflow).toBe("hidden");
  });
});
