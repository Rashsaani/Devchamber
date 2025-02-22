import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";

export default function NavHeader() {
  const { user, logoutMutation } = useAuth();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-bold">EduPro</a>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/subjects/1">
            <a className="text-sm font-medium">Mathematics</a>
          </Link>
          <Link href="/subjects/2">
            <a className="text-sm font-medium">Science</a>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm">Welcome, {user.firstName}</span>
              <Button
                variant="outline"
                onClick={() => logoutMutation.mutate()}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/auth">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
