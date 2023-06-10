import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import Axios from "axios";
import { useNavigate } from "react-router-dom";


const UpdateAccount = () => {
  const [email, setEmail] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [showPasswordChangeModal, setShowChangePasswordModal] = useState(false);
  const [showEnterNewPasswordModal, setShowEnterNewPasswordModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeletionModal, setShowDeletionModal] = useState(false);

  const [originalEmail, setOriginalEmail] = useState("");
  const [originalPassword, setOriginalPassword] = useState("");
  const [originalFirstName, setOriginalFirstName] = useState("");
  const [originalLastName, setOriginalLastName] = useState("");

  const navigate = useNavigate();


  return (
    <div>
        Update Account
    </div>
  );
};

export default UpdateAccount;
