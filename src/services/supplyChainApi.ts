
import { SimulationResponse } from "./graniteApi";

// Add additional properties to the existing SimulationResponse interface
interface ExtendedSimulationResponse extends SimulationResponse {
  id: string;
  name: string;
  description?: string; // Add description property as optional
  // We removed overallRisk from here since it's already in SimulationResponse with the correct type
}

// Fetch a single supply chain by ID
export const fetchSupplyChain = async (id: string): Promise<ExtendedSimulationResponse> => {
  // In a real app, this would be an API call
  console.log(`Fetching supply chain with ID: ${id}`);
  
  // Mock response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: `Supply Chain ${id}`,
        description: "Cotton from India → spinning in Vietnam → garment in Bangladesh",
        steps: [
          {
            id: "step1",
            name: "Cotton Harvesting",
            location: "India",
            duration: "2 weeks",
            cost: "$5,000",
            laborInfo: "150 workers",
            riskLevel: "medium",
            riskFactors: ["Seasonal labor", "Water usage concerns"]
          },
          {
            id: "step2",
            name: "Spinning Mill",
            location: "Vietnam",
            duration: "1 week",
            cost: "$3,000",
            laborInfo: "75 workers",
            riskLevel: "high",
            riskFactors: ["Excessive overtime", "Safety concerns"]
          },
          {
            id: "step3",
            name: "Garment Factory",
            location: "Bangladesh",
            duration: "3 weeks",
            cost: "$8,000",
            laborInfo: "200 workers",
            riskLevel: "low", 
            riskFactors: ["Good compliance record"]
          }
        ],
        connections: [
          {
            source: "step1",
            target: "step2",
            label: "Shipping (1 week)"
          },
          {
            source: "step2",
            target: "step3",
            label: "Logistics (4 days)"
          }
        ],
        overallRisk: "medium", // This now uses the type from SimulationResponse
        summary: "This supply chain has moderate risk factors, primarily in the spinning stage in Vietnam."
      });
    }, 500);
  });
};

// Fetch all supply chains for the current user
export const fetchAllSupplyChains = async (): Promise<ExtendedSimulationResponse[]> => {
  // In a real app, this would be an API call
  console.log("Fetching all supply chains");
  
  // Mock response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "sc_1",
          name: "Cotton Garment Supply Chain",
          description: "Cotton from India → Vietnam → Bangladesh → UK",
          overallRisk: "medium",
          steps: [
            {
              id: "step1",
              name: "Cotton Source",
              location: "India",
              duration: "2 weeks",
              cost: "$5,000",
              laborInfo: "150 workers",
              riskLevel: "medium",
              riskFactors: ["Seasonal labor"]
            }
          ],
          connections: [],
          summary: "Medium risk cotton supply chain"
        },
        {
          id: "sc_2",
          name: "Electronics Assembly",
          description: "China → Malaysia → Germany",
          overallRisk: "high",
          steps: [
            {
              id: "step1",
              name: "Components",
              location: "China",
              duration: "1 week",
              cost: "$10,000",
              laborInfo: "300 workers",
              riskLevel: "high",
              riskFactors: ["Overtime concerns"]
            }
          ],
          connections: [],
          summary: "High risk electronics supply chain"
        }
      ]);
    }, 500);
  });
};

// Create a new supply chain
export const createSupplyChain = async (data: any): Promise<ExtendedSimulationResponse> => {
  console.log("Creating supply chain with data:", data);
  
  // Mock response - in a real app, this would post to an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `sc_${Date.now()}`,
        name: data.name || "New Supply Chain",
        description: data.description,
        steps: data.steps || [],
        connections: data.connections || [],
        overallRisk: data.overallRisk || "medium",
        summary: data.summary || "New supply chain simulation"
      });
    }, 800);
  });
};

// Update an existing supply chain
export const updateSupplyChain = async (id: string, data: any): Promise<ExtendedSimulationResponse> => {
  console.log(`Updating supply chain ${id} with data:`, data);
  
  // Mock response - in a real app, this would put to an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: data.name,
        description: data.description,
        steps: data.steps || [],
        connections: data.connections || [],
        overallRisk: data.overallRisk,
        summary: data.summary
      });
    }, 800);
  });
};

// Delete a supply chain
export const deleteSupplyChain = async (id: string): Promise<void> => {
  console.log(`Deleting supply chain ${id}`);
  
  // Mock response - in a real app, this would delete via an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 800);
  });
};
