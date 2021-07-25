import React, { useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import PolicyItem from "./PolicyItem";
import Button from "../../shared/components/FormElements/Button";
import "./PolicyList.css";

const PolicyList = (props) => {
  const [policy_id, setPolicyId] = useState("");
  const [customer_id, setCustomerId] = useState("");
  const [rows_per_page, setRowsPerpage] = useState(15);

  const changePolicyId = (event) => setPolicyId(event.target.value);
  const changeCustomerId = (event) => setCustomerId(event.target.value);
  const changeRowsPerpage = (event) => setRowsPerpage(event.target.value);
  const clearFilter = () => {
    setPolicyId("");
    setCustomerId("");
  };

  const filterList = (list) => {
    if (!list) {
      return list;
    }

    return list.filter((each) => {
      let filter = false;
      if (policy_id === "" && customer_id === "") {
        filter = true;
      } else if (policy_id !== "" && customer_id !== "") {
        if (
          each.id === parseInt(policy_id) &&
          each.customer_id === parseInt(customer_id)
        ) {
          filter = true;
        }
      } else if (policy_id !== "" || customer_id !== "") {
        if (
          each.id === parseInt(policy_id) ||
          each.customer_id === parseInt(customer_id)
        ) {
          filter = true;
        }
      }
      return filter;
    });
  };
  const listToDisplay = filterList(props.items);

  if (props.items.length === 0) {
    return (
      <div className="policy-list center">
        <Card>
          <h2> No policies found.Maybe create one ? </h2>
          <Button to="/policy/new"> Create Policy </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="main-div">
      <div className="search-input">
        <label>
          Policy ID
          <input
            id="policy_id"
            type="text"
            placeholder="Enter Policy ID"
            onChange={changePolicyId}
            value={policy_id}
          />
        </label>
        <label>
          Customer ID
          <input
            id="customer_id"
            type="text"
            placeholder="Enter Customer ID"
            onChange={changeCustomerId}
            value={customer_id}
          />
        </label>
        <Button onClick={clearFilter}> Clear Filter </Button>
      </div>
      <table class="table-scroll">
        <thead>
          <tr>
            <th> Policy ID </th> <th> Customer ID </th>
            <th> Date Of Purchase </th> <th> Fuel </th>
            <th> Vehicle Segment </th> <th> Premium </th>
            <th className="tooltip">
              BIL
              <span className="tooltiptext">Bodily Injury Liability</span>
            </th>
            <th className="tooltip">
              PIP
              <span className="tooltiptext"> Personal Injury Protection</span>
            </th>
            <th className="tooltip">
              PDL
              <span className="tooltiptext">Property Damage Liability</span>
            </th>
            <th> Collision </th>
            <th> Comprehensive </th> <th> Gender </th>
            <th> Income Group </th>
            <th> Region </th> <th> Marital Status </th>
          </tr>
        </thead>
        <tbody>
          {listToDisplay.length > 0 ? (
            listToDisplay
              .slice(0, rows_per_page)
              .map((policy) => (
                <PolicyItem
                  key={policy.id}
                  id={policy.id}
                  customer_id={policy.customer_id}
                  date_of_purchase={policy.date_of_purchase}
                  fuel={policy.fuel}
                  vehicle_segment={policy.vehicle_segment}
                  premium={policy.premium}
                  bodily_injury_liability={policy.bodily_injury_liability}
                  personal_injury_protection={policy.personal_injury_protection}
                  property_damage_liability={policy.property_damage_liability}
                  collision={policy.collision}
                  comprehensive={policy.comprehensive}
                  customer_gender={policy.customer_gender}
                  customer_income_group={policy.customer_income_group}
                  customer_region={policy.customer_region}
                  customer_marital_status={policy.customer_marital_status}
                  onDelete={props.onDeletePolicy}
                />
              ))
          ) : (
            <h2 className="empty-table">No plicies found</h2>
          )}
        </tbody>
        <tfoot>
          <span className="count-span"> Count: {listToDisplay.length} </span>
          <div className="rows-per-page-div">
            Rows per page:
            <select
              name="rows_per_page"
              id="rows_per_page"
              value={rows_per_page}
              onChange={changeRowsPerpage}
            >
              <option key="15" value={15}>15
              </option>
              <option key="20" value={20}>30
              </option>
              <option key="50" value={50}>50
              </option>
              <option key="100" value={100}>100
              </option>
              <option key="ALL" value={listToDisplay.length}>ALL
              </option>
            </select>
          </div>
        </tfoot>
      </table>
    </div>
  );
};

export default PolicyList;
