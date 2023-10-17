import { generateRandomId } from "@/lib/utils";
import { uploadFile } from "@mintbase-js/storage/lib/uploads";
import { File } from 'nft.storage';

interface GenerationResponse {
    artifacts: Array<{
        base64: string;
        seed: number;
        finishReason: string;
    }>
}

export async function POST(req: Request) {
    const { text } = await req.json();
    const engine_id = 'stable-diffusion-xl-1024-v1-0';

    const stabilityResponse = await fetch(`https://api.stability.ai/v1/generation/${engine_id}/text-to-image`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        },
        body: JSON.stringify({
            text_prompts: [
                {
                    text: text,
                },
            ],
            cfg_scale: 7,
            height: 1024,
            width: 1024,
            steps: 30,
            samples: 1,
        }),
    });

    if (!stabilityResponse.ok) {
        console.error(`Error in stability.ai`);
        return new Response(stabilityResponse.statusText, { status: stabilityResponse.status });
    }

    const stabilityJSON = await stabilityResponse.json() as GenerationResponse;


    // save the first artifact
    const image = stabilityJSON.artifacts[0];

    // Convert base64 image to Blob
    const blob = await fetch(`data:image/png;base64,${image.base64}`).then(res => res.blob());

    // Create a new File object with the Blob
    const imageFile = new File([blob], `generated-image.png`, { type: 'image/png' });

    const { id } = await uploadFile(imageFile);
    const imageUrl = `https://arweave.net/${id}`
    const refObject = {
        title: text.substring(0, 20),
        description: text.substring(0, 60),
        media: imageUrl,
    };

    const metadataFile = new File([JSON.stringify(refObject)], `metadata.json`, { type: 'application/json' });

    const uploadRef = await uploadFile(metadataFile);

    // returns the arweave id of the metdata ref and image url separately
    return new Response(JSON.stringify({ arweaveId: uploadRef.id, arweaveUrl: imageUrl }));

}
