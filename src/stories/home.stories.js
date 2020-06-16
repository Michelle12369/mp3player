import { action } from '@storybook/addon-actions'
import * as Knobs from '@storybook/addon-knobs';

import Home from '../views/Home'

export default {
    component: Home,
    title: 'Home'
}

export const base = () => ({
    components: { 'home': Home },
    template: '<home></home>',
    props: {
        title: {
            default: Knobs.text('title', '黑色幽默'),
        },
        singer: {
            default: Knobs.text('singer', '周杰倫')
        },
        image: {
            default: Knobs.text('image', 'http://fakeimg.pl/600x600')
        },
        song: {
            default: Knobs.text('song', 'http://soundbible.com/mp3/analog-watch-alarm_daniel-simion.mp3')
        },
        mode: {
            default: Knobs.number('mode', 0)
        }
    },
    methods: {
        getNextSong: action('get next song please!'),
        getLastSong: action('get last song please!'),
        changeMode: action('show mode')
    }
})
