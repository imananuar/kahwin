import { Metadata } from "next";

type Props = {
    params: { category: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const category = (await params).category;

    return {
        title: `Memoria - ${category}`,
    }
}
  
export default async function DirectoryPage({ params }: Props) {
    const { category } = params;
    return (
        <div>
            <h1>Category: {category}</h1>
        </div>
    )
}