import { storage } from '@/libs/firebase';
import { ref, uploadBytes } from 'firebase/storage'
import uniqid from 'uniqid';

export async function POST(req) {
    const data = await req.formData();

    if (data.get('file')) {
        console.log('we have file', data.get('file'));
        const file = data.get('file');


        const ext = file.name.split('.').slice(-1)[0];
        const newFileName = uniqid() + '.' + ext;
        console.log(newFileName);

        const chunks = [];
        for await (const chunk of file.stream()){
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        const storageRef = ref(storage, `uploads/${newFileName}`);
        const metadata = await uploadBytes(storageRef, buffer);
        const fullPath = metadata;
        if (!fullPath) {
            return res.status(403).json({
                error: 'There was some error while uploading the file.',
            })
        }
        const fileURL = `https://storage.googleapis.com/${storageRef.bucket}/${storageRef.fullPath}`;
        
        return Response.json(fileURL);
    }
    return Response.json(true);
}
