import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#00A3FF',
                secondary: colors.darken4,
                accent: colors.blue.lighten2,
                dark: '#152035',
                lightgray: '#F9FAFA',
            }
        }
    }
});
