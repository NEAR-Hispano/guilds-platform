import { WalletConnection, connect, keyStores, Contract } from 'near-api-js'
import { NODE_ENV, CONTRACT_NAME } from './../variables/Constants';


import getConfig from './../config';

const nearConfig = getConfig(NODE_ENV || 'testnet');

export async function initContract() {
    // Initialize connection to the NEAR testnet
    
    // const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    const near = await connect(Object.assign({ deps: { keyStore } }, nearConfig))

    // Initializing Wallet based Account. It can work with NEAR testnet wallet that
    // is hosted at https://wallet.testnet.near.org
    window.walletConnection = new WalletConnection(near);

    // Getting the Account ID. If still unauthorized, it's just empty string
    window.accountId = window.walletConnection.getAccountId()
    
    // Initializing our contract APIs by contract name and configuration
    window.contract = await new Contract(window.walletConnection.account(), CONTRACT_NAME, {
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: [
            'get_num_members'
        ],
        // Change methods can modify the state. But you don't receive the returned value when called.
        changeMethods: [
            'get_guild_info',
            'join_guild',
            'check_if_member',
            'get_guilds_by_user',
            'get_member_list'
        ],
    });
}

export function logout() {
    window.walletConnection.signOut()
    // reload page
    window.location.replace(window.location.origin + window.location.pathname);
    //Remove all information internal saved
    localStorage.clear();
}

export function login() {
    // Allow the current app to make calls to the specified contract on the
    // user's behalf.
    // This works by creating a new access key for the user's account and storing
    // the private key in localStorage.
    window.walletConnection.requestSignIn(nearConfig.contractName)
}

