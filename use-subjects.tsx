import { useQuery } from "@tanstack/react-query";
import { Subject } from "@shared/schema";

export function useSubjects() {
  return useQuery<Subject[]>({
    queryKey: ["/api/subjects"],
  });
}

export function useSubject(id: number) {
  return useQuery<Subject>({
    queryKey: [`/api/subjects/${id}`],
  });
}
