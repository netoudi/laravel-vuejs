window.billListComponent = Vue.extend({
    template: `
        <table border="1" cellpadding="10">
            <thead>
            <tr>
                <th>#</th>
                <th>Vencimento</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Paga?</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(index, o) in bills">
                <td>{{ index + 1 }}</td>
                <td>{{ o.date_due }}</td>
                <td>{{ o.name }}</td>
                <td>{{ o.value | currency 'R$ ' 2 }}</td>
                <td class="my-class" :class="{'green': o.done, 'red': !o.done}">
                    <div v-if="o.done === 1">
                        <a href="#" @click.prevent="payBill(o)">{{ o.done | doneLabel }}</a>
                    </div>
                    <div v-else>
                        <a href="#" @click.prevent="payBill(o)">{{ o.done | doneLabel }}</a>
                    </div>
                </td>
                <td>
                    <a href="#" @click.prevent="loadBill(o)">Editar</a> |
                    <a href="#" @click.prevent="deleteBill(o)">Excluir</a>
                </td>
            </tr>
            </tbody>
        </table>
    `,
    data: function () {
        return {
            bills: this.$root.$children[0].bills
        };
    },
    methods: {
        loadBill: function (bill) {
            this.$dispatch('change-bill', bill);
            this.$dispatch('change-actived-view', 1);
            this.$dispatch('change-form-type', 'update');
        },
        deleteBill: function (bill) {
            if (confirm('Deseja excluir está conta?')) {
                this.bills.$remove(bill);
            }
        },
        payBill: function (bill) {
            var message = (bill.done == 1) ? "Deseja mudar o status desta conta para 'Não paga'?"
                : "Deseja mudar o status desta conta para 'Paga'?";
            if (confirm(message)) {
                bill.done = !bill.done;
            }
        }
    },
    events: {
        'new-bill': function (bill) {
            this.bills.push(bill);
        }
    }
});
