import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { marketplaceListings } from '../data/marketplace';
import { feedPosts } from '../data/feed';
import ListingCard from '../components/marketplace/ListingCard';
import PostCard from '../components/feed/PostCard';
import { FiArrowRight } from 'react-icons/fi';
import './Home.css';

export default function Home() {
  const { collections } = useApp();
  const totalItems = Object.values(collections).flat().length;
  const featuredListings = marketplaceListings.slice(0, 4);
  const featuredPosts = feedPosts.slice(0, 3);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-tag">The collector's marketplace</div>
          <h1 className="hero-title">
            Every piece<br />has a story.
          </h1>
          <p className="hero-subtitle">
            Discover rare collectibles, connect with passionate collectors, and manage your personal collection — all in one place.
          </p>
          <div className="hero-ctas">
            <Link to="/marketplace" className="btn-primary">Browse Marketplace</Link>
            <Link to="/feed" className="btn-ghost">Community Feed</Link>
          </div>
          {totalItems > 0 && (
            <div className="hero-collection-hint">
              You have <strong>{totalItems}</strong> items in your collection.{' '}
              <Link to="/collection">View them →</Link>
            </div>
          )}
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-n">{marketplaceListings.length}</span>
            <span className="stat-l">Listings</span>
          </div>
          <div className="hero-stat">
            <span className="stat-n">{feedPosts.length}</span>
            <span className="stat-l">Community posts</span>
          </div>
          <div className="hero-stat">
            <span className="stat-n">8</span>
            <span className="stat-l">Categories</span>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">Featured Listings</h2>
          <Link to="/marketplace" className="section-link">
            View all <FiArrowRight size={14} />
          </Link>
        </div>
        <div className="featured-grid">
          {featuredListings.map(item => <ListingCard key={item.id} item={item} />)}
        </div>
      </section>

      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">From the Community</h2>
          <Link to="/feed" className="section-link">
            View all <FiArrowRight size={14} />
          </Link>
        </div>
        <div className="featured-posts-grid">
          {featuredPosts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      </section>
    </div>
  );
}
