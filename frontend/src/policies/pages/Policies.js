import React, { useEffect, useState } from 'react';

import PolicyList from '../components/PolicyList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Policies = () => {
  const [loadedPolicies, setLoadedPolicies] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/policy`
        );
        setLoadedPolicies(responseData.data);
      } catch (err) {}
    };
    fetchPolicies();
  }, [sendRequest]);

  const policyDeletedHandler = deletedPolicyId => {
    setLoadedPolicies(prevPolicies =>
      prevPolicies.filter(policy => policy.id !== deletedPolicyId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPolicies && (
        <PolicyList items={loadedPolicies} onDeletePolicy={policyDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default Policies;
