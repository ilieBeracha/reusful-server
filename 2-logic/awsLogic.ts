import { s3bucket } from "../1-dal/aws";

export async function saveImagesToS3(file: any, imageId: string) {
    try {
        const type = file.productImage.name.split('.')[1];
        const params = {
            Body: file.productImage.data,
            Key: `${imageId}.${type}`,
            Bucket: 'reusfulimages'
        }
        // console.log('saving image' + imageId);
        await s3bucket.upload(params).promise()
        return params.Key
    } catch (err: any) {
        throw new Error(`S3 upload error: ${err.message}`)
    }
}