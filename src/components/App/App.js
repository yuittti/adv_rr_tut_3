import React, { Component } from 'react';
import Root from '../Root/Root';
import store from '../../redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import history from '../../history';
import '../../config';
import '../../mocks';

class App extends Component {
    render() {
        return (
            <Provider store = {store}>
                <DragDropContextProvider backend={HTML5Backend}>
                    <ConnectedRouter history = {history}>
                        <Root />
                    </ConnectedRouter>
                </DragDropContextProvider>
            </Provider>
        );
    }
}

export default App;
