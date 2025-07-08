// Mock data for Projects
export const projects = [
  {
    id: 1,
    name: "High-End Kitchen Remodel in Beverly Hills",
    type: "Project",
    description: "A luxury home is undergoing a custom kitchen remodel with premium finishes, integrated appliances, and specialized cabinetry.",
    status: "In Progress",
    assignee: "GB",
    sentinelUseCase: "Detects that electrical rough-in is marked complete, but no inspection is scheduled and drywall is slated to start tomorrow. Automatically calls the electrician to confirm status. If not resolved in 30 minutes, escalates to the PM. Ensures there's no drywall delay or rework due to missed inspection.",
    todayTasks: [
      {
        id: 1,
        title: "Electrical Inspection",
        time: "9:00 AM",
        contractor: "Bright Electric",
        status: "pending",
        critical: true
      },
      {
        id: 2,
        title: "Drywall Prep",
        time: "1:00 PM",
        contractor: "Smooth Walls Co",
        status: "pending",
        critical: false
      },
      {
        id: 3,
        title: "Client Walkthrough",
        time: "4:00 PM",
        contractor: "PM",
        status: "pending",
        critical: true
      }
    ]
  },
  {
    id: 2,
    name: "Whole-Home Interior Renovation with Custom Millwork",
    type: "Project",
    description: "A full remodel includes luxury built-ins, millwork, integrated lighting, and designer finishes — multiple subs need to work in sequence, with tight handoffs.",
    status: "In Progress",
    assignee: "GB",
    sentinelUseCase: "Notices the millwork sub hasn't checked in for scheduled install day. Sends a call + text: 'Your install was scheduled today — are you on-site and underway?' If unresponsive, escalates to design coordinator and updates daily status log automatically.",
    todayTasks: [
      {
        id: 1,
        title: "Millwork Installation",
        time: "8:00 AM",
        contractor: "Precision Millwork",
        status: "in-progress",
        critical: true
      },
      {
        id: 2,
        title: "Lighting Fixture Delivery",
        time: "10:30 AM",
        contractor: "Luxe Lighting",
        status: "pending",
        critical: false
      },
      {
        id: 3,
        title: "Site Safety Check",
        time: "3:00 PM",
        contractor: "PM",
        status: "pending",
        critical: true
      }
    ]
  },
  {
    id: 3,
    name: "Master Bath Remodel with Imported Stone & Smart Systems",
    type: "Project",
    description: "A luxury master bath features radiant floors, integrated smart controls, and imported stone surfaces that require exact timing of installation.",
    status: "Todo",
    assignee: "GB",
    sentinelUseCase: "Identifies that the floor heat mat inspection hasn't been passed and tile is scheduled to start. Contacts the responsible subcontractor for confirmation. If not resolved in time, holds the tile crew and alerts the PM automatically.",
    todayTasks: [
      {
        id: 1,
        title: "Floor Heat Mat Inspection",
        time: "9:30 AM",
        contractor: "City Inspector",
        status: "pending",
        critical: true
      },
      {
        id: 2,
        title: "Tile Installation Prep",
        time: "11:00 AM",
        contractor: "Marble Masters",
        status: "pending",
        critical: false
      },
      {
        id: 3,
        title: "Smart System Wiring",
        time: "2:00 PM",
        contractor: "Tech Install Pro",
        status: "pending",
        critical: true
      }
    ]
  },

]; 