import { useState } from "react";
import { useRoute } from "wouter";
import { useQuizzesBySubject } from "@/hooks/use-quizzes";
import NavHeader from "@/components/nav-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function QuizPage() {
  const [, params] = useRoute("/quizzes/:id");
  const quizId = params ? parseInt(params.id) : 0;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  
  const { data: quiz, isLoading } = useQuizzesBySubject(1); // TODO: Get actual subject ID
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const currentQuiz = quiz?.find(q => q.id === quizId);
  if (!currentQuiz) {
    return <div>Quiz not found</div>;
  }

  const question = currentQuiz.questions[currentQuestion];

  return (
    <div className="min-h-screen">
      <NavHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{currentQuiz.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-lg font-medium">
                  Question {currentQuestion + 1} of {currentQuiz.questions.length}
                </div>
                
                <div className="text-lg">{question.text}</div>

                <RadioGroup
                  value={answers[currentQuestion]}
                  onValueChange={(value) => {
                    const newAnswers = [...answers];
                    newAnswers[currentQuestion] = value;
                    setAnswers(newAnswers);
                  }}
                >
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    disabled={currentQuestion === 0}
                    onClick={() => setCurrentQuestion(curr => curr - 1)}
                  >
                    Previous
                  </Button>
                  <Button
                    disabled={!answers[currentQuestion]}
                    onClick={() => {
                      if (currentQuestion < currentQuiz.questions.length - 1) {
                        setCurrentQuestion(curr => curr + 1);
                      } else {
                        // TODO: Submit quiz
                      }
                    }}
                  >
                    {currentQuestion < currentQuiz.questions.length - 1 ? "Next" : "Submit"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
