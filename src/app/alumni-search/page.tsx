'use client';

import type { AlumniMember } from '@/services/alumni-search';
import { searchAlumni } from '@/services/alumni-search';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Search, Building, CalendarDays, Users, Loader2 } from 'lucide-react';

interface AlumniSearchForm {
  year: string;
  batch: string;
  company: string;
}

export default function AlumniSearchPage() {
  const [searchTerm, setSearchTerm] = useState<AlumniSearchForm>({ year: '', batch: '', company: '' });
  const [results, setResults] = useState<AlumniMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchTerm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);
    const year = searchTerm.year ? parseInt(searchTerm.year, 10) : undefined;
    try {
      const alumni = await searchAlumni(year, searchTerm.batch || undefined, searchTerm.company || undefined);
      setResults(alumni);
    } catch (error) {
      console.error("Failed to search alumni:", error);
      setResults([]);
      // Potentially set an error state here and display to user
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Alumni Search</h1>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Find Fellow Alumni</CardTitle>
          <CardDescription>Search by graduation year, batch, or current company.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="year" className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                  Graduation Year
                </Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  placeholder="e.g., 2010"
                  value={searchTerm.year}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batch" className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  Batch
                </Label>
                <Input
                  id="batch"
                  name="batch"
                  placeholder="e.g., Computer Science"
                  value={searchTerm.batch}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center">
                  <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                  Company
                </Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="e.g., Google"
                  value={searchTerm.company}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {hasSearched && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
          {isLoading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="shadow-md animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((alumni) => (
                <AlumniResultCard key={alumni.id} alumni={alumni} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No alumni found matching your criteria.</p>
          )}
        </div>
      )}
    </div>
  );
}

function AlumniResultCard({ alumni }: { alumni: AlumniMember }) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl">{alumni.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-sm text-muted-foreground">
        <p className="flex items-center">
          <CalendarDays className="mr-2 h-4 w-4" />
          Graduated: {alumni.graduationYear}
        </p>
        <p className="flex items-center">
          <Building className="mr-2 h-4 w-4" />
          Works at: {alumni.company}
        </p>
      </CardContent>
    </Card>
  );
}
