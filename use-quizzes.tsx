import { useQuery, useMutation } from "@tanstack/react-query";
import { Quiz, Progress } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export function useQuizzesBySubject(subjectId: number) {
  return useQuery<Quiz[]>({
    queryKey: [`/api/subjects/${subjectId}/quizzes`],
  });
}

export function useProgress() {
  return useQuery<Progress[]>({
    queryKey: ["/api/progress"],
  });
}

export function useSaveProgress() {
  return useMutation({
    mutationFn: async (progress: Omit<Progress, "id">) => {
      const res = await apiRequest("POST", "/api/progress", progress);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
    },
  });
}
