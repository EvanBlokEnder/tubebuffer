```jsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const searchVideos = async () => {
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setVideos(data.items || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    if (selectedVideo) {
      const player = new window.YT.Player('player', {
        height: '360',
        width: '640',
        videoId: selectedVideo,
        playerVars: { autoplay: 1 },
      });
    }
  }, [selectedVideo]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">YouTube Frontend</h1>
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search YouTube videos"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={searchVideos}
          className="mt-2 bg-blue-500 text-white p-2 rounded"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>{selectedVideo && <div id="player"></div>}</div>
        <div>
          {videos.map((video) => (
            <div
              key={video.id.videoId}
              className="flex mb-4 cursor-pointer"
              onClick={() => setSelectedVideo(video.id.videoId)}
            >
              <img
                src={video.snippet.thumbnails.default.url}
                alt={video.snippet.title}
                className="w-32 h-18 mr-2"
              />
              <div>
                <h3 className="text-lg font-semibold">{video.snippet.title}</h3>
                <p>{video.snippet.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm">
        <strong>Ad-Free Experience</strong>: Install{' '}
        <a href="https://ublockorigin.com" target="_blank" rel="noopener noreferrer">
          uBlock Origin
        </a>{' '}
        for an ad-free experience.
      </p>
    </div>
  );
}

export default App;
```