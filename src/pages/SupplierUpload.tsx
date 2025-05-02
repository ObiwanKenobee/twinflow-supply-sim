
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, UploadCloud } from "lucide-react";
import { createOperation } from "@/services/supplierApi";

export default function SupplierUpload() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    operationType: "",
    workers: "",
    workingHours: "",
    wageInfo: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.description || !formData.location) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Convert workers to number
      const operationData = {
        ...formData,
        workers: parseInt(formData.workers) || 0,
      };
      
      // Create operation
      await createOperation(operationData);
      
      toast({
        title: "Success",
        description: "Operation details submitted successfully",
      });
      
      navigate("/supplier");
    } catch (error) {
      console.error("Error submitting operation:", error);
      toast({
        title: "Error",
        description: "Failed to submit operation details",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="Add Operation Details">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Operation Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Garment Manufacturing Unit - Dhaka"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe what this operation or facility does"
                    rows={3}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="operationType">Operation Type</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange("operationType", value)}
                      value={formData.operationType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="assembly">Assembly</SelectItem>
                        <SelectItem value="rawMaterial">Raw Material Production</SelectItem>
                        <SelectItem value="logistics">Logistics & Distribution</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Labor Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workers">Number of Workers</Label>
                  <Input
                    id="workers"
                    name="workers"
                    type="number"
                    value={formData.workers}
                    onChange={handleInputChange}
                    placeholder="e.g., 150"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="workingHours">Working Hours</Label>
                  <Input
                    id="workingHours"
                    name="workingHours"
                    value={formData.workingHours}
                    onChange={handleInputChange}
                    placeholder="e.g., 40 hours/week, 8 hours/day"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="wageInfo">Wage Information</Label>
                <Textarea
                  id="wageInfo"
                  name="wageInfo"
                  value={formData.wageInfo}
                  onChange={handleInputChange}
                  placeholder="Describe wage structure, benefits, etc."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Supporting Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer" onClick={() => document.getElementById('file-upload')?.click()}>
                <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm font-medium mb-1">
                  {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, DOCX, XLSX, MP3 or MP4 (max. 10MB)
                </p>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.mp3,.mp4"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => navigate("/supplier")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Operation"
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
