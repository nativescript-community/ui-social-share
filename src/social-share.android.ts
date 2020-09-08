import { ImageSource } from '@nativescript/core';
import * as application from '@nativescript/core/application';
import { Device } from '@nativescript/core/platform';

let context;
let numberOfImagesCreated = 0;
declare let global: any;

function getIntent(type) {
    const intent = new android.content.Intent(android.content.Intent.ACTION_SEND);
    intent.setType(type);
    return intent;
}
function share(intent, subject) {
    context = application.android.context;
    subject = subject || 'How would you like to share this?';

    const shareIntent = android.content.Intent.createChooser(intent, subject);
    shareIntent.setFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
    context.startActivity(shareIntent);
}
export function shareImage(image: ImageSource, subject) {
    numberOfImagesCreated++;

    context = application.android.context;

    const intent = getIntent('image/jpeg');

    const stream = new java.io.ByteArrayOutputStream();
    image.android.compress(android.graphics.Bitmap.CompressFormat.JPEG, 100, stream);

    const imageFileName = 'socialsharing' + numberOfImagesCreated + '.jpg';
    const newFile = new java.io.File(context.getExternalFilesDir(null), imageFileName);

    const fos = new java.io.FileOutputStream(newFile);
    fos.write(stream.toByteArray());

    fos.flush();
    fos.close();

    let shareableFileUri;
    const sdkVersionInt = +Device.sdkVersion;
    if (sdkVersionInt >= 21) {
        shareableFileUri = global.androidx.core.content.FileProvider.getUriForFile(context, application.android.nativeApp.getPackageName() + '.provider', newFile);
    } else {
        shareableFileUri = android.net.Uri.fromFile(newFile);
    }
    intent.putExtra(android.content.Intent.EXTRA_STREAM, shareableFileUri);

    share(intent, subject);
}

export function shareText(text, subject) {
    const intent = getIntent('text/plain');

    intent.putExtra(android.content.Intent.EXTRA_TEXT, text);
    share(intent, subject);
}

export function shareUrl(url, text, subject) {
    const intent = getIntent('text/plain');

    intent.putExtra(android.content.Intent.EXTRA_TEXT, url);
    intent.putExtra(android.content.Intent.EXTRA_SUBJECT, text);

    share(intent, subject);
}
