// @ts-nocheck
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik, Field, setNestedObjectValues } from "formik";
import Layout from "../components/layout";
import BootstrapTable from "react-bootstrap-table-next";
import { Card, Modal, Button } from "react-bootstrap";
import { ActionsColumnFormatter } from "../components/action.formatter";
import { Actions } from "../app/reducer";
import { Input } from "../components/input";
import { Select } from "../components/select";
import Link from "next/link";
import * as Yup from "yup";
import { hashedGrades } from "../components/fuzzy.logic";

import { grade, getFuzzyRemark } from "../components/fuzzy.logic";
const subjectSchema = Yup.object().shape({
  subject: Yup.string()
    .min(3, "Minimum 3 symbols")
    .required("Course is required"),
  matricNumber: Yup.string().required(),
  fullName: Yup.string().required().min(3),
  test1: Yup.number().max(20).min(0).required("First test is required"),
  test2: Yup.number().max(20).min(0).required("Second test is required"),
  exam: Yup.number().max(60).min(0).required("Exam is required"),
});

const Home: NextPage = () => {
  let formkikRef = "";
  const columns = [
    {
      dataField: "subject",
      text: "Course",
    },
    {
      dataField: "test1",
      text: "First Test",
    },
    {
      dataField: "test2",
      text: "Second Test",
    },
    {
      dataField: "exam",
      text: "Exam",
    },
    {
      dataField: "total",
      text: "Total",
    },
    {
      dataField: "remark",
      text: "Fuzzy Remark",
    },
    {
      dataField: "value",
      text: "Fuzzy Value",
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditDialog: (row) => handleEdit(row),
        openDeleteDialog: (row) => handleDelete(row),
      },
      //   classes: 'text-right pr-0',
      //   headerClasses: 'text-right pr-3',
      //   style: {
      //     minWidth: '100px',
      //   },
    },
  ];

  const columns2 = [
    {
      dataField: "fullName",
      text: "Student",
    },
    {
      dataField: "matricNumber",
      text: "REG. NO",
    },
    {
      dataField: "total",
      text: "Total",
    },
    {
      dataField: "totalRemark",
      text: "Fuzzy Remark",
    },
    {
      dataField: "totalGrade",
      text: "Fuzzy Value",
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditDialog: (row) => handleEdit(row),
        openDeleteDialog: (row) => handleDelete2(row),
      },
      //   classes: 'text-right pr-0',
      //   headerClasses: 'text-right pr-3',
      //   style: {
      //     minWidth: '100px',
      //   },
    },
  ];
  const [modalVisible, toggleModal] = useState(false);
  const [showSpreadSheet, setShowSheet] = useState(false);
  const [subject, setSubject] = useState({} as { id: string; subject: string });
  const [filter, setFilter] = useState("");
  const { records, performances } = useSelector((store: any) => ({
    records: store.records.subjects,
    performances: store.records.students,
  }));
  const handleEdit = (row) => {
    setSubject(row);
    toggleModal(true);
  };
  const handleDelete = (row) => {
    dispatch({ type: Actions.DELETE_SUBJECT, payload: row.id });
  };

  const handleDelete2 = (row) => {
    dispatch({ type: Actions.DELETE_STUDENTS, payload: row.id });
  };

  const computeAverage = () => {
    let grandTotal = 0;
    records.forEach((val) => {
      grandTotal += val.total;
    });
    let average = grandTotal / records.length;
    const totalGrade = grade(average, 1, 100);
    const totalRemark = getFuzzyRemark(totalGrade);
    return { totalGrade, totalRemark };
  };

  const addStudent = () => {
    if (records.length < 1) return false;
    let grandTotal = 0;
    records.forEach((val) => {
      grandTotal += val.total;
    });
    let average = grandTotal / records.length;
    const totalGrade = grade(average, 1, 100).toFixed(1);
    const totalRemark = getFuzzyRemark(parseFloat(totalGrade));
    const payload = {
      totalGrade,
      totalRemark,
      total: grandTotal,
      id: new Date().getTime(),
      records,
      fullName: records[0].fullName,
      matricNumber: records[0].matricNumber,
    };
    dispatch({ type: Actions.ADD_STUDENTS, payload: payload });
    if (formkikRef) {
      formkikRef.resetForm();
    }
  };

  const { totalGrade, totalRemark } = computeAverage();
  const dispatch = useDispatch();

  if (showSpreadSheet) {
    const performancesFiltered = filter
      ? performances.filter((val) => val.totalGrade === filter)
      : performances;
    return (
      <Layout>
        <section
          style={{ overflowY: "scroll" }}
          id="hero"
          className="hero d-flex"
        >
          <div className="container">
            <div
              className="text-center text-lg-start m-3"
              onClick={() => setShowSheet(false)}
            >
              <i className="bi bi-arrow-left"></i>

              <a className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                <span>back</span>
              </a>
            </div>
            <div
              className="d-flex justify-content-end m-2"
              style={{ marginBottom: 10 }}
            >
              <select
                style={{ maxWidth: 300 }}
                className="form-select"
                onChange={(e) => setFilter(e.target.value)}
                aria-label="Default select example"
              >
                <option value="">Filter Students by performancess</option>
                {Object.keys(hashedGrades).map((val, index) => {
                  return (
                    <option key={index} value={val}>
                      {hashedGrades[val]} - {val}
                    </option>
                  );
                })}
              </select>
            </div>
            <BootstrapTable
              wrapperClasses="table-responsive"
              bordered={false}
              classes="table text-muted table-head-custom table-vertical-center overflow-scroll"
              bootstrap4
              keyField="id"
              data={performancesFiltered || []}
              columns={columns2}
              // onTableChange={() => ""}
              // selectRow={() => ""}
            />
          </div>
        </section>
      </Layout>
    );
  }
  return (
    <div>
      <Layout showHeader={false}>
        <section
          style={{ overflowY: "scroll" }}
          id="hero"
          className="hero d-flex"
        >
          <div className="container">
            <div data-aos="fade-up" data-aos-delay="300" className="row">
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                style={{ cursor: "pointer", marginBottom: 10 }}
              >
                <div className="d-flex justify-content-between ">
                  <Link href="/" className="text-center text-lg-end m-4">
                    <a className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                      <span>Home</span>
                    </a>
                  </Link>
                  <div
                    className="text-center text-lg-end"
                    onClick={() => setShowSheet(true)}
                  >
                    <a className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                      <span>View Students Performances</span>
                      <i className="bi bi-arrow-down"></i>
                    </a>
                  </div>
                </div>
              </div>

              <Formik
                enableReinitialize={true}
                initialValues={subject}
                validationSchema={subjectSchema}
                ref={(ref) => (formkikRef = ref)}
                onSubmit={(values) => {
                  const total = values.test1 + values.test2 + values.exam;
                  const fuzzyValue = grade(total, 1, 100);
                  const remark = getFuzzyRemark(fuzzyValue);
                  if (!values.id) {
                    const id = new Date().getTime().toString();
                    const newSubject = {
                      ...values,
                      id,
                      total,
                      remark,
                      value: fuzzyValue.toFixed(1),
                    };
                    dispatch({
                      type: Actions.ADD_SUBJECT,
                      payload: newSubject,
                    });
                    toggleModal(false);
                    setSubject({});
                    return;
                  }
                  const newSubject = {
                    ...values,
                    total,
                    remark,
                    value: fuzzyValue.toFixed(1),
                  };
                  dispatch({
                    type: Actions.UPDATE_SUBJECT,
                    payload: newSubject,
                  });
                  toggleModal(false);
                  setSubject({});
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  setFieldValue,
                  values,
                  errors,
                  touched,
                  isValid,
                  resetForm,
                }) => (
                  <div>
                    <Form className="form form-label-right">
                      <div className="form-group row my-4 align-items-center justify-content-between">
                        <div className="col-lg-3">
                          <h1 className="" style={{ margin: 0 }}>
                            {totalGrade ? totalGrade.toFixed(2) : "0.00"}
                          </h1>
                          <h4 style={{ fontSize: 20 }} className="">
                            {totalRemark || "No score yet"}
                          </h4>
                        </div>
                        {/* Full Name */}
                        <div className="col-lg-3 my">
                          <Field
                            name="fullName"
                            type="text"
                            component={Input}
                            placeholder="Full name"
                            label="students Full name"
                          />
                        </div>
                        {/* Email */}
                        <div className="col-lg-3">
                          <Field
                            type="text"
                            name="matricNumber"
                            component={Input}
                            placeholder="Matriculation Number"
                            label="matriculation number"
                          />
                        </div>
                        <div
                          className="col-md-3"
                          onClick={() => {
                            toggleModal(true);
                          }}
                        >
                          <div
                            className="text-center text-lg-end"
                            style={{ marginTop: -10 }}
                          >
                            <a className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                              <span>New Course</span>
                              <i className="bi bi-arrow-right"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <Modal
                        show={modalVisible}
                        onHide={() => {
                          toggleModal(false);
                          setSubject({});
                        }}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="contained-modal-title-vcenter">
                            {subject?.id
                              ? `Edit ${subject.subject}`
                              : "Add new Course"}
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="form-group row my-4">
                            {/* Full Name */}
                            <div className="col-lg-4 my">
                              <Field
                                name="subject"
                                type="text"
                                component={Input}
                                placeholder="Course"
                                label="Enter Course"
                              />
                            </div>
                            {/* Email */}
                            <div className="col-lg-4">
                              <Field
                                type="number"
                                name="test1"
                                component={Input}
                                placeholder="First Test"
                                label="Enter First test"
                              />
                            </div>
                            {/* address */}
                            <div className="col-lg-4">
                              <Field
                                name="test2"
                                component={Input}
                                type="number"
                                placeholder="Second Test"
                                label="Enter Second Test"
                                // customFeedbackLabel="We'll never share user address with anyone else"
                              />
                            </div>
                          </div>
                          <div className="form-group row my-4">
                            {/* Role */}

                            {/* Password */}
                            <div className="col-lg-4">
                              <Field
                                type="number"
                                name="exam"
                                component={Input}
                                placeholder="Exam"
                                label="Enter Exam"
                              />
                            </div>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            onClick={() => handleSubmit()}
                            disabled={!isValid}
                          >
                            Save
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Form>
                  </div>
                )}
              </Formik>
              <Card style={{ borderRadius: 5, marginTop: 5, padding: 10 }}>
                <div className="col-lg-12 d-flex flex-column justify-content-center">
                  <BootstrapTable
                    wrapperClasses="table-responsive"
                    bordered={false}
                    classes="table text-muted table-head-custom table-vertical-center overflow-scroll"
                    bootstrap4
                    keyField="id"
                    data={records || []}
                    columns={columns}
                    // onTableChange={() => ""}
                    // selectRow={() => ""}
                  />
                </div>
              </Card>
              <div className="d-flex justify-content-end">
                <button
                  onClick={() => addStudent()}
                  style={{ alignSelf: "flex-end", width: 200, margin: 20 }}
                  type="button"
                  className="btn btn-primary"
                >
                  Save Record
                </button>
              </div>
            </div>
          </div>
        </section>

        <a
          href="#"
          className="back-to-top d-flex align-items-center justify-content-center"
        >
          <i className="bi bi-arrow-up-short"></i>
        </a>
      </Layout>
    </div>
  );
};

export default Home;
