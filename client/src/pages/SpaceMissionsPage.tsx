// filepath: c:\Users\openc\Videos\inhouse\SolarSystemExplorer\client\src\pages\SpaceMissionsPage.tsx
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";

interface SpaceMission {
  id: number;
  name: string;
  agency: string;
  launchDate: string;
  endDate: string | null;
  description: string;
  objectives: string[];
  targetBodies: string[];
  achievements: string[];
  image: string;
  missionType: string;
  status: string;
}

const SpaceMissionsPage = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [agencyFilter, setAgencyFilter] = useState<string>("all");
  const [targetFilter, setTargetFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [timelineView, setTimelineView] = useState<"list" | "timeline">(
    "timeline"
  );

  // Fetch space missions
  const {
    data: missions = [],
    isLoading,
    error,
  } = useQuery<SpaceMission[]>({
    queryKey: ["/api/space-missions"],
  });

  // Get unique agencies, targets, and statuses for filters
  const agencies = useMemo(
    () => ["all", ...new Set(missions.map((m) => m.agency))],
    [missions]
  );

  const targets = useMemo(() => {
    const allTargets = new Set<string>();
    missions.forEach((mission) =>
      mission.targetBodies.forEach((target) => allTargets.add(target))
    );
    return ["all", ...Array.from(allTargets)];
  }, [missions]);

  const statuses = ["all", "planned", "active", "completed", "failed"];

  // Apply filters
  const filteredMissions = useMemo(() => {
    return missions.filter((mission) => {
      // Apply status filter
      if (statusFilter !== "all" && mission.status !== statusFilter) {
        return false;
      }

      // Apply agency filter
      if (agencyFilter !== "all" && mission.agency !== agencyFilter) {
        return false;
      }

      // Apply target filter
      if (
        targetFilter !== "all" &&
        !mission.targetBodies.includes(targetFilter)
      ) {
        return false;
      }

      // Apply search query
      if (
        searchQuery &&
        !mission.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [missions, statusFilter, agencyFilter, targetFilter, searchQuery]);

  // Sort missions by launch date (newest first for list view, chronological for timeline)
  const sortedMissions = useMemo(() => {
    return [...filteredMissions].sort((a, b) => {
      const dateA = new Date(a.launchDate).getTime();
      const dateB = new Date(b.launchDate).getTime();
      return timelineView === "timeline" ? dateA - dateB : dateB - dateA;
    });
  }, [filteredMissions, timelineView]);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Helper to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "planned":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Space Missions Explorer</h1>
        <p className="text-xl text-muted-foreground">
          Discover past, present, and future missions exploring our solar system
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Explore Missions</h2>
          <RadioGroup
            defaultValue="timeline"
            value={timelineView}
            onValueChange={(v) => setTimelineView(v as "list" | "timeline")}
            className="flex space-x-2"
          >
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="timeline" id="timeline-view" />
              <Label htmlFor="timeline-view">Timeline</Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="list" id="list-view" />
              <Label htmlFor="list-view">List</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="status-filter"
              className="block text-sm font-medium mb-1"
            >
              Mission Status
            </label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger id="status-filter">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label
              htmlFor="agency-filter"
              className="block text-sm font-medium mb-1"
            >
              Space Agency
            </label>
            <Select value={agencyFilter} onValueChange={setAgencyFilter}>
              <SelectTrigger id="agency-filter">
                <SelectValue placeholder="All Agencies" />
              </SelectTrigger>
              <SelectContent>
                {agencies.map((agency) => (
                  <SelectItem key={agency} value={agency}>
                    {agency === "all" ? "All Agencies" : agency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label
              htmlFor="target-filter"
              className="block text-sm font-medium mb-1"
            >
              Target Body
            </label>
            <Select value={targetFilter} onValueChange={setTargetFilter}>
              <SelectTrigger id="target-filter">
                <SelectValue placeholder="All Targets" />
              </SelectTrigger>
              <SelectContent>
                {targets.map((target) => (
                  <SelectItem key={target} value={target}>
                    {target === "all" ? "All Targets" : target}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="search" className="block text-sm font-medium mb-1">
              Search
            </label>
            <Input
              id="search"
              placeholder="Search missions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading missions data...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-destructive">
          <p>Error loading space missions. Please try again later.</p>
        </div>
      ) : filteredMissions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg">
            No missions match your filters. Try adjusting your criteria.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setStatusFilter("all");
              setAgencyFilter("all");
              setTargetFilter("all");
              setSearchQuery("");
            }}
          >
            Clear All Filters
          </Button>
        </div>
      ) : timelineView === "timeline" ? (
        <div className="relative">
          {/* Timeline View */}
          <div className="absolute w-1 bg-slate-200 dark:bg-slate-700 h-full left-1/2 transform -translate-x-1/2"></div>

          <div className="relative z-10">
            {sortedMissions.map((mission, index) => (
              <div
                key={mission.id}
                className={`mb-12 flex items-start ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`w-5/12 ${
                    index % 2 === 0 ? "pr-10 text-right" : "pl-10"
                  }`}
                >
                  <div
                    className={`absolute ${
                      index % 2 === 0
                        ? "right-0 mr-[calc(50%-10px)]"
                        : "left-0 ml-[calc(50%-10px)]"
                    } mt-1.5 rounded-full h-5 w-5 bg-primary flex items-center justify-center`}
                  >
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>

                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            mission.status
                          )}`}
                        >
                          {mission.status.charAt(0).toUpperCase() +
                            mission.status.slice(1)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(mission.launchDate)}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{mission.name}</CardTitle>
                      <div className="text-sm text-muted-foreground">
                        {mission.agency}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-w-16 aspect-h-9 mb-4">
                        <img
                          src={mission.image}
                          alt={mission.name}
                          className="rounded-md object-cover w-full h-48"
                        />
                      </div>
                      <CardDescription className="line-clamp-3 mb-2">
                        {mission.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {mission.targetBodies.map((target) => (
                          <Badge key={target} variant="outline">
                            {target}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // List View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMissions.map((mission) => (
            <Card
              key={mission.id}
              className="overflow-hidden hover:shadow-md transition-all"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={mission.image}
                  alt={mission.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      mission.status
                    )}`}
                  >
                    {mission.status.charAt(0).toUpperCase() +
                      mission.status.slice(1)}
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{mission.name}</CardTitle>
                </div>
                <div className="text-sm text-muted-foreground">
                  {mission.agency} • Launched {formatDate(mission.launchDate)}
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {mission.targetBodies.map((target) => (
                    <Badge key={target} variant="outline">
                      {target}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3">
                  {mission.description}
                </CardDescription>

                {mission.achievements && mission.achievements.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-1">
                      Key Achievements:
                    </h4>
                    <ul className="text-sm list-disc pl-4 space-y-1">
                      {mission.achievements
                        .slice(0, 2)
                        .map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      {mission.achievements.length > 2 && <li>And more...</li>}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-16 p-6 bg-muted rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-2">Explore Further</h2>
        <p className="mb-4">
          Want to learn more about space missions? Check out these resources:
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" asChild>
            <a
              href="https://science.nasa.gov/missions/"
              target="_blank"
              rel="noopener noreferrer"
            >
              NASA Missions
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://www.esa.int/Enabling_Support/Operations/ESA_Missions"
              target="_blank"
              rel="noopener noreferrer"
            >
              ESA Missions
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://solarsystem.nasa.gov/missions/target/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solar System Exploration
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpaceMissionsPage;
