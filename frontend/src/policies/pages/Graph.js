import React, { useEffect, useState } from 'react';

import CustomBarChart from '../charts/BarChart';
import CustomLineChart from '../charts/LineChart';
import CustomPieChart from '../charts/PieChart';
import CustomScatterChart from '../charts/ScatterChart';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './Graph.css'

const Graph = () => {
    const [loadedPolicies, setLoadedPolicies] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [policy_id, setPolicyId] = useState('');
    const [customer_id, setCustomerId] = useState('');
    const [customer_region, setCustomerRegion] = useState('');

    const changePolicyId = event => setPolicyId(event.target.value);
    const changeCustomerId = event => setCustomerId(event.target.value);
    const changeCustomerRegion = event => setCustomerRegion(event.target.value);
    const clearFilter = () => {
        setPolicyId('');
        setCustomerId('');
        setCustomerRegion("");
    }

    const filterList = list => {
        if (!list) {
            return list
        }

        return list.filter(each => {
            let filter = false
            if (policy_id === '' && customer_id === '' && customer_region === '') {
                filter = true
            }
            else if (policy_id === '' && customer_id === '' && each.customer_region === customer_region) {
                filter = true
            }
            else if (policy_id === '' && customer_id !== '' && each.customer_region === customer_region) {
                if (each.customer_id === parseInt(customer_id)) {
                    filter = true
                }
            }
            else if (policy_id !== '' && customer_id === '' && each.customer_region === customer_region) {
                if (each.id === parseInt(policy_id)) {
                    filter = true
                }
            }
            else if (policy_id !== '' && customer_id !== '' && each.customer_region === customer_region) {
                if (each.id === parseInt(policy_id) && each.customer_id === parseInt(customer_id)) {
                    filter = true
                }
            }
            else {
                filter = false
            }
            return filter
        })
    };
    const listToDisplay = filterList(loadedPolicies);

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/policy`
                );
                setLoadedPolicies(responseData.data);
            } catch (err) { }
        };
        fetchPolicies();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedPolicies && (
                <div className="main-div chart-main-div">
                    <div className="graph-search-input">
                        <label>Policy ID
                            <input
                                id="policy_id"
                                type="text"
                                placeholder="Enter Policy ID"
                                onChange={changePolicyId}
                                value={policy_id}
                            />
                        </label>
                        <label>Customer ID
                            <input
                                id="customer_id"
                                type="text"
                                placeholder="Enter Customer ID"
                                onChange={changeCustomerId}
                                value={customer_id}
                            />
                        </label>
                        <label>Customer Region
                            <select
                                name="customer_region"
                                id="customer_region"
                                value={customer_region}
                                placeholder="Select Customer Region"
                                onChange={changeCustomerRegion}
                            >
                                <option key="Select Region" value="">Select Region</option>
                                <option key="East" value="East">East</option>
                                <option key="West" value="West">West</option>
                                <option key="North" value="North">North</option>
                                <option key="South" value="South">South</option>
                            </select>
                        </label>
                        <Button onClick={clearFilter}>Clear Filter</Button>
                    </div>
                    <div className="charts-div">
                        <CustomBarChart data={listToDisplay} />
                        <CustomLineChart data={listToDisplay} />
                        <CustomScatterChart data={listToDisplay}/>
                        <CustomPieChart data={listToDisplay} />
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default Graph;
