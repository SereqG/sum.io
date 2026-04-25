export type IntegrationId =
  | "google_gmail"
  | "google_calendar"
  | "github"
  | "todoist"
  | "microsoft_teams"
  | "discord";

export interface IntegrationConfig {
  id: IntegrationId;
  name: string;
  description: string;
}

export type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

export interface IntegrationState {
  status: ConnectionStatus;
  connectedEmail: string | null;
  errorMessage: string | null;
}

export const MOCK_ACCOUNTS: Record<IntegrationId, string> = {
  google_gmail: "user@gmail.com",
  google_calendar: "user@gmail.com",
  github: "github-username",
  todoist: "user@todoist.com",
  microsoft_teams: "user@company.onmicrosoft.com",
  discord: "Username#1234",
};

export const INTEGRATIONS_CONFIG: IntegrationConfig[] = [
  { id: "google_gmail",    name: "Gmail",           description: "Synchronizuj wiadomości email" },
  { id: "google_calendar", name: "Google Calendar", description: "Synchronizuj kalendarz i zdarzenia" },
  { id: "github",          name: "GitHub",           description: "Śledź aktywność i commity" },
  { id: "todoist",         name: "Todoist",          description: "Importuj zadania i projekty" },
  { id: "microsoft_teams", name: "Microsoft Teams",  description: "Synchronizuj spotkania i kanały" },
  { id: "discord",         name: "Discord",          description: "Śledź aktywność na serwerach" },
];
