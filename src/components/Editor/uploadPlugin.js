//configure the upload plugin, process dropped files and turn into nodes
import { uploadFile } from '../../lib/githubUploader';

export const uploadPlugin = (githubToken) => {
    return async (files, schema) => {
        const images = [];

        for (const file of files) {
            //safety check 
            if (!file.type.startsWith('image/')) {
                console.warn(`File ${file.name} is not an image and will be skipped.`);
                continue;
            }

            try {
                //define where the image should live inside repo
                const uniqueName = `${Date.now()}-${file.name}`;
                const path = `src/assets/blog-images/${uniqueName}`;

                //call uploadFile function
                const downloadUrl = await uploadFile(file, path, githubToken);

                //construct proseMirror image node object so that downloadUrl goes directly into the "src" attribute
                const imageNode = schema.nodes.image.create({
                    src: downloadUrl,
                    alt: file.name,
                });
                images.push(imageNode);
                //shcema use to prevent editor crash with typeError due to push raw data into prosemirror nodes
            } catch (error) {
                console.error(`Failed to upload file ${file.name}:`, error);
            }
        }

        return images; //return the array of image nodes
    }

}