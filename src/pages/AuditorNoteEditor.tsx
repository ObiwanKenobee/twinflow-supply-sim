import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { 
  AlertCircle,
  ArrowLeft, 
  CheckCircle2, 
  CircleAlert,
  Loader2, 
  MessageSquare, 
  Save
} from "lucide-react";
import { fetchSupplyChainForAudit, createAuditNote, fetchAuditNotes } from "@/services/auditorApi";
import { Badge } from "@/components/ui/badge";

type NoteType = 'comment' | 'flag' | 'recommendation';
type SeverityLevel = 'low' | 'medium' | 'high';

interface AuditNote {
  id: string;
  supplyChainId: string;
  noteType: NoteType;
  content: string;
  severity?: SeverityLevel;
  status: 'draft' | 'submitted' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

interface SupplyChainDetail {
  id: string;
  companyName: string;
  description: string;
  industryType: string;
  factoryCount: number;
  locations: string[];
  overallRisk: string;
  steps: {
    id: string;
    name: string;
    location: string;
    riskLevel: string;
    laborInfo: string;
  }[];
}

export default function AuditorNoteEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supplyChain, setSupplyChain] = useState<SupplyChainDetail | null>(null);
  const [auditNotes, setAuditNotes] = useState<AuditNote[]>([]);
  
  const [newNote, setNewNote] = useState<{
    noteType: NoteType;
    content: string;
    severity: SeverityLevel;
  }>({
    noteType: 'comment',
    content: '',
    severity: 'medium',
  });

  useEffect(() => {
    if (id) {
      loadSupplyChain(id);
      loadAuditNotes(id);
    }
  }, [id]);

  const loadSupplyChain = async (chainId: string) => {
    try {
      const data = await fetchSupplyChainForAudit(chainId);
      setSupplyChain(data);
    } catch (error) {
      console.error("Error loading supply chain:", error);
      toast({
        title: "Error",
        description: "Failed to load supply chain details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadAuditNotes = async (chainId: string) => {
    try {
      const notes = await fetchAuditNotes(chainId);
      setAuditNotes(notes);
    } catch (error) {
      console.error("Error loading audit notes:", error);
    }
  };

  const handleSubmitNote = async () => {
    if (!id || !newNote.content.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a note before submitting",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const noteData = {
        ...newNote,
        supplyChainId: id,
      };
      
      const response = await createAuditNote(noteData);
      
      // Add the new note to the list
      setAuditNotes(prev => [...prev, response]);
      
      // Reset form
      setNewNote({
        noteType: 'comment',
        content: '',
        severity: 'medium',
      });
      
      toast({
        title: "Success",
        description: "Audit note created successfully",
      });
    } catch (error) {
      console.error("Error submitting audit note:", error);
      toast({
        title: "Error",
        description: "Failed to submit audit note",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Loading...">
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!supplyChain) {
    return (
      <DashboardLayout title="Error">
        <Alert variant="destructive" className="max-w-3xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>
            The requested supply chain could not be found.
          </AlertDescription>
          <Button 
            variant="outline" 
            onClick={() => navigate("/auditor")}
            className="mt-4"
          >
            Return to Dashboard
          </Button>
        </Alert>
      </DashboardLayout>
    );
  }

  const getNoteTypeIcon = (type: string) => {
    switch(type) {
      case 'flag':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'recommendation':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-primary" />;
    }
  };

  const getSeverityBadge = (severity?: string) => {
    if (!severity || severity === 'low') {
      return <Badge className="bg-green-500">Low</Badge>;
    } else if (severity === 'medium') {
      return <Badge className="bg-yellow-500">Medium</Badge>;
    } else {
      return <Badge className="bg-red-500">High</Badge>;
    }
  };

  return (
    <DashboardLayout title={`Audit Review: ${supplyChain?.companyName || ''}`}>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/auditor")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{supplyChain.companyName}</h1>
            <p className="text-muted-foreground">{supplyChain.description}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div 
              className={`h-3 w-3 rounded-full ${
                supplyChain.overallRisk === 'high' ? 'bg-red-500' : 
                supplyChain.overallRisk === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
              }`}>
            </div>
            <span className="text-sm capitalize">{supplyChain.overallRisk} Overall Risk</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="notes">Audit Notes</TabsTrigger>
          <TabsTrigger value="new">Add Note</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Supply Chain Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Industry</p>
                      <p className="font-medium">{supplyChain.industryType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Factories</p>
                      <p className="font-medium">{supplyChain.factoryCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Countries</p>
                      <p className="font-medium">{supplyChain.locations.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Risk Level</p>
                      <p className="font-medium capitalize">{supplyChain.overallRisk}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Key Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {supplyChain.steps.map((step, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">{step.name}</p>
                        <p className="text-sm text-muted-foreground">{step.location}</p>
                        <p className="text-sm text-muted-foreground mt-1">{step.laborInfo}</p>
                      </div>
                      <div className="flex items-center">
                        <div className={`h-3 w-3 rounded-full ${
                          step.riskLevel === 'high' ? 'bg-red-500' : 
                          step.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        } mr-2`}></div>
                        <span className="text-sm capitalize">{step.riskLevel} Risk</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notes">
          <div className="grid gap-6">
            {auditNotes.length > 0 ? (
              <div className="grid gap-4">
                {auditNotes.map((note) => (
                  <Card key={note.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {getNoteTypeIcon(note.noteType)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium capitalize">{note.noteType}</p>
                              {note.noteType === 'flag' && getSeverityBadge(note.severity)}
                            </div>
                            <p className="text-sm">{note.content}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Added on {new Date(note.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Badge
                          className={`${
                            note.status === 'resolved' 
                              ? 'bg-green-500' 
                              : note.status === 'submitted' 
                                ? 'bg-blue-500' 
                                : 'bg-yellow-500'
                          }`}
                        >
                          {note.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CircleAlert className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Audit Notes Yet</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    There are no audit notes for this supply chain. Add a note to start the review process.
                  </p>
                  <Button onClick={() => document.getElementById('new-tab')?.click()}>
                    Add First Note
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="new" id="new-tab">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Add New Audit Note</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Note Type</Label>
                    <Select 
                      value={newNote.noteType}
                      onValueChange={(value: NoteType) => 
                        setNewNote({...newNote, noteType: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select note type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comment">Comment</SelectItem>
                        <SelectItem value="flag">Flag Issue</SelectItem>
                        <SelectItem value="recommendation">Recommendation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {newNote.noteType === 'flag' && (
                    <div className="space-y-2">
                      <Label>Severity</Label>
                      <Select 
                        value={newNote.severity}
                        onValueChange={(value: SeverityLevel) => 
                          setNewNote({...newNote, severity: value})
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Note Content</Label>
                  <Textarea 
                    value={newNote.content}
                    onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                    placeholder={
                      newNote.noteType === 'flag' 
                        ? "Describe the issue you've identified..." 
                        : newNote.noteType === 'recommendation'
                          ? "Provide your recommendation for improvement..."
                          : "Add your audit comments..."
                    }
                    rows={5}
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleSubmitNote}
                    disabled={isSubmitting || !newNote.content.trim()}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Submit Note
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
