/**
 * Represents a company search result.
 */
export interface CompanySearchResult {
  /**
   * The name of the company.
   */
  companyName: string;
  /**
   * The number of alumni working at the company.
   */
alumniCount: number;
}

/**
 * Asynchronously retrieves company search results based on a query.
 *
 * @param query The search query.
 * @returns A promise that resolves to an array of CompanySearchResult objects.
 */
export async function searchCompanies(query: string): Promise<CompanySearchResult[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      companyName: 'Google',
      alumniCount: 150,
    },
    {
      companyName: 'Microsoft',
      alumniCount: 120,
    },
  ];
}
