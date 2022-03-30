import localnet from "./localnet.config";
import testnet from "./testnet.config";
const env = (process && process.env.REACT_APP_ENV) || (process && process.env.NODE_ENV) || 'testnet';
const config: any = {
  localnet,
  testnet
};
export default config[env];
