import { action } from '@storybook/addon-actions'
import * as Knobs from '@storybook/addon-knobs';

import Song from '../components/Song'

export default {
    component: Song,
    title: 'Song'
}

export const base = () => ({
    components: { 'song': Song },
    template: '<song @clickSong="playSong" :id="id" :title="title" :singer="singer" :albumName="albumName" :time="time"></song>',
    props: {
        id: {
            default: Knobs.number('id', 1)
        },
        title: {
            default: Knobs.text('title', '黑色幽默'),
        },
        singer: {
            default: Knobs.text('singer', '周杰倫')
        },
        albumName: {
            default: Knobs.text('albumName', '同名專輯')
        },
        time: {
            default: Knobs.text('time', '04:43')
        }
    },
    methods: {
        playSong: action('play the song with this id'),
    }
})
