import { Modal, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import userAction from "../../redux/actions/userAction";
import swal from "sweetalert";
import "./ModalProfile.css";

function ModalPsikiater(props) {
  const [workDays, setWorkDays] = useState([]);
  const [workTimes, setWorkTimes] = useState([]);

  const accesstoken = localStorage.getItem("accesstoken");
  const psikiater = useSelector((store) => store.user.user_data);
  const psikiater_id = psikiater._id;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(workDays);
    console.log(workTimes);
  }, [workDays, workTimes]);

  const updateButtonHandler = () => {
    dispatch(
      userAction.changePsikiaterSchedule(
        psikiater_id,
        accesstoken,
        workDays,
        workTimes
      )
    );
    swal("Schedule Updated!", "", "success");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h4 className="modal-profile-page-title">Input Your New Schedule</h4>
        <Form.Group className="mb-3">
          <Form.Label>Work Days</Form.Label>
          <Form.Control
            onChange={(e) => setWorkDays(e.target.value.split(", "))}
            placeholder="Input Your Work Days"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Work Times</Form.Label>
          <Form.Control
            onChange={(e) => setWorkTimes(e.target.value.split(", "))}
            placeholder="Input Your Work Times"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={updateButtonHandler}>
          Update
        </Button>
        <Button variant="outline-dark" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalPsikiater;
