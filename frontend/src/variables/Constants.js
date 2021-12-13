import BN from 'bn.js';

export const GAS = new BN('70000000000000');

export const NODE_ENV = process.env.NODE_ENV || 'testnet';

export const CONTRACT_NAME = process.env.CONTRACT_NAME || 'guilds_tests.testnet';

export  const UI_TAGS = ["primary", "info", "success", "danger", "warning", "default"];
