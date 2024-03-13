import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

const configureEnv = function () {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    return process.env.NODE_ENV === 'production'
        ? new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret)
        : new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret)
}
const PaypalClient = function () {
    return new checkoutNodeJssdk.core.PayPalHttpClient(configureEnv());
}
export default PaypalClient;