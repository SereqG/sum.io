import AuthLayout from "@/components/auth/AuthLayout";
import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <AuthLayout title="Witaj ponownie" subtitle="Zaloguj się do swojego konta">
      <SignInForm />
    </AuthLayout>
  );
}
