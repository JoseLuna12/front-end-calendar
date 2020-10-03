import Vuex from 'vuex';
import Vue from 'vue';
import {mount} from '@vue/test-utils';

import eventsStore from '../src/store/test';
import addEvent from '../src/functions/createEvent'
import home from '../src/views/test.vue'

Vue.use(Vuex);
// Vue.mixin(addEvent)
const store = new Vuex.Store(eventsStore);

test('store is loaded' ,  () => {
    const calendar = mount(home, {store});
})

test('Add Event ', () =>{
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
    ])
})