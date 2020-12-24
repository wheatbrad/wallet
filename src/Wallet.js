/**
 * Parent type from which all returned 
 * `WalletFactory` objects are derived
 *  
 * @return  {void}
 */
function Wallet() {}


Object.defineProperties(
    Wallet.prototype,
    {
        'add': {
            value: function (value) {}
        },
        'subtract': {
            value: function (value) {}
        }
    }
)


export function WalletFactory(initialValue) {
    const o = Object.create(Wallet.prototype);

    return o;
}