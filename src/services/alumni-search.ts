/**
 * Represents an alumni member.
 */
export interface AlumniMember {
  /**
   * The unique identifier of the alumni.
   */
id: string;
  /**
   * The name of the alumni.
   */
  name: string;
  /**
   * The graduation year of the alumni.
   */
  graduationYear: number;
  /**
   * The company the alumni is currently working at.
   */
  company: string;
}

/**
 * Asynchronously retrieves alumni members based on search criteria.
 *
 * @param year The graduation year to search for.
 * @param batch The batch to search for.
 * @param company The company to search for.
 * @returns A promise that resolves to an array of AlumniMember objects.
 */
export async function searchAlumni(
  year?: number,
  batch?: string,
  company?: string
): Promise<AlumniMember[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      id: '1',
      name: 'John Doe',
      graduationYear: 2010,
      company: 'Google',
    },
    {
      id: '2',
      name: 'Jane Smith',
      graduationYear: 2012,
      company: 'Microsoft',
    },
  ];
}
