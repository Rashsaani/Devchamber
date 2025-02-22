import { useSubjects } from "@/hooks/use-subjects";
import SubjectCard from "@/components/subject-card";
import NavHeader from "@/components/nav-header";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const { data: subjects, isLoading } = useSubjects();

  return (
    <div className="min-h-screen">
      <NavHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Welcome to Professional Education</h1>
          
          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {subjects?.map((subject) => (
                <SubjectCard key={subject.id} subject={subject} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
