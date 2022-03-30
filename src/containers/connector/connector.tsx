import React, {useEffect} from "react"
import {useWeb3React} from '@web3-react/core'
import {injected} from "services/wallet-providers";
import './connector.css';

export default function ConnectorComponent() {
  const [activatingConnector, setActivatingConnector] = React.useState()
  const {
    connector,
    account,
    activate,
    active,
    error,
    setError
  } = useWeb3React();

  const getShortAddress = () => {
    return account
        ? `${account.substring(0,6)}...${account.substring(account.length-4,account.length)}`
        : null;
  }

  const connectorsByName: any = {
    MetaMask: injected
  }

  // @ts-ignore // @todo replace this check
  const supported = window && window.ethereum;

  // Check if were already authorised at component mount and auto connect
  useEffect(() => {
    if (supported) {
      injected.isAuthorized().then(isAuthorized => {
        if (isAuthorized && !active) {
          return activate(injected)
        }
      })
    }
  }, [supported, activate, active]);

  const onConnect = (currentConnector: any, name: string) => {
    if (currentConnector === connector) { return }
    setActivatingConnector(currentConnector)
    activate(connectorsByName[name], (error: any) => {
      setActivatingConnector(undefined)
      setError(error)
    }).then(() => {
      setActivatingConnector(undefined)
    });
  }

  return (
    <div className='connectors'>
      { error && error.message && <div className='connectors-error'>{ error.message }</div> }
      { Object.keys(connectorsByName).map(name => {
        const currentConnector = connectorsByName[name];
        const activating = currentConnector === activatingConnector;
        const connected = currentConnector === connector;
        const disabled = !!activatingConnector;

        return (
          <div key={name} className='connector'>
            <button
              type='button'
              className='connector-btn'
              onClick={() => {onConnect(currentConnector, name)}}
              disabled={ disabled }>
                { !activating && !connected ? 'Connect ' + name : name }
                { activating ? ' - Connecting' : '' }
                { connected ? ' - Connected' : '' }
            </button>
          </div>
        )
      })}
    </div>
  )
}
