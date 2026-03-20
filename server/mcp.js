import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { kpiCards, activityFeed, goals } from './data.js';

// Create an MCP Server instance
const server = new Server(
  {
    name: "claude-course-dashboard",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

// Define Resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "dashboard://metrics/summary",
        name: "Dashboard Summary Metrics",
        mimeType: "application/json",
        description: "Read-only aggregate metrics for the dashboard's KPI, Goals, and Activity",
      }
    ]
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  if (request.params.uri === "dashboard://metrics/summary") {
    return {
      contents: [{
        uri: request.params.uri,
        mimeType: "application/json",
        text: JSON.stringify({ kpiCards, goals }, null, 2)
      }]
    };
  }
  throw new Error(`Resource not found: ${request.params.uri}`);
});

// Define Tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_dashboard_data",
        description: "Retrieve full dashboard data including KPIs, Activity Feed, and Goals.",
        inputSchema: {
          type: "object",
          properties: {}
        }
      }
    ]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_dashboard_data") {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            kpiCards,
            activityFeed,
            goals
          }, null, 2)
        }
      ]
    };
  }
  throw new Error(`Tool not found: ${request.params.name}`);
});

// Run server
async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server is running on stdio");
}

run().catch(console.error);
