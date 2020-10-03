import Vuex from 'vuex';
import Vue from 'vue';
import {mount} from '@vue/test-utils';

import eventsStore from '../src/store/test';
import home from '../src/views/test.vue'

Vue.use(Vuex);
const store = new Vuex.Store(eventsStore);

test('Test Componet mounted' ,  () => {
    mount(home, {store});
})

test('Add new Event', () =>{
    const calendar = mount(home, {store});
    calendar.vm.addEvent();
    expect(calendar.vm.GlobalEvents).toEqual([
        {
            id: 'xy123',
            color: 'blue',
            description: 'This is a description',
            time: '22:04',
            title: 'Quito',
            forecast: 'No data'
          }
    ]);
})

test('Blocking Event with more than 300 letters', () => {
    const calendar = mount(home, {store});
    calendar.vm.addEventErr();
    expect(calendar.vm.GlobalEvents).toEqual([
        {
            id: 'xy123',
            color: 'blue',
            description: 'This is a description',
            time: '22:04',
            title: 'Quito',
            forecast: 'No data'
          }
    ]);
    expect(calendar.vm.errorMsg).toEqual('Description must be under 300 letters');
})