import { action } from '@storybook/addon-actions'
import * as Knobs from '@storybook/addon-knobs';

import SongList from '../components/SongList'

export default {
    component: SongList,
    title: 'SongList'
}

export const base = () => ({
    components: { 'song-list': SongList },
    template: '<song-list :trackList="trackList" :data="data" :track="track" :trackImage="trackImage" @playSong="playSong" @showList="changeListMode"></song-list>',
    props: {
        trackList: {
            default: Knobs.object('trackList', [
                '工作歌單', 'ANIME Music', '獨立民謠', 'J-POP'
            ])
        },
        data: {
            default: Knobs.object('data', [
                {
                    id: 1,
                    title: "黑色幽默",
                    singer: "周杰倫",
                    albumName: "同名專輯",
                    time: "04:43"
                },
                {
                    id: 2,
                    title: "讓我為你唱情歌",
                    singer: "蕭敬騰",
                    albumName: "慾望反光",
                    time: "04:11"
                },
                {
                    id: 3,
                    title: "讓我為你唱情歌",
                    singer: "蕭敬騰",
                    albumName: "慾望反光",
                    time: "04:11"
                },
                {
                    id: 4,
                    title: "讓我為你唱情歌",
                    singer: "蕭敬騰",
                    albumName: "慾望反光",
                    time: "04:11"
                },
                {
                    id: 5,
                    title: "讓我為你唱情歌",
                    singer: "蕭敬騰",
                    albumName: "慾望反光",
                    time: "04:11"
                },
                {
                    id: 6,
                    title: "讓我為你唱情歌",
                    singer: "蕭敬騰",
                    albumName: "慾望反光",
                    time: "04:11"
                },
                {
                    id: 7,
                    title: "讓我為你唱情歌",
                    singer: "蕭敬騰",
                    albumName: "慾望反光",
                    time: "04:11"
                },
                {
                    id: 8,
                    title: "讓我為你唱情歌",
                    singer: "蕭敬騰",
                    albumName: "慾望反光",
                    time: "04:11"
                },
            ]),
        },
        track: {
            default: Knobs.text('track', "工作歌單")
        },
        trackImage:{
            default: Knobs.text('trackImage',"http://fakeimg.pl/334x157")
        }
    },
    methods: {
        playSong: action('play the song with this id'),
        changeListMode: action('show list')
    }
})
