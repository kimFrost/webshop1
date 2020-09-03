import { useSelector } from 'react-redux';
import { IState } from '../../reduxStore/reducer';


function useRequestLoader(group: string, id: string) {
  const request = useSelector((state:IState) => state.requests[`${group}:${id}`]);
  if (request) {

  }
  return [request];
}

export default useRequestLoader;