
import { useEffect, useState } from "react";
import { ProcessStep, Connection } from "@/services/graniteApi";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Import ReactFlow
import { ReactFlow, Controls, Background, useNodesState, useEdgesState, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface ProcessFlowViewerProps {
  steps: ProcessStep[];
  connections: Connection[];
  overallRisk: string;
}

const riskColorMap = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-red-500"
};

export function ProcessFlowViewer({ steps, connections, overallRisk }: ProcessFlowViewerProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    // Create nodes from steps
    const flowNodes: Node[] = steps.map((step, index) => ({
      id: step.id,
      type: 'default',
      position: { x: index * 300 + 50, y: 100 },
      data: { label: <NodeContent step={step} /> },
      style: {
        width: 250,
        border: `2px solid ${step.riskLevel === 'high' ? '#ef4444' : step.riskLevel === 'medium' ? '#f59e0b' : '#22c55e'}`,
      },
    }));

    // Create edges from connections
    const flowEdges: Edge[] = connections.map((connection, index) => ({
      id: `e${index}`,
      source: connection.source,
      target: connection.target,
      label: connection.label,
      animated: true,
      style: {
        stroke: '#64748b',
        strokeWidth: 2,
      },
    }));

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [steps, connections, setNodes, setEdges]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Digital Twin Visualization</h2>
        <Badge className={`${overallRisk === 'high' ? 'bg-red-500' : overallRisk === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}>
          {overallRisk === 'high' ? 'High Risk' : overallRisk === 'medium' ? 'Medium Risk' : 'Low Risk'}
        </Badge>
      </div>
      
      {overallRisk === 'high' && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Critical risk detected in your supply chain</AlertTitle>
          Review the highlighted issues and consider implementing the suggested mitigation strategies.
        </Alert>
      )}

      <Card className="h-[500px] w-full border">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {steps.map((step) => (
          <Card key={step.id} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{step.name}</h3>
              <Badge className={step.riskLevel === 'high' ? 'bg-red-500' : step.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}>
                {step.riskLevel} risk
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Location: {step.location}</p>
            <p className="text-sm text-muted-foreground mb-1">Duration: {step.duration}</p>
            <p className="text-sm text-muted-foreground mb-1">Cost: {step.cost}</p>
            <p className="text-sm text-muted-foreground mb-1">Labor: {step.laborInfo}</p>
            
            <div className="mt-3">
              <p className="text-xs font-medium mb-1">Risk Factors:</p>
              <ul className="text-xs text-muted-foreground list-disc list-inside">
                {step.riskFactors.map((factor, idx) => (
                  <li key={idx}>{factor}</li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function NodeContent({ step }: { step: ProcessStep }) {
  return (
    <div className="p-2 text-center">
      <div className="font-medium">{step.name}</div>
      <div className="text-xs text-muted-foreground">{step.location}</div>
      <div className={`mt-1 h-2 w-full rounded-full ${riskColorMap[step.riskLevel]}`}></div>
    </div>
  );
}
