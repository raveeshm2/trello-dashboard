import React, { useState, useContext } from 'react'
import { Button, Card } from 'react-bootstrap';
import { ListItem } from './ListItem';
import { AddListItemModal } from './../ui/Modals/AddListItemModal';
import { GlobalContext } from '../config/global';
import { LIST_DELETED, SUCCESS_MESSAGE } from '../config/constants';
import { createToast } from '../config/createToast';

interface ListProps {
    title: string,
    data: [{ id: string, title: string, body: string }]
}

export const List: React.FC<ListProps> = ({ title, data }) => {

    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const context = useContext(GlobalContext);


    function onListDeleteHandler() {
        context.dispatch!({
            type: 'DELETE_LIST',
            payload: {
                title
            }
        });
        setTimeout(() => {
            context.dispatch!(createToast(SUCCESS_MESSAGE, LIST_DELETED));
        }, 500);
    }

    function dragover(e: any) {
        e.preventDefault();
    }

    function drop(e: any) {
        e.preventDefault();
        const id = e.dataTransfer.getData('card_id');
        const fromList = e.dataTransfer.getData('fromList');
        const card = document.getElementById(id);

        if (card) {
            const itemTitle = (card.querySelector('.card--title')?.textContent)!;
            const body = (card.querySelector('.card--body')?.textContent)!;
            context.dispatch!({
                type: 'DROP_LIST_ITEM',
                payload: {
                    body,
                    fromListTitle: fromList,
                    id,
                    itemTitle,
                    toListTitle: title
                }
            })
        }
    }

    return (
        <>
            <div onDrop={drop} onDragOver={dragover} className='border rounded mb-2' style={{ border: '1px solid #ccc', width: '300px', height: '85vh', overflow: 'auto' }}>
                <Card.Header>
                    <div className='d-flex justify-content-between'>
                        <span><b>{title}</b></span>
                        <div className='d-inline-flex justify-content-end'>
                            <span className="material-icons" style={{ cursor: 'pointer' }} onClick={() => onListDeleteHandler()}>delete</span>
                        </div>
                    </div>


                </Card.Header>
                <div className='d-flex flex-column justify-content-center align-items-center'>

                    {data.map(item =>
                        <ListItem listTitle={title} key={item.id} title={item.title} body={item.body} id={item.id} />
                    )}
                    <Button className='mt-3 mb-2' onClick={() => setModalOpen(true)}>Add New Item</Button>
                </div>
            </div>
            {isModalOpen && <AddListItemModal listTitle={title} show={isModalOpen} onHide={() => setModalOpen(false)} />}
        </>
    );
}