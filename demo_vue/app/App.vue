<template>
    <Page>
        <ActionBar title="Social Share"></ActionBar>
        <StackLayout>
            <Button class="btn-outline btn-primary m-20 p-10" text="Share an image" @tap="doShareImage"></Button>
            <Button class="btn-outline btn-primary m-20 p-10" text="Share text" @tap="doShareText"></Button>
            <Button class="btn-outline btn-primary m-20 p-10" text="Share URL" @tap="doShareUrl"></Button>
        </StackLayout>
    </Page>
</template>

<script lang="ts">
import Vue from 'nativescript-vue';
import Component from 'vue-class-component';
import { shareImage, shareText, shareUrl } from '@nativescript-community/ui-social-share';
import { ImageSource } from '@nativescript/core/image-source';

@Component({
    components: {}
})
export default class App extends Vue {
    async doShareImage() {
        const image = await ImageSource.fromFile('~/images/nativescript.jpg');
        console.log('doShareImage', image, image.ios);
        shareImage(image);
    }

    doShareText() {
        shareText('I love NativeScript!');
    }

    doShareUrl() {
        shareUrl('https://www.nativescript.org/', 'Home of NativeScript', 'How would you like to share this url?');
    }
}
</script>
