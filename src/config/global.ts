import React, { ReactElement } from 'react';
import { v4 } from 'uuid';

const ROOT_DIR = "lists";

export interface ToastState {
    animation?: boolean;
    autohide?: boolean;
    delay?: number;
    minHeight?: string;
    top?: string;
    right?: string;
    header: ReactElement | null;
    body: ReactElement | null;
    show: boolean;
}

export const ToastinitialState = {
    show: false,
    header: null,
    body: null,
    autohide: true,
    minHeight: '100px',
    top: '5rem',
    right: '5rem',
    delay: 3000
}

export function getInitialState(): InitialState {
    const items = localStorage.getItem(ROOT_DIR);
    if (items)
        return { lists: { ...JSON.parse(items) }, toast: { ...ToastinitialState } };
    else
        return { lists: {}, toast: { ...ToastinitialState } }
}

export interface InitialState {
    lists: {
        [key: string]: [{ title: string, body: string, id: string }]
    },
    toast: ToastState
}

export interface ADD_LIST {
    type: 'ADD_LIST',
    payload: {
        title: string
    }
}

export interface ADD_LIST_ITEM {
    type: 'ADD_LIST_ITEM',
    payload: {
        listTitle: string,
        itemTitle: string,
        body: string
    }
}

export interface DELETE_LIST {
    type: 'DELETE_LIST',
    payload: {
        title: string
    }
}

export interface DELETE_LIST_ITEM {
    type: 'DELETE_LIST_ITEM',
    payload: {
        listTitle: string,
        id: string
    }
}

export interface DROP_LIST_ITEM {
    type: 'DROP_LIST_ITEM',
    payload: {
        fromListTitle: string,
        toListTitle: string,
        id: string,
        itemTitle: string,
        body: string
    }
}

export interface UPDATE_TOAST {
    type: 'UPDATE_TOAST',
    payload: {
        animation?: boolean;
        autohide?: boolean;
        delay?: number;
        minHeight?: string;
        top?: string;
        right?: string;
        header: ReactElement | null;
        body: ReactElement | null;
        show: boolean;
    }
}

export type Action = ADD_LIST | ADD_LIST_ITEM | DELETE_LIST | DELETE_LIST_ITEM | DROP_LIST_ITEM | UPDATE_TOAST;

export function reducer(state: InitialState, action: Action): InitialState {
    let fullList, itemTitle, listTitle, itemBody, id: string;
    switch (action.type) {
        case 'ADD_LIST':

            listTitle = action.payload.title;
            fullList = JSON.parse(localStorage.getItem(ROOT_DIR)!) || {};
            fullList[listTitle as any] = [];
            localStorage.setItem(ROOT_DIR, JSON.stringify(fullList));

            return {
                ...state,
                lists: {
                    ...state.lists,
                    [listTitle]: ([] as any)
                }
            }

        case 'ADD_LIST_ITEM':

            listTitle = action.payload.listTitle;
            itemTitle = action.payload.itemTitle;
            itemBody = action.payload.body;
            id = v4();

            fullList = JSON.parse(localStorage.getItem(ROOT_DIR)!);
            fullList[listTitle].push({ title: itemTitle, body: itemBody, id });
            localStorage.setItem(ROOT_DIR, JSON.stringify(fullList));

            return {
                ...state,
                lists: {
                    ...state.lists,
                    [listTitle]: fullList[listTitle]
                }

            }

        case 'DELETE_LIST':

            listTitle = action.payload.title;
            fullList = JSON.parse(localStorage.getItem(ROOT_DIR)!) || {};
            delete fullList[listTitle];
            localStorage.setItem(ROOT_DIR, JSON.stringify(fullList));


            const newState = { ...state.lists };
            delete (newState as any)[listTitle];
            return {
                ...state,
                lists: { ...newState }
            };

        case 'DELETE_LIST_ITEM':

            listTitle = action.payload.listTitle;
            id = action.payload.id;

            fullList = JSON.parse(localStorage.getItem(ROOT_DIR)!);

            fullList[listTitle] = fullList[listTitle].filter((item: any) => item.id !== id);

            const newList = { ...state.lists };
            (newList as any)[listTitle] = newList[listTitle].filter((item: any) => item.id !== id);
            localStorage.setItem(ROOT_DIR, JSON.stringify(fullList));

            return {
                ...state,
                lists: {
                    ...newList
                }
            }
        case 'DROP_LIST_ITEM':

            const fromListTitle = action.payload.fromListTitle;
            const toListTitle = action.payload.toListTitle;
            id = action.payload.id;
            itemTitle = action.payload.itemTitle;
            itemBody = action.payload.body;

            fullList = JSON.parse(localStorage.getItem(ROOT_DIR)!);
            fullList[fromListTitle] = fullList[fromListTitle].filter((item: any) => item.id !== id);
            fullList[toListTitle] = [{ title: itemTitle, body: itemBody, id }, ...fullList[toListTitle].filter((item: any) => item.id !== id)];
            localStorage.setItem(ROOT_DIR, JSON.stringify(fullList));


            const newLists2: any = { ...state.lists };
            newLists2[fromListTitle] = newLists2[fromListTitle].filter((item: any) => item.id !== id);
            newLists2[toListTitle] = [{ title: itemTitle, body: itemBody, id }, ...newLists2[toListTitle]];

            return {
                ...state,
                lists: {
                    ...state.lists,
                    [fromListTitle]: newLists2[fromListTitle],
                    [toListTitle]: newLists2[toListTitle]
                }
            }

        case 'UPDATE_TOAST':
            return {
                ...state,
                toast: {
                    ...state.toast,
                    ...action.payload
                }
            }
        default:
            return state;
    }
}

export interface GlobalState extends InitialState {
    dispatch?: React.Dispatch<Action>
}

export const GlobalContext = React.createContext<GlobalState>(getInitialState());