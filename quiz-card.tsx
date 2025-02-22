import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quiz } from "@shared/schema";
import { Link } from "wouter";

export default function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{quiz.title}</CardTitle>
        <CardDescription>Test your knowledge</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {quiz.questions.length} questions
          </div>
          <Link href={`/quizzes/${quiz.id}`}>
            <Button className="w-full">Start Quiz</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
