import {StatementResource} from "../services/resource";
import SearchOptions from "../services/search-options";

const state = {
    statements: [],
    statementData: {
        count: 0,
        revenues: {total: 0},
        expenses: {total: 0},
    },
    searchOptions: new SearchOptions('bankAccount'),
};

const mutations = {
    set(state, statements) {
        state.statements = statements;
    },
    setStatementData(state, statementData) {
        state.statementData = statementData;
    },
    setOrder(state, key) {
        state.searchOptions.order.key = key;
        state.searchOptions.order.sort = (state.searchOptions.order.sort == 'desc') ? 'asc' : 'desc';
    },
    setPagination(state, pagination) {
        state.searchOptions.pagination = pagination;
    },
    setCurrentPage(state, currentPage) {
        state.searchOptions.pagination.current_page = currentPage;
    },
    setFilter(state, filter) {
        state.searchOptions.search = filter;
    }
};

const actions = {
    query(context) {
        return StatementResource.query(context.state.searchOptions.createOptions())
            .then((response) => {
                context.commit('set', response.data.data.statements.data);
                context.commit('setPagination', response.data.data.statements.meta.pagination);
                context.commit('setStatementData', response.data.data.statement_data);
            });
    },
    queryWithSortBy(context, key) {
        context.commit('setOrder', key);
        context.dispatch('query');
    },
    queryWithPagination(context, currentPage) {
        context.commit('setCurrentPage', currentPage);
        context.dispatch('query');
    },
    queryWithFilter(context) {
        context.dispatch('query');
    },
};

const module = {
    namespaced: true, state, mutations, actions
};

export default module;
