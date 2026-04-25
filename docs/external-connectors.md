# Frontend Specification – Integrations and UX (MVP)

## Overview

This document defines frontend responsibilities for:

* authentication UI
* integration management UI
* user interaction flows
* state representation of integrations

The frontend is responsible for enabling users to connect, manage, and understand integrations.

---

## Authentication UI

### Requirements

* Provide login via Google.
* Allow users to access the application.

### Behavior

* Login creates or accesses user account.
* No integrations are connected automatically after login.

---

## Integrations List View

### Requirements

Display a list of integrations:

* Google (Gmail, Calendar)
* GitHub
* Todoist
* Microsoft Teams
* Discord

---

### Integration Item Structure

Each item must display:

* integration name
* connection status:

  * not connected
  * connected
* primary action:

  * “Connect”

---

## Connection Flow (UI)

### Steps

1. User clicks “Connect”.
2. Frontend requests backend to start OAuth.
3. User is redirected to provider.
4. After authorization, user returns to the app.
5. UI updates status to “Connected”.

---

## Connected State

### UI Elements

For connected integrations, display:

* connected account identifier (e.g., email)
* actions:

  * “Configure”
  * “Switch account”
  * “Disconnect”

---

## Reconnection UX

When integration is already connected:

* display current account
* allow reconnecting or switching account

---

## Disconnection UX

### Behavior

* User clicks “Disconnect”.
* UI updates state to “Not connected”.
* No historical data messaging required in MVP UI.

---

## Interaction Model

### Rules

* Do not use toggle switches.
* Use explicit buttons for actions.
* Reflect asynchronous operations (loading states, redirects).

---

## State Management

### Requirements

Frontend must track:

* connection status per integration
* loading state during OAuth
* connected account metadata

---

## Error Handling

### Requirements

* display connection errors
* allow retry
* handle failed OAuth gracefully

---

## UX Principles

* simple and explicit interactions
* no automatic connections
* clear system state visibility
* minimal cognitive load

---

## Frontend Responsibilities

The frontend must:

* enable login
* display integrations
* initiate connection flows
* display connection state
* allow managing integrations

---

## Extensibility

The UI must support:

* adding new integrations
* scaling list of connectors
* extending configuration options

---
