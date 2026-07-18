import { useState, useMemo } from 'react';
import { feedPosts } from '../data/feed';
import { CATEGORIES } from '../data/marketplace';
import PostCard from '../components/feed/PostCard';
import SearchBar from '../components/ui/SearchBar';
import EmptyState from '../components/ui/EmptyState';
import PostModal from '../components/feed/PostModal';
import { useDebounce } from '../hooks/useDebounce';
import './Feed.css';

export default function Feed() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);

  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    let posts = [...feedPosts];
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      posts = posts.filter(p =>
        p.caption.toLowerCase().includes(q) ||
        p.user.name.toLowerCase().includes(q) ||
        p.user.username.toLowerCase().includes(q)
      );
    }
    if (category !== 'All') posts = posts.filter(p => p.category === category);
    return posts;
  }, [debouncedSearch, category]);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Community Feed</h1>
          <p className="page-subtitle">Discover collections shared by the community</p>
        </div>
      </div>

      <div className="filter-bar">
        <SearchBar value={search} onChange={setSearch} placeholder="Search posts, people…" />
        <div className="filter-controls">
          <select className="filter-select" value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="📭" title="No posts found" description="Try a different search or category filter." />
      ) : (
        <div className="feed-grid">
          {filtered.map(post => (
            <PostCard key={post.id} post={post} onClick={() => setSelectedPost(post)} />
          ))}
        </div>
      )}

      {selectedPost && <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </div>
  );
}
