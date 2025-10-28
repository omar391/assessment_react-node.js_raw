SHELL := /bin/sh

ROOT_DIR := $(CURDIR)
BACKEND_DIR := $(ROOT_DIR)/backend
FRONTEND_DIR := $(ROOT_DIR)/frontend

.PHONY: install install-backend install-frontend start-backend start-frontend dev clean lint-frontend test test-backend test-frontend test-e2e

install: install-backend install-frontend

install-backend:
	bun install --cwd "$(BACKEND_DIR)"

install-frontend:
	bun install --cwd "$(FRONTEND_DIR)"

start-backend:
	bun run --cwd "$(BACKEND_DIR)" start

start-frontend:
	bun run --cwd "$(FRONTEND_DIR)" dev

lint-frontend:
	bun run --cwd "$(FRONTEND_DIR)" lint

test: test-backend test-frontend test-e2e

test-backend:
	bun run --cwd "$(BACKEND_DIR)" test

test-frontend:
	bun run --cwd "$(FRONTEND_DIR)" test

test-e2e:
	@if ! command -v xvfb-run > /dev/null 2>&1; then \
		echo "Installing Playwright dependencies..."; \
		bunx playwright install-deps || true; \
	fi
	@if ! test -d "$(HOME)/.cache/ms-playwright/chromium-"*; then \
		echo "Installing Playwright browsers..."; \
		bunx playwright install chromium || echo "Warning: Playwright browser installation may have failed"; \
	fi
	PLAYWRIGHT_BROWSERS_PATH=$(HOME)/.cache/ms-playwright DISPLAY=:99 bun run --cwd "$(FRONTEND_DIR)" test:e2e

dev:
	@echo "Starting backend (port 4000) and frontend (Vite)"
	@trap 'kill 0' INT TERM EXIT; \
		bun run --cwd "$(BACKEND_DIR)" start & \
		bun run --cwd "$(FRONTEND_DIR)" dev

clean:
	rm -rf "$(BACKEND_DIR)/node_modules" "$(FRONTEND_DIR)/node_modules"
