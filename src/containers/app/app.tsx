import React from 'react';
import { Web3ReactProvider } from '@web3-react/core'
import { ExternalProvider, Web3Provider} from "@ethersproject/providers";
import ConnectorComponent from "containers/connector/connector";
import Logo from "componenets/logo/logo";
import './app.css';

export default function App() {
    function getLibrary(provider: ExternalProvider) {
        return new Web3Provider(provider);
    }
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <main className="app">
                <div className="app-body">
                    <Logo/>
                    <ConnectorComponent/>
                </div>
            </main>
        </Web3ReactProvider>
    );
}
