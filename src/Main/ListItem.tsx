import React, { useContext } from 'react'
import { Card } from 'react-bootstrap';
import { LIST_ITEM_DELETED, SUCCESS_MESSAGE } from '../config/constants';
import { createToast } from '../config/createToast';
import { GlobalContext } from '../config/global';

interface ListItemProps {
    title: string,
    body: string,
    id: string,
    listTitle: string
}

export const ListItem: React.FC<ListItemProps> = ({ title, body, id, listTitle }) => {

    const context = useContext(GlobalContext);

    function onDeleteItemHandler(id: string) {
        context.dispatch!({
            type: 'DELETE_LIST_ITEM',
            payload: {
                id,
                listTitle
            }
        });
        setTimeout(() => {
            context.dispatch!(createToast(SUCCESS_MESSAGE, LIST_ITEM_DELETED));
        }, 500);
    }

    function dragStart(e: any) {
        const target = e.target;
        e.dataTransfer.setData('card_id', id);
        e.dataTransfer.setData('fromList', listTitle);
        setTimeout(() => {
            target.style.display = "none";
        }, 0);
    }

    function dragEnd(e: any) {
        const target = e.target;
        target.style.display = "block";
    }

    function dragOver(e: any) {
        e.stopPropagation();
    }

    return (

        <Card
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            onDragOver={dragOver}
            className='mt-3'
            style={{ width: '15rem' }}
            draggable={true}
            id={id}
        >
            <Card.Header>
                <div className='d-flex justify-content-between'>
                    <span className='card--title'><b>{title}</b></span>
                    <div className='d-inline-flex justify-content-end'>
                        <span className="material-icons" style={{ cursor: 'pointer' }} onClick={() => onDeleteItemHandler(id)}>delete</span>
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Text >
                    <span className='card--body'>{body}</span>
                </Card.Text>
            </Card.Body>
        </Card>


    );
}