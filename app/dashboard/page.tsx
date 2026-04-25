import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const { userId } = await auth();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-lg text-muted-foreground">
        Zalogowano ({userId}) — dashboard w budowie.
      </p>
    </main>
  );
}
