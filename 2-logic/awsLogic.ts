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
export async function saveImagesToS3Cat(file: any, imageId: string) {
    console.log(file.categoriesImage.name.split('.')[1]);
    
    try {
        const type = file.categoriesImage.name.split('.')[1];
        const params = {
            Body: file.categoriesImage.data,
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
export async function saveImagesToS3User(file: any, imageId: string) {
    console.log(file.name.split('.')[1]);
    console.log(file);
    
    try {
        const type = file.name.split('.')[1];
        const params = {
            Body: file.data,
            Key: `${imageId}.${type}`,
            Bucket: 'reusfulimages'
        }
        console.log('saving image' + imageId);
        await s3bucket.upload(params).promise()
        return params.Key
    } catch (err: any) {
        throw new Error(`S3 upload error: ${err.message}`)
    }
}

export async function deleteImageFromS3(imageId: string) {
    const params = { Bucket: 'reusfulimages', Key: imageId };
    try {
        const results = await s3bucket.deleteObject(params).promise();
        console.log(results);
        return results
    } catch (e) {
        console.log(e);

    }
}