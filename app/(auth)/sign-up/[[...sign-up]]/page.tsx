import AuthLayout from "@/components/auth/AuthLayout";
import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <AuthLayout title="Utwórz konto" subtitle="Dołącz do sum.io i zacznij śledzić swoje dni">
      <SignUpForm />
    </AuthLayout>
  );
}
