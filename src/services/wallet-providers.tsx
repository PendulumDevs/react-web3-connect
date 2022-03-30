import {InjectedConnector} from "@web3-react/injected-connector";
import config from "env/testnet.config";
export const injected = new InjectedConnector({
    supportedChainIds: [config.chainId]
});
