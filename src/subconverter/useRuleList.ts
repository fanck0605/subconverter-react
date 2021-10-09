import { useEffect, useState } from 'react';
import { fetchRuleList, OptionData } from './options';

const useRuleList = () => {
  const [ruleList, setRuleList] = useState<OptionData[]>([]);
  useEffect(() => {
    let ignore = false;

    fetchRuleList().then((newRuleList) => {
      if (ignore) return;
      setRuleList(newRuleList);
    });

    return () => {
      ignore = true;
    };
  }, []);
  return ruleList;
};

export default useRuleList;
