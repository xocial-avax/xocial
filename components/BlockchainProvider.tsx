import { ReactNode } from 'react';
import { ModalProvider } from '@particle-network/connect-react-ui';
import { WalletEntryPosition } from '@particle-network/auth';
import { AvalancheTestnet } from '@particle-network/chains';
import { evmWallets } from '@particle-network/connect';

export function BlockchainProvider({ children }: { children: ReactNode }) {
  return(
    <ModalProvider
      options={{
        projectId: '16259ea2-8cb8-473c-b887-e3a0aaa3c6a7',
        clientKey: 'crBew770tNHERo9x50j15U0Hb3Xx3jZCsYyWpEle',
        appId: '0caff3c3-9df5-445b-97b4-0d65daf14239',  
        chains: [
          AvalancheTestnet
        ],
        particleWalletEntry: {    //optional: particle wallet config
          displayWalletEntry: true, //display wallet button when connect particle success.
          defaultWalletEntryPosition: WalletEntryPosition.BR,
          supportChains:[
            AvalancheTestnet
          ],
          customStyle: {}, //optional: custom wallet style
        },
        securityAccount: { //optional: particle security account config
          //prompt set payment password. 0: None, 1: Once(default), 2: Always  
          promptSettingWhenSign: 1,
          //prompt set master password. 0: None(default), 1: Once, 2: Always
          promptMasterPasswordSettingWhenLogin: 1 
        },
        wallets: evmWallets({
          projectId: '66e249ce0a126afc5bd46b101eff25c3',
          showQrModal: false
       }),
      }}
      theme={'auto'}
      language={'en'}
    >
      {children}
    </ModalProvider>
  );
}
