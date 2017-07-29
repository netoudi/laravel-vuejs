import moment from "moment";
import "moment/locale/pt-br";
import numeral from "numeral";
import "numeral/locales/pt-br";

moment.locale('pt-br');
numeral.locale('pt-br');

Vue.filter('dateFormat', {
    read(value) {
        if (value && typeof value !== undefined) {
            let date = moment(value);
            return date.isValid() ? date.format('DD/MM/YYYY') : value;
        }

        return value;
    },
    write(value) {
        let date = moment(value, 'DD/MM/YYYY');
        return date.isValid() ? date.toDate() : value;
    }
});

Vue.filter('numberFormat', {
    read(value, isCurrency = false) {
        let number = 0;
        if (value && value != "" && !isNaN(value)) {
            number = isCurrency ? numeral(value).format('$0,0.00') : numeral(value).format('0,0.00');
        }

        return number;
    },
    write(value) {
        let number = numeral(value).value();
        return number ? number : 0;
    }
});

Vue.filter('currencyFormat', (value) => {
    let currency = numeral(value).format('$0,0.00');
    return (value >= 0) ? `<span class=\"green-text\">${currency}</span>` : `<span class=\"red-text\">${currency}</span>`;
});

Vue.filter('doneLabel', (value) => {
    return (value == 1) ? "<span class=\"badge-yes\">sim</span>" : "<span class=\"badge-no\">não</span>";
});

Vue.filter('monthYear', (value) => {
    return moment(value instanceof Date ? value : `${value}-01`).format('MM/YYYY');
});

Vue.filter('dayMonth', (value) => {
    return moment(value).format('DD/MM');
});
