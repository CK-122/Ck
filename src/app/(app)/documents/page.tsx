import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GenerateMarksheetForm } from '@/components/documents/generate-marksheet-form';
import { GenerateAdmitCardForm } from '@/components/documents/generate-admit-card-form';

export default function DocumentsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Document Generation</h1>
        <p className="text-muted-foreground">
          Use AI to generate formatted academic documents like marksheets and admit cards.
        </p>
      </div>

      <Tabs defaultValue="marksheet" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="marksheet">Generate Marksheet</TabsTrigger>
          <TabsTrigger value="admit-cards">Generate Admit Cards</TabsTrigger>
        </TabsList>
        <TabsContent value="marksheet">
          <GenerateMarksheetForm />
        </TabsContent>
        <TabsContent value="admit-cards">
          <GenerateAdmitCardForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
