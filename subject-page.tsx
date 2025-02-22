import { useSubject } from "@/hooks/use-subjects";
import { useQuizzesBySubject } from "@/hooks/use-quizzes";
import QuizCard from "@/components/quiz-card";
import NavHeader from "@/components/nav-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useRoute } from "wouter";

export default function SubjectPage() {
  const [, params] = useRoute("/subjects/:id");
  const id = params ? parseInt(params.id) : 0;
  
  const { data: subject, isLoading: isLoadingSubject } = useSubject(id);
  const { data: quizzes, isLoading: isLoadingQuizzes } = useQuizzesBySubject(id);

  if (isLoadingSubject || isLoadingQuizzes) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!subject) {
    return <div>Subject not found</div>;
  }

  return (
    <div className="min-h-screen">
      <NavHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{subject.name}</CardTitle>
              <CardDescription>{subject.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subject.content.modules.map((module, index) => (
                  <div key={index} className="border-t pt-4 first:border-t-0 first:pt-0">
                    <h3 className="font-medium mb-2">{module.title}</h3>
                    <p className="text-sm text-muted-foreground">{module.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-4">Quizzes</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {quizzes?.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
