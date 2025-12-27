import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { CyberButton } from "@/components/CyberButton";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground p-4">
      <Card className="w-full max-w-md border-white/10 bg-card/80 backdrop-blur-md">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <h1 className="text-2xl font-display font-bold text-destructive">System Error 404</h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground font-mono mb-6">
            The quantum state you are looking for has collapsed or does not exist in this dimension.
          </p>

          <Link href="/">
             <CyberButton variant="outline" className="w-full">
               Return to Matrix
             </CyberButton>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
