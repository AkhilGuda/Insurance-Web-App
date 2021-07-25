import React, { useState, useContext } from 'react';

import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './PolicyItem.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PolicyItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/policy/${props.id}`,
        'DELETE',
        null,
      );
      props.onDelete(props.id);
      toast.success(responseData.message || `Policy with ID ${props.id} deleted successfully.`, { position: 'bottom-left' });
    } catch (err) { }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="policy-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this policy? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <tr className="policy-item">
        {isLoading && <LoadingSpinner asOverlay />}
        <td>{props.id}</td>
        <td>{props.customer_id}</td>
        <td>{props.date_of_purchase}</td>
        <td>{props.fuel}</td>
        <td>{props.vehicle_segment}</td>
        <td>{props.premium}</td>
        <td>{props.bodily_injury_liability ? "Yes" : "No"}</td>
        <td>{props.personal_injury_protection ? "Yes" : "No"}</td>
        <td>{props.property_damage_liability ? "Yes" : "No"}</td>
        <td>{props.collision ? "Yes" : "No"}</td>
        <td>{props.comprehensive ? "Yes" : "No"}</td>
        <td>{props.customer_gender}</td>
        <td>{props.customer_income_group}</td>
        <td>{props.customer_region}</td>
        <td className="marital_status">{props.customer_marital_status ? "Married" : "Unmarried"}</td>
        <Button to={`/policy/${props.id}`}>EDIT</Button>
        <Button danger onClick={showDeleteWarningHandler}>
          DELETE
        </Button>
      </tr>
    </React.Fragment>
  );
};

export default PolicyItem;
