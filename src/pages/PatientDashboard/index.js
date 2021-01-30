import React, { useState, useEffect } from "react";
import {
  Container,
  Jumbotron,
  Row,
  Col,
  Form,
  Card,
  Button,
  Image,
} from "react-bootstrap";
import Countdown from "react-countdown";
import API from "../../API/mainServer";
import StarRatings from "react-star-ratings";
import ImagePasien from "../../assets/images/fauzihaqmuslim.jpg";
import CardUpcoming from "./cardUpcoming";
import CardNextAppointment from "../../components/NextAppointment/cardNextAppointment";
import CardRecentAppointment from "./cardRecentAppointment";

import "./index.css";
const PatientDashboard = () => {
  const [appointmentDone, setAppointmentDone] = useState([]);
  const [appointmentPaid, setAppointmentPaid] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchDataAppointment = async () => {
    try {
      const token = localStorage.getItem("accesstoken");
      const response = await API({
        method: "GET",
        url: `/appointments/patient`,
        headers: {
          accesstoken: token,
        },
      });

      const statusDone = response.data.data.filter(
        (el) => el.status === "Done"
      );
      const statusPaid = response.data.data.filter(
        (el) => el.status === "Paid"
      );
      setAppointmentDone(statusDone);
      setAppointmentPaid(statusPaid);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDataAppointment();
  }, []);

  return (
    <>
      {/* Your Next appointment */}
      <Container
        className="pt-3"
        style={{ height: "150px", width: "350px", paddingTop: "10" }}
      >
        {!appointmentPaid ? (
          <h3>You Dont Have Any Appointment Schedule</h3>
        ) : (
          <CardNextAppointment appointmentPaid={appointmentPaid[0]} />
        )}
      </Container>

      {/* Your Next appointment */}
      {/* Upcoming appointment */}
      <Container className="flex-container mt-5">
        <div>
          <h5>Upcoming Appointment</h5>
          {appointmentPaid.map((item) => (
            <CardUpcoming key={item._id} appointmentPaid={item} />
          ))}
        </div>
      </Container>
      <hr></hr>
      {/* RECENT APPOINTMENT */}
      <Container className="flex-container">
        <div>
          <h5>Recent Appointment</h5>
          {appointmentDone.map((item) => (
            <CardRecentAppointment
              key={item._id}
              appointmentDone={item}
              appointmentFetch={fetchDataAppointment}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default PatientDashboard;
