import { useEffect, useState } from 'react';
import { fetchBackendList, OptionData } from './options';

const useBackendList = () => {
  const [backendList, setBackendList] = useState<OptionData[]>([]);
  useEffect(() => {
    let ignore = false;

    const localSubconverter = [
      {
        value: window.location.origin + '/sub'
      }
    ];
    setBackendList(localSubconverter);

    fetchBackendList().then((newBackendList) => {
      if (ignore) return;
      setBackendList(localSubconverter.concat(newBackendList));
    });

    return () => {
      ignore = true;
    };
  }, []);
  return backendList;
};

export default useBackendList;
