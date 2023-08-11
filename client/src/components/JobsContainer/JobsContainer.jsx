import { useAllJobsContext } from "../../pages/AllJobs/AllJobs";
import { Job } from "../Job/Job";
import JobsContainerWrapper from "./JobsContainer.style";


export const JobsContainer = () => {
  const { data } = useAllJobsContext();

  const { jobs, totalJobs } = data;
  console.log('%cqqq: jobs', 'color: green;', jobs)
  if (jobs.length === 0) {
    return (
      <JobsContainerWrapper>
        <h2>No jobs to display...</h2>
      </JobsContainerWrapper>
    );
  }

  return (
    <JobsContainerWrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {/* {numOfPages > 1 && <PageBtnContainer />} */}
    </JobsContainerWrapper>
  );
};