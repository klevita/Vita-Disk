import Vue from 'vue'
import Vuex from 'vuex'
import { GetterTree, MutationTree, ActionTree } from "vuex"
import AuthService from '@/services/AuthService'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export interface User {
    email: string,
    token: string
}

class State {
    user: User = {
        email: '',
        token: ''
    };
}

const getters = <GetterTree<State, any>>{
};

const mutations = <MutationTree<State>>{
    setUser(state, payload: User) {
        state.user = payload;
    },
    dropUser(state) {
        state.user = {
            email: '',
            token: ''
        }
    }
};

const actions = <ActionTree<State, any>>{
    async fetchUser(context, payload) {
        const resp = await AuthService.Login(payload.email, payload.pass)
        if (!resp.data.errors) {
            context.commit('setUser', { email: payload.email, token: resp.data.token })
        }
    }
};

export default new Vuex.Store({
    state: new State(),
    mutations: mutations,
    actions: actions,
    plugins: [createPersistedState()],
})