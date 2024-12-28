import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
interface RunCardProps {
    content: {
        title: string;
    };
}

export const RunCard = ({ content }: RunCardProps) => {
    const title = content.title;
    return (
        <Card className="rounded-lg flex-1">
            <Heading size="xs" className="">
                {title}
            </Heading>
            <Text size="sm">10km</Text>
            <Text size="sm">55:00</Text>
            <Text size="sm">140</Text>
            <Text size="sm">6/10</Text>
            <Text size="sm">All good, at the end...</Text>
        </Card>
    );
};
