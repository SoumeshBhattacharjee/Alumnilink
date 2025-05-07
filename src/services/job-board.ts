/**
 * Represents a job posting.
 */
export interface JobPosting {
  /**
   * The unique identifier of the job posting.
   */
id: string;
  /**
   * The title of the job.
   */
  title: string;
  /**
   * The company offering the job.
   */
  company: string;
  /**
   * The location of the job.
   */
  location: string;
  /**
   * A brief description of the job.
   */
description: string;
}

/**
 * Asynchronously retrieves job postings.
 *
 * @returns A promise that resolves to an array of JobPosting objects.
 */
export async function getJobPostings(): Promise<JobPosting[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      id: '1',
      title: 'Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      description: 'Develop and maintain software applications.',
    },
    {
      id: '2',
      title: 'Data Scientist',
      company: 'Microsoft',
      location: 'Redmond, WA',
      description: 'Analyze data to improve products and services.',
    },
  ];
}
