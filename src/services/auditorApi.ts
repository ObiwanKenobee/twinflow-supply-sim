
// Mock API endpoints for auditor functionality

interface SupplyChainForAudit {
  id: string;
  companyName: string;
  description: string;
  industryType: string;
  locations: string[];
  factoryCount: number;
  requestDate: string;
  status: 'pending' | 'flagged' | 'verified' | 'rejected';
}

interface AuditNote {
  id: string;
  supplyChainId: string;
  noteType: 'comment' | 'flag' | 'recommendation';
  content: string;
  severity?: 'low' | 'medium' | 'high';
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

// Fetch supply chains available for audit review
export const fetchSupplyChainsForAuditor = async (): Promise<SupplyChainForAudit[]> => {
  console.log("Fetching supply chains for auditor review");
  
  // Mock response - in a real app, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "sc_audit_1",
          companyName: "Global Textiles Ltd.",
          description: "Cotton garment production",
          industryType: "Textiles & Apparel",
          locations: ["India", "Vietnam", "Bangladesh"],
          factoryCount: 4,
          requestDate: "May 1, 2025",
          status: "pending"
        },
        {
          id: "sc_audit_2",
          companyName: "Tech Solutions Inc.",
          description: "Electronics manufacturing",
          industryType: "Electronics",
          locations: ["China", "Malaysia"],
          factoryCount: 2,
          requestDate: "April 28, 2025",
          status: "flagged"
        },
        {
          id: "sc_audit_3",
          companyName: "Green Foods Co.",
          description: "Organic food processing",
          industryType: "Food & Beverage",
          locations: ["Mexico", "USA"],
          factoryCount: 3,
          requestDate: "April 25, 2025",
          status: "verified"
        }
      ]);
    }, 500);
  });
};

// Fetch detailed supply chain data for audit
export const fetchSupplyChainForAudit = async (id: string): Promise<SupplyChainDetail> => {
  console.log(`Fetching supply chain ${id} for audit`);
  
  // Mock response - in a real app, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        companyName: id.includes("1") ? "Global Textiles Ltd." : "Tech Solutions Inc.",
        description: id.includes("1") ? "Cotton garment production" : "Electronics manufacturing",
        industryType: id.includes("1") ? "Textiles & Apparel" : "Electronics",
        factoryCount: id.includes("1") ? 4 : 2,
        locations: id.includes("1") ? ["India", "Vietnam", "Bangladesh"] : ["China", "Malaysia"],
        overallRisk: id.includes("1") ? "medium" : "high",
        steps: id.includes("1") ? [
          {
            id: "step1",
            name: "Cotton Farming",
            location: "India",
            riskLevel: "medium",
            laborInfo: "Seasonal workers, 200+ during harvest"
          },
          {
            id: "step2",
            name: "Spinning Mill",
            location: "Vietnam",
            riskLevel: "high",
            laborInfo: "75 full-time workers"
          },
          {
            id: "step3",
            name: "Garment Factory",
            location: "Bangladesh",
            riskLevel: "medium",
            laborInfo: "120 workers, mostly women"
          }
        ] : [
          {
            id: "step1",
            name: "Component Manufacturing",
            location: "Shenzhen, China",
            riskLevel: "high",
            laborInfo: "350 workers, 24/7 operation"
          },
          {
            id: "step2",
            name: "Assembly Plant",
            location: "Penang, Malaysia",
            riskLevel: "medium",
            laborInfo: "180 workers, 2 shifts"
          }
        ]
      });
    }, 500);
  });
};

// Create a new audit note
export const createAuditNote = async (data: any): Promise<AuditNote> => {
  console.log("Creating audit note with data:", data);
  
  // Mock response - in a real app, this would post to an API
  return new Promise((resolve) => {
    setTimeout(() => {
      const now = new Date().toISOString();
      resolve({
        id: `note_${Date.now()}`,
        supplyChainId: data.supplyChainId,
        noteType: data.noteType,
        content: data.content,
        severity: data.severity,
        status: 'submitted',
        createdAt: now,
        updatedAt: now
      });
    }, 800);
  });
};

// Update an existing audit note
export const updateAuditNote = async (id: string, data: any): Promise<AuditNote> => {
  console.log(`Updating audit note ${id} with data:`, data);
  
  // Mock response - in a real app, this would put to an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        supplyChainId: data.supplyChainId,
        noteType: data.noteType,
        content: data.content,
        severity: data.severity,
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: new Date().toISOString()
      });
    }, 800);
  });
};

// Delete an audit note
export const deleteAuditNote = async (id: string): Promise<void> => {
  console.log(`Deleting audit note ${id}`);
  
  // Mock response - in a real app, this would delete via an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 800);
  });
};

// Fetch all audit notes for a specific supply chain
export const fetchAuditNotes = async (supplyChainId: string): Promise<AuditNote[]> => {
  console.log(`Fetching audit notes for supply chain ${supplyChainId}`);
  
  // Mock response - in a real app, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo purposes, return some notes for the first chain, empty for others
      if (supplyChainId === "sc_audit_1") {
        resolve([
          {
            id: "note_1",
            supplyChainId,
            noteType: "flag",
            content: "Potential overtime violations detected in spinning mill operation.",
            severity: "high",
            status: "submitted",
            createdAt: "2025-04-28T10:30:00Z",
            updatedAt: "2025-04-28T10:30:00Z"
          },
          {
            id: "note_2",
            supplyChainId,
            noteType: "recommendation",
            content: "Suggest implementing better record-keeping for working hours in Vietnam facility.",
            status: "submitted",
            createdAt: "2025-04-29T14:15:00Z",
            updatedAt: "2025-04-29T14:15:00Z"
          }
        ]);
      } else {
        resolve([]);
      }
    }, 500);
  });
};
