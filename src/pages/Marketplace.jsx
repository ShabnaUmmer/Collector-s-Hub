import { useState, useMemo } from 'react';
import { marketplaceListings, CATEGORIES, CONDITIONS } from '../data/marketplace';
import ListingCard from '../components/marketplace/ListingCard';
import SearchBar from '../components/ui/SearchBar';
import EmptyState from '../components/ui/EmptyState';
import { useDebounce } from '../hooks/useDebounce';
import './Marketplace.css';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

export default function Marketplace() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [condition, setCondition] = useState('All');
  const [sort, setSort] = useState('newest');

  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    let items = [...marketplaceListings];

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      items = items.filter(i => i.title.toLowerCase().includes(q) || i.seller.toLowerCase().includes(q));
    }
    if (category !== 'All') items = items.filter(i => i.category === category);
    if (condition !== 'All') items = items.filter(i => i.condition === condition);

    if (sort === 'price_asc') items.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') items.sort((a, b) => b.price - a.price);
    else items.sort((a, b) => new Date(b.listedAt) - new Date(a.listedAt));

    return items;
  }, [debouncedSearch, category, condition, sort]);

  const hasFilters = search || category !== 'All' || condition !== 'All';

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Marketplace</h1>
          <p className="page-subtitle">{marketplaceListings.length} listings available</p>
        </div>
      </div>

      <div className="filter-bar">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by title or seller…" />
        <div className="filter-controls">
          <select className="filter-select" value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select className="filter-select" value={condition} onChange={e => setCondition(e.target.value)}>
            {CONDITIONS.map(c => <option key={c}>{c}</option>)}
          </select>
          <select className="filter-select" value={sort} onChange={e => setSort(e.target.value)}>
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {hasFilters && (
        <div className="results-bar">
          <span>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
          <button className="clear-filters" onClick={() => { setSearch(''); setCategory('All'); setCondition('All'); setSort('newest'); }}>
            Clear filters
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No listings found"
          description="Try adjusting your search or filters to find what you're looking for."
        />
      ) : (
        <div className="listings-grid">
          {filtered.map(item => <ListingCard key={item.id} item={item} />)}
        </div>
      )}
    </div>
  );
}
