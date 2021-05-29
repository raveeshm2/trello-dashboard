import React, { useState, useReducer } from 'react'
import { Button } from 'react-bootstrap'
import { Navigation } from '../Navbar/Navigation'
import { AddListModal } from '../ui/Modals/AddListModal'
import { reducer, getInitialState, GlobalContext as Context } from './../config/global';
import { CardDeck, Container, Col } from 'react-bootstrap';
import { List } from './List'
import { Toast } from '../ui/Modals/Toast';
import { createToast } from '../config/createToast';
import { LIST_ADDED, SUCCESS_MESSAGE } from '../config/constants';

interface MainProps { }

const init = getInitialState();


export const Main: React.FC<MainProps> = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const [globalState, dispatch] = useReducer(reducer, init);

    function addNewListHandler(title: string) {
        dispatch({
            type: 'ADD_LIST',
            payload: {
                title
            }
        });
        setTimeout(() => {
            dispatch(createToast(SUCCESS_MESSAGE, LIST_ADDED));
        }, 500);
    }

    return (
        <>
            <Navigation />
            <div style={{ textAlign: 'right' }} className='mt-2 mr-2'>
                <Button onClick={() => setModalOpen(true)}>Add List +</Button>
            </div>
            <Context.Provider value={{ ...globalState, dispatch }}>
                <Toast />
                <Container>
                    <CardDeck>
                        {Object.entries(globalState.lists).map((list, idx) =>
                            <Col lg="4" sm="6" xs="12" className='mt-4' key={list[0]}>
                                <List title={list[0]} data={list[1]} />
                            </Col>)
                        }
                    </CardDeck>
                </Container>
            </Context.Provider>

            {isModalOpen && <AddListModal show={isModalOpen} onHide={() => setModalOpen(false)} onSubmit={addNewListHandler} />}
        </>
    );
}