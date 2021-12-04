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
import * as Yup from "yup";
import { grade, getFuzzyRemark } from "../components/fuzzy.logic";
const subjectSchema = Yup.object().shape({
  subject: Yup.string()
    .min(3, "Minimum 3 symbols")
    .required("Subject is required"),
  test1: Yup.number().max(20).min(0).required("First test is required"),
  test2: Yup.number().max(20).min(0).required("Second test is required"),
  exam: Yup.number().max(60).min(0).required("Exam is required"),
});

const Home: NextPage = () => {
  const columns = [
    {
      dataField: "subject",
      text: "Subject",
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
  const [modalVisible, toggleModal] = useState(false);
  const [subject, setSubject] = useState({} as { id: string; subject: string });
  const { records } = useSelector((store: any) => ({
    records: store.records.subjects,
  }));
  const handleEdit = (row) => {
    setSubject(row);
    toggleModal(true);
  };
  const handleDelete = (row) => {
    dispatch({ type: Actions.DELETE_SUBJECT, payload: row.id });
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

  const { totalGrade, totalRemark } = computeAverage();
  const dispatch = useDispatch();
  return (
    <Layout>
      <section id="hero" className="hero d-flex">
        <div className="container">
          <div data-aos="fade-up" data-aos-delay="300" className="row mt-5">
            <div
              onClick={() => {
                toggleModal(true);
              }}
              data-aos="fade-up"
              data-aos-delay="100"
              style={{ cursor: "pointer", marginBottom: 10 }}
            >
              <div className="d-flex justify-content-between align-content-center">
                <div>
                  <h1 className="text-center" style={{ margin: 0 }}>
                    {totalGrade.toFixed(2)}
                  </h1>
                  <h4 style={{ fontSize: 20 }} className="text-center">
                    {totalRemark}
                  </h4>
                </div>
                <div className="text-center text-lg-end">
                  <a className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                    <span>New Course</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
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
          </div>
        </div>
      </section>

      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
      <Formik
        enableReinitialize={true}
        initialValues={subject}
        validationSchema={subjectSchema}
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
            dispatch({ type: Actions.ADD_SUBJECT, payload: newSubject });
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
          dispatch({ type: Actions.UPDATE_SUBJECT, payload: newSubject });
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
        }) => (
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
                {subject?.id ? `Edit ${subject.subject}` : "Add new Subject"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className="form form-label-right">
                <div className="form-group row my-4">
                  {/* Full Name */}
                  <div className="col-lg-4 my">
                    <Field
                      name="subject"
                      type="text"
                      component={Input}
                      placeholder="Subject"
                      label="Enter Subject"
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
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => handleSubmit()} disabled={!isValid}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Formik>
    </Layout>
  );
};

export default Home;
