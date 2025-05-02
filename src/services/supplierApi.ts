
// Mock API endpoints for supplier operations

interface Operation {
  id: string;
  name: string;
  description: string;
  location: string;
  workers: number;
  operationType?: string;
  workingHours?: string;
  wageInfo?: string;
  riskLevel: string;
  createdAt: string;
}

// Fetch operations for the current supplier
export const fetchSupplierOperations = async (): Promise<Operation[]> => {
  // In a real app, this would be an API call
  console.log("Fetching supplier operations");
  
  // Mock response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "op_1",
          name: "Garment Factory - Dhaka",
          description: "Clothing production and assembly",
          location: "Dhaka, Bangladesh",
          workers: 120,
          operationType: "manufacturing",
          workingHours: "48 hours/week",
          wageInfo: "Minimum wage + productivity bonus",
          riskLevel: "low",
          createdAt: "2025-04-10"
        },
        {
          id: "op_2",
          name: "Fabric Dyeing Plant",
          description: "Textile dyeing and finishing",
          location: "Chittagong, Bangladesh",
          workers: 80,
          operationType: "processing",
          workingHours: "45 hours/week",
          wageInfo: "Fixed salary + overtime",
          riskLevel: "medium",
          createdAt: "2025-04-15"
        }
      ]);
    }, 500);
  });
};

// Create a new operation
export const createOperation = async (data: any): Promise<Operation> => {
  console.log("Creating operation with data:", data);
  
  // Mock response - in a real app, this would post to an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `op_${Date.now()}`,
        name: data.name,
        description: data.description,
        location: data.location,
        workers: data.workers || 0,
        operationType: data.operationType,
        workingHours: data.workingHours,
        wageInfo: data.wageInfo,
        riskLevel: Math.random() > 0.5 ? "low" : "medium", // Simulate random risk level
        createdAt: new Date().toISOString().split("T")[0]
      });
    }, 800);
  });
};

// Update an existing operation
export const updateOperation = async (id: string, data: any): Promise<Operation> => {
  console.log(`Updating operation ${id} with data:`, data);
  
  // Mock response - in a real app, this would put to an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: data.name,
        description: data.description,
        location: data.location,
        workers: data.workers || 0,
        operationType: data.operationType,
        workingHours: data.workingHours,
        wageInfo: data.wageInfo,
        riskLevel: data.riskLevel || "medium",
        createdAt: data.createdAt || new Date().toISOString().split("T")[0]
      });
    }, 800);
  });
};

// Delete an operation
export const deleteOperation = async (id: string): Promise<void> => {
  console.log(`Deleting operation ${id}`);
  
  // Mock response - in a real app, this would delete via an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 800);
  });
};

// Upload a document related to an operation
export const uploadDocument = async (operationId: string, file: File): Promise<{ id: string; filename: string }> => {
  console.log(`Uploading document for operation ${operationId}:`, file.name);
  
  // Mock response - in a real app, this would upload to storage via an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `doc_${Date.now()}`,
        filename: file.name
      });
    }, 1200);
  });
};
