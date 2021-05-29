import * as yup from "yup";

export const AddListItemValidationSchema = yup.object({
    title: yup.string().required('Title is required'),
    body: yup.string().required('Body is required')
});

export const AddListValidationSchema = yup.object({
    title: yup.string().required('Title is required').test('duplicate', 'Duplicate List names not allowed', val => {
        const lists = Object.keys(JSON.parse(localStorage.getItem('lists')!) || {});
        const result = lists.reduce((res, listTitle) => { return res && listTitle !== val }, true);
        return result;
    })
});