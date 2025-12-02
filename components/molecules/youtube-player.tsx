import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms";

interface YoutubePlayerProps {
  playlistId: string;
  title?: string;
}

export default function YoutubePlayer({
  playlistId,
  title,
}: YoutubePlayerProps) {
  let id = playlistId;

  if (playlistId.includes("list=")) {
    const match = playlistId.match(/list=([^&]+)/);
    if (match) {
      id = match[1];
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{title || "Course Videos"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/videoseries?list=${id}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}
