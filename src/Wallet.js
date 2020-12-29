function Wallet() {}

const store = new WeakMap();
const convertFormattedStringToNumber = function (value) {
    return +value.replace(/[$£€,%]/g, '') || 0;
}
const normalizeValue = function (value) {
    if (!value) return 0;

    let val = 0;

    switch (true) {
        case typeof value === 'string':
            val = convertFormattedStringToNumber(value) * 100;
            break;
        
        case typeof value === 'number':
            val = value * 100;
            break;

        case Wallet.prototype.isPrototypeOf(value):
            val = store.get(value).totalAmount;
            break;
    }

    return val;
}
const stringifyNumber = function (number) {
    var val = (typeof number === 'string') ? number : number.toString();
    var i = val.length - 1;
    var j = i - 2;
    var result = '';

    do {
        result = ((i - j) % 3 === 0 && i !== 0)
            ? ',' + val.charAt(i) + result
            : val.charAt(i) + result;
    } while (i--);

    return result;
}
const writeCurrencyString = function (value) {
    const sign = value >= 0 ? '' : '-';
    var val = Math.abs(value).toString();
    var length = val.length;
    var result = '';
    var minorUnit = '';

    if (length < 3) {
        result = length === 2 ? '0.' + val : '0.0' + val.charAt(0);
    } else {
        // option to disclude '00' in minor unit
        minorUnit = '.' + val.charAt(length-2) + val.charAt(length-1);
        result = stringifyNumber(val.substring(0, length-2));
    }

    return sign + '$' + result + minorUnit;
}


Object.defineProperties(
    Wallet.prototype,
    {
        'add': {
            value: function (value) {
                const props = store.get(this);
                props.totalAmount += normalizeValue(value);

                return this;
            }
        },
        'subtract': {
            value: function (value) {
                const props = store.get(this);
                props.totalAmount -= normalizeValue(value);

                return this;
            }
        },
        'toString': {
            value: function () {
                return writeCurrencyString(store.get(this).totalAmount);
            }
        },
        'valueOf': {
            value: function () {
                return store.get(this).totalAmount;
            }
        }
    }
);


export function walletFactory(initialValue) {
    const o = Object.create(Wallet.prototype);
    const props = Object.create(null);

    props.totalAmount = normalizeValue(initialValue);
    store.set(o, props);

    return o;
}
