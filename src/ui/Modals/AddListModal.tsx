import { Formik, Form as FormikForm } from 'formik';
import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { InputField } from '../../forms/InputField';
import { AddListValidationSchema } from '../../forms/validators';

interface AddListModalProps {
    show: boolean,
    onHide: () => void,
    onSubmit: (data: string) => void
}

interface AddListFormModal {
    title: string
}

export const AddListModal: React.FC<AddListModalProps> = ({ show, onHide, onSubmit }) => {

    function onFormSubmitHandler(data: AddListFormModal) {
        onSubmit(data.title);
        onHide();
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <Formik<AddListFormModal>
                initialValues={{
                    title: ''
                }}
                onSubmit={(trigger) => onFormSubmitHandler(trigger)}
                validationSchema={AddListValidationSchema}
            >{({ dirty, isValid }) =>
                <FormikForm>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add New List
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group controlId="title">
                            <Form.Label>List Title</Form.Label>
                            <InputField name="title" type="text" placeholder="Enter list title" autoComplete="off" />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button type='submit'>Submit</Button>
                        <Button variant="secondary" onClick={onHide}>Close</Button>
                    </Modal.Footer>
                </FormikForm>}
            </Formik>
        </Modal>
    );
}