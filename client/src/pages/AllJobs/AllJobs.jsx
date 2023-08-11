import { useContext, createContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';

import customFetch from '../../utils/customFetch';
import { JobsContainer, SearchContainer } from '../../components/';

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/jobs');
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllJobsContext = createContext();

export const AllJobs = () => {
  const data = useLoaderData();

  return ( 
    <AllJobsContext.Provider value={ data }>
      <SearchContainer />
      <JobsContainer />
    </ AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);