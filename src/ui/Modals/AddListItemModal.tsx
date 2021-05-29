import { Formik, Form as FormikForm } from 'formik';
import React, { useContext } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { LIST_ITEM_ADDED, SUCCESS_MESSAGE } from '../../config/constants';
import { createToast } from '../../config/createToast';
import { GlobalContext } from '../../config/global';
import { InputField } from '../../forms/InputField';
import { AddListItemValidationSchema } from '../../forms/validators';

interface AddListItemModalProps {
    show: boolean,
    onHide: () => void,
    listTitle: string
}

interface AddListItemFormModal {
    title: string,
    body: string
}

export const AddListItemModal: React.FC<AddListItemModalProps> = ({ show, onHide, listTitle }) => {

    const context = useContext(GlobalContext);

    function onFormSubmitHandler(data: AddListItemFormModal) {
        context.dispatch!({
            type: 'ADD_LIST_ITEM',
            payload: {
                itemTitle: data.title,
                listTitle,
                body: data.body
            }
        })
        setTimeout(() => {
            context.dispatch!(createToast(SUCCESS_MESSAGE, LIST_ITEM_ADDED));
        }, 500);
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
            <Formik<AddListItemFormModal>
                initialValues={{
                    title: '',
                    body: ''
                }}
                onSubmit={(trigger) => onFormSubmitHandler(trigger)}
                validationSchema={AddListItemValidationSchema}
            >{({ dirty, isValid }) =>
                <FormikForm>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add New List
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group controlId="title">
                            <Form.Label>Item Title</Form.Label>
                            <InputField name="title" type="text" placeholder="Enter list title" autoComplete="off" />
                        </Form.Group>

                        <Form.Group controlId="body">
                            <Form.Label>Item Body</Form.Label>
                            <InputField name="body" type="text" placeholder="Enter list item body" autoComplete="off" />
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