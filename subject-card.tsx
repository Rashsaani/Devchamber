import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Subject } from "@shared/schema";
import { Link } from "wouter";

export default function SubjectCard({ subject }: { subject: Subject }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{subject.name}</CardTitle>
        <CardDescription>{subject.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {subject.content.modules.length} modules
          </div>
          <Link href={`/subjects/${subject.id}`}>
            <Button className="w-full">View Course</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
