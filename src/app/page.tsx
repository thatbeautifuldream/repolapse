import { generateTimelapseData } from "@/server/github";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default async function Page() {
  const repoUrl = "https://github.com/thatbeautifuldream/milindmishra.com";

  const timelapseData = await generateTimelapseData(repoUrl);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>GitHub Repository Timelapse</CardTitle>
        </CardHeader>
        <CardContent>
          <form action="" method="get" className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                name="repo"
                defaultValue={repoUrl}
                className="font-mono text-sm"
                placeholder="Enter GitHub repository URL"
              />
            </div>
            <Button type="submit" className="w-full">
              Generate Timelapse
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Timelapse Data</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-auto font-mono text-sm">
            {JSON.stringify(timelapseData, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
