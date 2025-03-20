// filepath: c:\Users\openc\Videos\inhouse\SolarSystemExplorer\client\src\pages\WorksheetsPage.tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { Worksheet } from "../types";

const WorksheetsPage = () => {
  const [ageFilter, setAgeFilter] = useState<string>("");
  const [subjectFilter, setSubjectFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch all worksheets
  const {
    data: worksheets = [],
    isLoading,
    error,
  } = useQuery<Worksheet[]>({
    queryKey: ["/api/worksheets"],
  });

  // Apply filters
  const filteredWorksheets = worksheets.filter((worksheet) => {
    // Apply age filter if selected
    if (ageFilter && worksheet.ageRange !== ageFilter) {
      return false;
    }

    // Apply subject filter if selected
    if (subjectFilter && worksheet.subject !== subjectFilter) {
      return false;
    }

    // Apply search query if entered
    if (
      searchQuery &&
      !worksheet.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  // Extract unique age ranges and subjects for filter dropdowns
  const ageRanges = [...new Set(worksheets.map((w) => w.ageRange))];
  const subjects = [...new Set(worksheets.map((w) => w.subject))];

  // Handle download
  const handleDownload = (pdfUrl: string, title: string) => {
    // In a real application, this might trigger a download or open the PDF
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Educational Worksheets</h1>
        <p className="text-xl text-muted-foreground">
          Printable activities to enhance your solar system learning experience
        </p>
      </div>

      <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Filter Worksheets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="age-filter"
              className="block text-sm font-medium mb-1"
            >
              Age Range
            </label>
            <Select value={ageFilter} onValueChange={setAgeFilter}>
              <SelectTrigger id="age-filter">
                <SelectValue placeholder="All ages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All ages</SelectItem>
                {ageRanges.map((age) => (
                  <SelectItem key={age} value={age}>
                    {age}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label
              htmlFor="subject-filter"
              className="block text-sm font-medium mb-1"
            >
              Subject
            </label>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger id="subject-filter">
                <SelectValue placeholder="All subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
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
              placeholder="Search worksheets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading worksheets...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-destructive">
          <p>Error loading worksheets. Please try again later.</p>
        </div>
      ) : filteredWorksheets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg">
            No worksheets match your filters. Try adjusting your criteria.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setAgeFilter("");
              setSubjectFilter("");
              setSearchQuery("");
            }}
          >
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorksheets.map((worksheet) => (
            <Card
              key={worksheet.id}
              className="overflow-hidden hover:shadow-md transition-all"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={worksheet.thumbnailUrl}
                  alt={worksheet.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{worksheet.title}</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">{worksheet.ageRange}</Badge>
                  <Badge variant="secondary">{worksheet.subject}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3">
                  {worksheet.description}
                </CardDescription>
              </CardContent>
              <Separator />
              <CardFooter className="pt-4">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() =>
                    handleDownload(worksheet.pdfUrl, worksheet.title)
                  }
                >
                  Download PDF
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-16 p-6 bg-muted rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Using Our Worksheets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">For Students</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Print out the worksheets and complete the activities</li>
              <li>
                Use them to review what you've learned about the solar system
              </li>
              <li>Share your completed work with friends and family</li>
              <li>Keep a folder of your astronomy learning materials</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">For Teachers</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use as supplementary materials for science lessons</li>
              <li>Assign as homework or in-class activities</li>
              <li>Adapt to fit your specific curriculum needs</li>
              <li>
                Contact us if you need editable versions for customization
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorksheetsPage;
