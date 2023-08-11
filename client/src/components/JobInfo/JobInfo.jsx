import JobInfoWrapper from "./JobInfo.style";

export const JobInfo = ({ icon, text }) => {
  return (
    <JobInfoWrapper>
      <span className='job-icon'>{icon}</span>
      <span className='job-text'>{text}</span>
    </JobInfoWrapper>
  );
};
